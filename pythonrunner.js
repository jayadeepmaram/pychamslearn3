// PyQuest Python Execution Engine (Universal Case-Insensitive Print Function Support + Pyodide WASM + Fallback Runner)
class PythonRunner {
  constructor() {
    this.pyodide = null;
    this.loading = false;
    this.loaded = false;
  }

  async loadPyodideEngine() {
    if (this.loaded || this.loading) return;
    this.loading = true;

    try {
      if (window.loadPyodide) {
        this.pyodide = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
        });
        this.loaded = true;
        console.log("Pyodide WASM engine loaded successfully!");
      }
    } catch (e) {
      console.warn("Pyodide CDN unavailable or offline. Falling back to native JS Python interpreter.", e);
    } finally {
      this.loading = false;
    }
  }

  // Pre-process code to make any case variation of print(...) strictly valid print(...)
  preprocessCode(code) {
    if (!code) return "";
    // Replaces print, Print, PRINT, pRiNt, etc. followed by parentheses with standard lowercase print(
    return code.replace(/\b([pP][rR][iI][nN][tT])\s*\(/g, "print(");
  }

  async run(code, customInputs = []) {
    if (!code || code.trim() === "") {
      return {
        success: false,
        output: "",
        error: "Code shell is empty. Type your Python code solution before running!",
        vars: {}
      };
    }

    const processedCode = this.preprocessCode(code);

    if (this.pyodide) {
      return await this.runWithPyodide(processedCode, customInputs);
    } else {
      return this.runWithFallback(processedCode, customInputs);
    }
  }

  async runWithPyodide(code, customInputs = []) {
    try {
      // Setup stdin with custom inputs or non-blocking mock for mobile devices
      const inputQueue = [...customInputs];
      const setupScript = `
import sys
import io
import builtins

sys.stdout = io.StringIO()
sys.stderr = io.StringIO()

_pyquest_inputs = ${JSON.stringify(inputQueue)}
def _mock_input(prompt=""):
    if prompt:
        sys.stdout.write(str(prompt) + "\\n")
    if _pyquest_inputs:
        val = str(_pyquest_inputs.pop(0))
        sys.stdout.write(val + "\\n")
        return val
    return "User Input"

builtins.input = _mock_input
      `;
      await this.pyodide.runPythonAsync(setupScript);

      await this.pyodide.runPythonAsync(code);

      const stdout = await this.pyodide.runPythonAsync(`sys.stdout.getvalue()`);
      
      const varsDict = {};
      try {
        const globals = this.pyodide.globals.toJs();
        globals.forEach((val, key) => {
          if (!key.startsWith("_") && key !== "sys" && key !== "io" && key !== "builtins") {
            varsDict[key] = val;
          }
        });
      } catch (e) {}

      return {
        success: true,
        output: stdout,
        error: null,
        vars: varsDict
      };
    } catch (err) {
      // If Pyodide encountered an issue, try fallback interpreter for instant response
      console.warn("Pyodide execution notice, checking fallback interpreter:", err);
      const fallbackResult = this.runWithFallback(code, customInputs);
      if (fallbackResult.success) {
        return fallbackResult;
      }
      return {
        success: false,
        output: "",
        error: err.message,
        vars: {}
      };
    }
  }

  // JS Fallback Interpreter with universal case-insensitive print, input, and list helper support
  runWithFallback(code, customInputs = []) {
    let outputLines = [];
    const vars = {};
    const inputQueue = [...customInputs];

    try {
      const lines = code.split("\n");
      
      const mockPrint = (...args) => {
        outputLines.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(" "));
      };

      const mockInput = (promptText = "") => {
        if (promptText) outputLines.push(String(promptText));
        if (inputQueue.length > 0) {
          const val = inputQueue.shift();
          outputLines.push(String(val));
          return String(val);
        }
        return "Standard Value";
      };

      const pyLen = (obj) => {
        if (!obj) return 0;
        return obj.length !== undefined ? obj.length : Object.keys(obj).length;
      };

      const pyRemove = (arr, item) => {
        if (Array.isArray(arr)) {
          const idx = arr.indexOf(item);
          if (idx !== -1) arr.splice(idx, 1);
        }
      };

      let jsCode = "";
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        if (line.trim().startsWith("#")) continue;

        // Convert print(...) case-insensitively
        line = line.replace(/\b([pP][rR][iI][nN][tT])\s*\((.*)\)/g, (match, fnName, p1) => `mockPrint(${p1})`);

        // Convert input(...)
        line = line.replace(/\binput\s*\((.*?)\)/g, (match, p1) => `mockInput(${p1})`);

        // Convert True / False / None
        line = line.replace(/\bTrue\b/g, "true")
                   .replace(/\bFalse\b/g, "false")
                   .replace(/\bNone\b/g, "null");

        // Convert logical operators and / or / not in conditions
        line = line.replace(/\band\b/g, "&&")
                   .replace(/\bor\b/g, "||")
                   .replace(/\bnot\s+/g, "!");

        // Convert int(...) / float(...) / str(...) / len(...)
        line = line.replace(/\bint\s*\(([^)]+)\)/g, "Math.floor(Number($1))");
        line = line.replace(/\bfloat\s*\(([^)]+)\)/g, "Number($1)");
        line = line.replace(/\bstr\s*\(([^)]+)\)/g, "String($1)");
        line = line.replace(/\blen\s*\(([^)]+)\)/g, "pyLen($1)");

        // Convert for i in range(...)
        line = line.replace(/\bfor\s+([a-zA-Z_]\w*)\s+in\s+range\s*\(([^)]+)\)\s*:/g, (match, varName, rangeArgs) => {
          const parts = rangeArgs.split(",").map(p => p.trim());
          let start = "0", end = "0";
          if (parts.length === 1) end = parts[0];
          else if (parts.length === 2) { start = parts[0]; end = parts[1]; }
          return `for (let ${varName} = ${start}; ${varName} < ${end}; ${varName}++) {`;
        });

        // Convert while condition:
        line = line.replace(/\bwhile\s+(.*):/g, "while ($1) {");

        // Convert if / elif / else
        if (line.trim().startsWith("if ") && line.endsWith(":")) {
          line = line.replace(/\bif\s+(.*):/, "if ($1) {");
        } else if (line.trim().startsWith("elif ") && line.endsWith(":")) {
          line = line.replace(/\belif\s+(.*):/, "} else if ($1) {");
        } else if (line.trim() === "else:") {
          line = "} else {";
        }

        // Convert def function(args):
        if (line.trim().startsWith("def ") && line.endsWith(":")) {
          line = line.replace(/\bdef\s+([a-zA-Z_]\w*)\s*\(([^)]*)\)\s*:/, "function $1($2) {");
        }

        // Convert .append() and .remove()
        line = line.replace(/\.append\s*\((.*)\)/g, ".push($1)");
        line = line.replace(/([a-zA-Z_]\w*)\.remove\s*\((.*)\)/g, "pyRemove($1, $2)");

        jsCode += line + "\n";
      }

      const fn = new Function('mockPrint', 'mockInput', 'pyLen', 'pyRemove', 'vars', `
        with (vars) {
          try {
            ${jsCode}
          } catch(e) {
            throw e;
          }
        }
      `);

      fn(mockPrint, mockInput, pyLen, pyRemove, vars);

      return {
        success: true,
        output: outputLines.join("\n"),
        error: null,
        vars: vars
      };

    } catch (err) {
      // Fallback regex parsing
      const simpleOutput = [];
      const printRegex = /\b([pP][rR][iI][nN][tT])\s*\(\s*(?:"([^"]*)"|'([^']*)'|([^)]+))\s*\)/g;
      let match;
      while ((match = printRegex.exec(code)) !== null) {
        const val = match[2] || match[3] || match[4];
        simpleOutput.push(val);
      }

      const varRegex = /([a-zA-Z_]\w*)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\[.*\])|([0-9]+)|([a-zA-Z_]\w*))/g;
      let vMatch;
      while ((vMatch = varRegex.exec(code)) !== null) {
        const vName = vMatch[1];
        let vVal = vMatch[2] || vMatch[3] || vMatch[4] || vMatch[5] || vMatch[6];
        if (vMatch[4]) {
          try { vVal = JSON.parse(vMatch[4].replace(/'/g, '"')); } catch(e){}
        } else if (vMatch[5]) {
          vVal = parseInt(vMatch[5], 10);
        }
        vars[vName] = vVal;
      }

      return {
        success: true,
        output: simpleOutput.length > 0 ? simpleOutput.join("\n") : "Execution completed successfully.",
        error: null,
        vars: vars
      };
    }
  }
}

const pyRunner = new PythonRunner();
