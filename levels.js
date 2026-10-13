// PyQuest - Interactive Python Puzzle Levels Dataset
const LEVELS = [
  {
    id: 0,
    title: "Lesson 0: What is Python & .py Files?",
    topic: "Python Architecture & File Basics",
    badgeId: "first_print",
    xp: 50,
    puzzleType: "Foundational Lesson",
    story: "Welcome to PyQuest! Before writing code, learn what Python is and how code files operate.",
    explanation: `
      <h3>What is Python?</h3>
      <p>Python is a high-level, human-readable programming language used for building artificial intelligence, games, web apps, and data analysis.</p>
      
      <h3>Why Do We Create Files & Use <code>.py</code>?</h3>
      <p>Code files permanently store your code so you can run, edit, and share it anytime. The <b><code>.py</code> extension</b> tells your operating system that the file contains Python instructions!</p>

      <h3>Easy Syntax Template:</h3>
      <div class="code-example">
        <code>print("Your Text Here")</code>
      </div>
    `,
    task: "Print the message: <b>Python is ready!</b>",
    starterCode: "",
    placeholder: "Type your code here... e.g. print(\"Python is ready!\")",
    hints: [
      "Use print(\"...\") with quotes inside parentheses.",
      "Text: Python is ready!"
    ],
    tryYourselfChallenge: "Try printing your favorite programming language on a new line!",
    testCases: [
      {
        description: "Outputs 'Python is ready!' (caps or lowercase accepted)",
        check: (output, code) => output.trim().toLowerCase() === "python is ready!" && /(print)\s*\(/i.test(code)
      },
      {
        description: "Uses print() function",
        check: (output, code) => /(print)\s*\(/i.test(code)
      }
    ]
  },
  {
    id: 1,
    title: "Lesson 1: Printing & Strings",
    topic: "Standard Output",
    badgeId: "first_print",
    xp: 100,
    puzzleType: "Syntax Lesson",
    story: "Master the standard output function to display messages on the console.",
    explanation: `
      <h3>Understanding <code>print()</code></h3>
      <p>The <code>print()</code> function outputs text enclosed in quotes (<code>" "</code> or <code>' '</code>) to the terminal screen.</p>
      
      <h3>Easy Syntax Template:</h3>
      <div class="code-example">
        <code>print("Hello World")</code>
      </div>
    `,
    task: "Print the message: <b>Hello, World!</b>",
    starterCode: "",
    placeholder: "Type your code here... e.g. print(\"Hello, World!\")",
    hints: [
      "Use print(\"Hello, World!\").",
      "Check that your quotes match."
    ],
    tryYourselfChallenge: "Try printing two separate lines of text!",
    testCases: [
      {
        description: "Outputs 'Hello, World!' (caps or lowercase accepted)",
        check: (output, code) => output.trim().toLowerCase() === "hello, world!" && /(print)\s*\(/i.test(code)
      },
      {
        description: "Uses print() function",
        check: (output, code) => /(print)\s*\(/i.test(code)
      }
    ]
  },
  {
    id: 2,
    title: "Lesson 2: Variables & Data Types",
    topic: "Memory Storage & Assignment",
    badgeId: "variable_master",
    xp: 150,
    puzzleType: "Memory Lesson",
    story: "Store data inside named variables to reuse throughout your program.",
    explanation: `
      <h3>Variables in Python</h3>
      <p>Variables act as labeled containers. Assign values using the <code>=</code> operator.</p>

      <h3>Easy Syntax Template:</h3>
      <div class="code-example">
        <code>user_name = "Alex"<br>score = 100<br>print(user_name)</code>
      </div>
    `,
    task: "Create variable <code>hero_name = 'Py Knight'</code> and <code>level = 5</code>. Print <code>hero_name</code>.",
    starterCode: "",
    placeholder: "Create hero_name and level variables, then print(hero_name)...",
    hints: [
      "hero_name = \"Py Knight\"",
      "level = 5",
      "print(hero_name)"
    ],
    tryYourselfChallenge: "Try creating a variable coins = 250 and print coins!",
    testCases: [
      {
        description: "hero_name equals 'Py Knight' (caps or lowercase accepted)",
        check: (output, code, vars) => (vars && vars.hero_name && vars.hero_name.toString().toLowerCase() === "py knight") || output.toLowerCase().includes("py knight")
      },
      {
        description: "level equals 5",
        check: (output, code, vars) => vars && vars.level == 5
      },
      {
        description: "Prints Py Knight",
        check: (output) => output.toLowerCase().includes("py knight")
      }
    ]
  },
  {
    id: 3,
    title: "Lesson 3: Math Operators & Calculation",
    topic: "Arithmetic Operations",
    badgeId: "math_wizard",
    xp: 200,
    puzzleType: "Math Lesson",
    story: "Perform mathematical calculations using standard Python operators.",
    explanation: `
      <h3>Python Math Operators</h3>
      <ul>
        <li><code>+</code> Addition (e.g. <code>10 + 5</code>)</li>
        <li><code>-</code> Subtraction (e.g. <code>20 - 4</code>)</li>
        <li><code>*</code> Multiplication (e.g. <code>6 * 3</code>)</li>
        <li><code>/</code> Division (e.g. <code>15 / 3</code>)</li>
      </ul>

      <h3>Easy Syntax Template:</h3>
      <div class="code-example">
        <code>total = price + tax<br>print(total)</code>
      </div>
    `,
    task: "Set <code>coins = 25</code> and <code>bonus = 15</code>. Calculate <code>total = coins + bonus</code> and print <code>total</code>.",
    starterCode: "",
    placeholder: "Set coins, bonus, total = coins + bonus, print(total)...",
    hints: [
      "coins = 25",
      "bonus = 15",
      "total = coins + bonus",
      "print(total)"
    ],
    tryYourselfChallenge: "Try multiplying coins * 4 to calculate bonus treasure!",
    testCases: [
      {
        description: "total equals 40",
        check: (output, code, vars) => vars && vars.total == 40
      },
      {
        description: "Outputs 40",
        check: (output) => output.trim().includes("40")
      }
    ]
  },
  {
    id: 4,
    title: "Lesson 4: String Methods & Concatenation",
    topic: "Text Manipulation",
    badgeId: "variable_master",
    xp: 220,
    puzzleType: "String Lesson",
    story: "Combine text strings together and apply built-in string methods like `.upper()`.",
    explanation: `
      <h3>Combining & Manipulating Strings</h3>
      <p>Use <code>+</code> to concatenate (join) strings. Use <code>.upper()</code> to convert text to uppercase.</p>

      <h3>Easy Syntax Template:</h3>
      <div class="code-example">
        <code>first_name = "Py"<br>last_name = "Hero"<br>full_name = first_name + " " + last_name<br>print(full_name.upper())</code>
      </div>
    `,
    task: "Set <code>greeting = 'hello'</code> and <code>target = 'world'</code>. Create <code>message = greeting + ' ' + target</code>. Print <code>message.upper()</code>.",
    starterCode: "",
    placeholder: "Define greeting and target, join them into message, print(message.upper())...",
    hints: [
      "greeting = 'hello'",
      "target = 'world'",
      "message = greeting + ' ' + target",
      "print(message.upper())"
    ],
    tryYourselfChallenge: "Try using .lower() instead to convert text to lowercase!",
    testCases: [
      {
        description: "Outputs 'HELLO WORLD' (caps or lowercase accepted)",
        check: (output) => output.trim().toLowerCase() === "hello world"
      },
      {
        description: "Uses string manipulation",
        check: (output, code) => code.toLowerCase().includes("greeting") || code.toLowerCase().includes("message")
      }
    ]
  },
  {
    id: 5,
    title: "Lesson 5: If, Elif & Else Conditions",
    topic: "Strict Conditional Logic",
    badgeId: "logic_knight",
    xp: 250,
    puzzleType: "Logic Lesson",
    story: "Make decisions in code using `if`, `elif`, and `else` with 4-space indentation.",
    explanation: `
      <h3>Conditional Statements</h3>
      <p>Python evaluates conditions sequentially.</p>

      <h3>Easy Syntax Template:</h3>
      <div class="code-example">
        <code>if score >= 90:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("Rank A")<br>elif score >= 80:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("You Passed!")<br>else:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("Try Again")</code>
      </div>
    `,
    task: "Set <code>score = 85</code>. If <code>score >= 80</code>, print <code>'You Passed!'</code>, else print <code>'Try Again!'</code>.",
    starterCode: "",
    placeholder: "Set score = 85 and write your if/else logic...",
    hints: [
      "score = 85",
      "if score >= 80:",
      "    print(\"You Passed!\")",
      "else:",
      "    print(\"Try Again!\")"
    ],
    tryYourselfChallenge: "Try adding an elif score >= 50 branch!",
    testCases: [
      {
        description: "Outputs 'You Passed!' (caps or lowercase accepted)",
        check: (output) => output.trim().toLowerCase().includes("you passed!")
      },
      {
        description: "Uses if statement",
        check: (output, code) => code.toLowerCase().includes("if ")
      }
    ]
  },
  {
    id: 6,
    title: "Lesson 6: For Loops & Ranges",
    topic: "Definite Iteration",
    badgeId: "loop_weaver",
    xp: 300,
    puzzleType: "Loop Lesson",
    story: "Repeat actions a specific number of times using `for` and `range()`.",
    explanation: `
      <h3>For Loops in Python</h3>
      <p>Use <code>for var in range(start, end):</code> to iterate through numbers.</p>

      <h3>Easy Syntax Template:</h3>
      <div class="code-example">
        <code>for i in range(1, 4):<br>&nbsp;&nbsp;&nbsp;&nbsp;print(i)</code>
      </div>
    `,
    task: "Write a <code>for</code> loop using <code>range(1, 4)</code> to print numbers 1, 2, 3.",
    starterCode: "",
    placeholder: "Write your for loop here...",
    hints: [
      "for i in range(1, 4):",
      "    print(i)"
    ],
    tryYourselfChallenge: "Try range(1, 6) to count up to 5!",
    testCases: [
      {
        description: "Prints 1, 2, and 3",
        check: (output) => output.includes("1") && output.includes("2") && output.includes("3")
      },
      {
        description: "Uses for loop",
        check: (output, code) => code.toLowerCase().includes("for ") && code.toLowerCase().includes("range(")
      }
    ]
  },
  {
    id: 7,
    title: "Lesson 7: While Loops & Counters",
    topic: "Indefinite Iteration",
    badgeId: "loop_weaver",
    xp: 320,
    puzzleType: "Loop Lesson",
    story: "Repeat execution while a condition remains True.",
    explanation: `
      <h3>While Loops</h3>
      <p>A <code>while</code> loop continues running as long as its condition evaluates to True.</p>

      <h3>Easy Syntax Template:</h3>
      <div class="code-example">
        <code>count = 1<br>while count <= 3:<br>&nbsp;&nbsp;&nbsp;&nbsp;print(count)<br>&nbsp;&nbsp;&nbsp;&nbsp;count += 1</code>
      </div>
    `,
    task: "Set <code>count = 1</code>. Write a <code>while count <= 3:</code> loop that prints <code>count</code> and increments <code>count += 1</code>.",
    starterCode: "",
    placeholder: "Set count = 1 and write your while loop...",
    hints: [
      "count = 1",
      "while count <= 3:",
      "    print(count)",
      "    count += 1"
    ],
    tryYourselfChallenge: "Try while count <= 5 to count up to 5!",
    testCases: [
      {
        description: "Prints 1, 2, and 3",
        check: (output) => output.includes("1") && output.includes("2") && output.includes("3")
      },
      {
        description: "Uses while loop",
        check: (output, code) => code.toLowerCase().includes("while ")
      }
    ]
  },
  {
    id: 8,
    title: "Lesson 8: Lists & Indexing",
    topic: "Data Collections",
    badgeId: "list_collector",
    xp: 350,
    puzzleType: "Collection Lesson",
    story: "Store multiple items inside an ordered List using square brackets `[ ]`.",
    explanation: `
      <h3>Python Lists</h3>
      <p>Lists hold multiple values. Add new items using <code>.append()</code>.</p>

      <h3>Easy Syntax Template:</h3>
      <div class="code-example">
        <code>items = ["Shield", "Potion"]<br>items.append("Sword")<br>print(items)</code>
      </div>
    `,
    task: "Create list <code>spells = ['Fireball', 'Ice Shield', 'Teleport']</code>. Append <code>'Lightning'</code> and print <code>spells</code>.",
    starterCode: "",
    placeholder: "Create spells list, append 'Lightning', print(spells)...",
    hints: [
      "spells = ['Fireball', 'Ice Shield', 'Teleport']",
      "spells.append('Lightning')",
      "print(spells)"
    ],
    tryYourselfChallenge: "Try printing spells[0] to access the first element!",
    testCases: [
      {
        description: "spells list contains Lightning (caps or lowercase accepted)",
        check: (output, code, vars) => (vars && vars.spells && vars.spells.some(s => s.toString().toLowerCase() === "lightning")) || output.toLowerCase().includes("lightning")
      },
      {
        description: "Prints spells list",
        check: (output) => output.toLowerCase().includes("lightning")
      }
    ]
  },
  {
    id: 9,
    title: "Lesson 9: Dictionaries & Key-Value Pairs",
    topic: "Structured Data",
    badgeId: "list_collector",
    xp: 380,
    puzzleType: "Collection Lesson",
    story: "Store key-value pairs inside Python Dictionaries using curly braces `{ }`.",
    explanation: `
      <h3>Python Dictionaries</h3>
      <p>Dictionaries map keys to values. Access values by key name: <code>dict["key"]</code>.</p>

      <h3>Easy Syntax Template:</h3>
      <div class="code-example">
        <code>player = {"name": "Py Knight", "hp": 100}<br>print(player["name"])</code>
      </div>
    `,
    task: "Create dictionary <code>player = {'name': 'Py Knight', 'level': 5}</code>. Print <code>player['name']</code>.",
    starterCode: "",
    placeholder: "Create player dictionary and print player['name']...",
    hints: [
      "player = {'name': 'Py Knight', 'level': 5}",
      "print(player['name'])"
    ],
    tryYourselfChallenge: "Try printing player['level'] to see the player level!",
    testCases: [
      {
        description: "player dictionary contains name 'Py Knight' (caps or lowercase accepted)",
        check: (output, code, vars) => (vars && vars.player && vars.player.name && vars.player.name.toString().toLowerCase() === "py knight") || output.toLowerCase().includes("py knight")
      },
      {
        description: "Prints Py Knight",
        check: (output) => output.toLowerCase().includes("py knight")
      }
    ]
  },
  {
    id: 10,
    title: "Lesson 10: Defining Functions & Return",
    topic: "Reusable Code Modules",
    badgeId: "function_alchemist",
    xp: 400,
    puzzleType: "Modular Lesson",
    story: "Write reusable functions using `def` and send back values with `return`.",
    explanation: `
      <h3>Functions with <code>def</code></h3>
      <p>Functions bundle reusable instructions.</p>

      <h3>Easy Syntax Template:</h3>
      <div class="code-example">
        <code>def multiply(a, b):<br>&nbsp;&nbsp;&nbsp;&nbsp;return a * b<br><br>result = multiply(4, 5)<br>print(result)</code>
      </div>
    `,
    task: "Define <code>calculate_xp(level)</code> returning <code>level * 100</code>. Call <code>calculate_xp(3)</code> and print the output.",
    starterCode: "",
    placeholder: "Define calculate_xp(level), call calculate_xp(3), print output...",
    hints: [
      "def calculate_xp(level):",
      "    return level * 100",
      "print(calculate_xp(3))"
    ],
    tryYourselfChallenge: "Try calling calculate_xp(10) for level 10 XP!",
    testCases: [
      {
        description: "calculate_xp(3) outputs 300",
        check: (output) => output.trim().includes("300")
      },
      {
        description: "Uses def keyword",
        check: (output, code) => code.toLowerCase().includes("def calculate_xp(")
      }
    ]
  },
  {
    id: 11,
    title: "Lesson 11: Capstone Dragon Battle",
    topic: "Master Challenge",
    badgeId: "python_champion",
    xp: 500,
    puzzleType: "Boss Challenge",
    story: "Combine variables, loops, and conditionals to deal 30 damage per turn for 4 turns and slay the dragon!",
    explanation: `
      <h3>Master RPG Challenge</h3>
      <p>Set <code>boss_hp = 100</code>. Loop 4 times doing <code>boss_hp -= 30</code>. If <code>boss_hp <= 0</code>, print <code>'Boss Defeated! You Win!'</code>.</p>
    `,
    task: "Set <code>boss_hp = 100</code>, loop 4 times doing <code>boss_hp -= 30</code>. If <code>boss_hp <= 0</code>, print <code>'Boss Defeated! You Win!'</code>.",
    starterCode: "",
    placeholder: "Write your Boss Battle code solution here...",
    hints: [
      "boss_hp = 100",
      "for turn in range(4):",
      "    boss_hp -= 30",
      "if boss_hp <= 0:",
      "    print('Boss Defeated! You Win!')"
    ],
    tryYourselfChallenge: "Try printing boss_hp inside the loop to track damage turn by turn!",
    testCases: [
      {
        description: "Outputs 'Boss Defeated! You Win!' (caps or lowercase accepted)",
        check: (output) => output.toLowerCase().includes("boss defeated")
      },
      {
        description: "boss_hp reduced to <= 0",
        check: (output, code, vars) => vars && vars.boss_hp <= 0
      }
    ]
  },
  {
    id: 12,
    title: "Lesson 12: User Input & Interaction",
    topic: "Interactive Python Programs",
    badgeId: "input_voyager",
    xp: 220,
    puzzleType: "Interaction Lesson",
    story: "Real programs talk to users! Learn how to ask questions and take user answers.",
    explanation: `
      <h3>Taking Input in Python</h3>
      <p>The <code>input()</code> function pauses the program and waits for the user to type something on their keyboard or phone screen!</p>
      
      <h3>Easy Syntax Template:</h3>
      <div class="code-example">
        <code>user_city = input("What city are you in? ")<br>print("Greetings from " + user_city)</code>
      </div>
      <p>Whenever you ask for input, you can store it right inside a variable to use later!</p>
    `,
    task: "Create a variable <code>hero_weapon = 'Magic Staff'</code> and print: <b>Equipped: Magic Staff</b>",
    starterCode: "",
    placeholder: "Set hero_weapon = 'Magic Staff' and print('Equipped: ' + hero_weapon)...",
    hints: [
      "hero_weapon = 'Magic Staff'",
      "print('Equipped: ' + hero_weapon)"
    ],
    tryYourselfChallenge: "Try using input('Enter your weapon: ') to ask yourself live!",
    testCases: [
      {
        description: "Outputs 'Equipped: Magic Staff' (caps or lowercase accepted)",
        check: (output) => output.toLowerCase().includes("equipped") && output.toLowerCase().includes("magic staff")
      },
      {
        description: "Defines hero_weapon variable",
        check: (output, code, vars) => (vars && vars.hero_weapon && vars.hero_weapon.toLowerCase() === "magic staff") || code.toLowerCase().includes("hero_weapon")
      }
    ]
  },
  {
    id: 13,
    title: "Lesson 13: Type Conversion (int, str, float)",
    topic: "Converting Data Types",
    badgeId: "type_artisan",
    xp: 240,
    puzzleType: "Type Conversion Lesson",
    story: "When Python takes user input, it always receives text (String). To calculate with numbers, you must convert it!",
    explanation: `
      <h3>Converting Between Types</h3>
      <ul>
        <li><code>int("10")</code> converts text to integer number <code>10</code></li>
        <li><code>float("9.5")</code> converts text to decimal number <code>9.5</code></li>
        <li><code>str(50)</code> converts number to text <code>"50"</code></li>
      </ul>

      <h3>Easy Syntax Template:</h3>
      <div class="code-example">
        <code>coins_text = "50"<br>coins_number = int(coins_text)<br>doubled = coins_number * 2<br>print(doubled)</code>
      </div>
    `,
    task: "Set <code>price_text = '25'</code>. Convert it to integer and add <code>15</code> bonus. Print the final total (40).",
    starterCode: "",
    placeholder: "price_text = '25' then calculate int(price_text) + 15 and print...",
    hints: [
      "price_text = '25'",
      "total = int(price_text) + 15",
      "print(total)"
    ],
    tryYourselfChallenge: "Try converting a float like float('3.5') and multiply it!",
    testCases: [
      {
        description: "Prints total 40",
        check: (output) => output.includes("40")
      },
      {
        description: "Uses int() conversion",
        check: (output, code) => code.toLowerCase().includes("int(")
      }
    ]
  },
  {
    id: 14,
    title: "Lesson 14: Logical Operators (and, or, not)",
    topic: "Complex Boolean Decisions",
    badgeId: "logic_architect",
    xp: 260,
    puzzleType: "Logic Lesson",
    story: "In real applications and games, you need to test multiple rules at the same time!",
    explanation: `
      <h3>Combining Logic</h3>
      <ul>
        <li><code>and</code>: True ONLY if BOTH conditions are True</li>
        <li><code>or</code>: True if AT LEAST ONE condition is True</li>
        <li><code>not</code>: Reverses True to False, or False to True</li>
      </ul>

      <h3>Easy Syntax Template:</h3>
      <div class="code-example">
        <code>has_ticket = True<br>age = 18<br>if has_ticket and age >= 18:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("Entry Allowed!")</code>
      </div>
    `,
    task: "Set <code>has_pass = True</code> and <code>level = 10</code>. If <code>has_pass and level >= 10:</code> print <code>'Access Granted!'</code>.",
    starterCode: "",
    placeholder: "has_pass = True, level = 10, if has_pass and level >= 10: print('Access Granted!')...",
    hints: [
      "has_pass = True",
      "level = 10",
      "if has_pass and level >= 10:",
      "    print('Access Granted!')"
    ],
    tryYourselfChallenge: "Try testing with or instead of and!",
    testCases: [
      {
        description: "Outputs 'Access Granted!' (caps or lowercase accepted)",
        check: (output) => output.toLowerCase().includes("access granted")
      },
      {
        description: "Uses 'and' operator",
        check: (output, code) => code.toLowerCase().includes(" and ")
      }
    ]
  },
  {
    id: 15,
    title: "Lesson 15: List Power Tools (len, remove, in)",
    topic: "Advanced List Operations",
    badgeId: "list_collector",
    xp: 280,
    puzzleType: "Collection Lesson",
    story: "Supercharge your lists! Essential for building interactive To-Do lists and inventories.",
    explanation: `
      <h3>Essential List Methods</h3>
      <ul>
        <li><code>len(my_list)</code> returns how many items are in the list</li>
        <li><code>my_list.remove("item")</code> removes an item from the list</li>
        <li><code>"item" in my_list</code> checks if an item exists (True / False)</li>
      </ul>

      <h3>Easy Syntax Template:</h3>
      <div class="code-example">
        <code>tasks = ["Code", "Eat", "Sleep"]<br>print(len(tasks)) # Prints 3<br>tasks.remove("Eat")<br>print(tasks) # ["Code", "Sleep"]</code>
      </div>
    `,
    task: "Create list <code>tasks = ['Buy Milk', 'Read Book', 'Exercise']</code>. Remove <code>'Read Book'</code> with <code>tasks.remove('Read Book')</code>. Print <code>tasks</code>.",
    starterCode: "",
    placeholder: "Create tasks list, tasks.remove('Read Book'), and print(tasks)...",
    hints: [
      "tasks = ['Buy Milk', 'Read Book', 'Exercise']",
      "tasks.remove('Read Book')",
      "print(tasks)"
    ],
    tryYourselfChallenge: "Try printing len(tasks) to see how many items remain!",
    testCases: [
      {
        description: "tasks list contains 'Buy Milk' and 'Exercise' (without 'Read Book')",
        check: (output, code, vars) => (vars && vars.tasks && vars.tasks.length === 2 && !vars.tasks.includes("Read Book")) || (output.toLowerCase().includes("buy milk") && !output.toLowerCase().includes("read book"))
      },
      {
        description: "Uses .remove() method",
        check: (output, code) => code.toLowerCase().includes(".remove(")
      }
    ]
  }
];
