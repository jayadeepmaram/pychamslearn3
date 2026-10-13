// PyQuest Mini-Projects Dataset
// Professional, beginner-friendly software projects with database integration guide

const PROJECTS = [
  {
    id: "calculator",
    title: "Project 1: Command-Line Calculator with History Database",
    category: "Utility Application",
    badgeId: "project_creator",
    difficulty: "Beginner",
    description: "Write a modular calculation program that processes addition, subtraction, multiplication, and division, and learn how to store calculation history in an SQLite database.",
    concepts: ["Functions", "Arithmetic Operators", "Conditional Logic", "Database Storage (sqlite3)"],
    guidance: `
      <h4>Project Overview</h4>
      <p>In this project, you will write a calculation tool using modular functions. You will define dedicated functions for each operation, test division safety (avoiding division by zero), and optionally record your calculations to a persistent database.</p>

      <h4>Step 1: Write Operation Functions</h4>
      <p>Define four functions using the <code>def</code> keyword. Each function should accept two numbers (<code>a</code> and <code>b</code>) and return the computed result:</p>
      <pre><code>def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        return "Error: Division by zero"
    return a / b</code></pre>

      <h4>Step 2: Process User Selection</h4>
      <p>Assign your test numbers and operation type, then use <code>if/elif/else</code> statements to call the correct function and print the output:</p>
      <pre><code>num1 = 20
num2 = 5
operation = "+"

if operation == "+":
    result = add(num1, num2)
elif operation == "-":
    result = subtract(num1, num2)
elif operation == "*":
    result = multiply(num1, num2)
elif operation == "/":
    result = divide(num1, num2)

print("Calculation Result:", result)</code></pre>

      <h4>Step 3: Database Integration (SQLite)</h4>
      <p>Python includes a built-in relational database module called <code>sqlite3</code>. It requires zero server setup and stores data directly in a local file. Here is how to create a database table and save calculation records:</p>
      <pre><code>import sqlite3

# 1. Connect to database file (creates it if it does not exist)
conn = sqlite3.connect("calculator_history.db")
cursor = conn.cursor()

# 2. Create table for history
cursor.execute('''
    CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        num1 REAL,
        operation TEXT,
        num2 REAL,
        result REAL
    )
''')

# 3. Insert calculation record
cursor.execute('''
    INSERT INTO history (num1, operation, num2, result)
    VALUES (?, ?, ?, ?)
''', (num1, operation, num2, result))
conn.commit()

# 4. Fetch and display saved records
cursor.execute("SELECT * FROM history")
rows = cursor.fetchall()
print("Saved Calculations in Database:")
for row in rows:
    print(row)

# 5. Always close database connection when done
conn.close()</code></pre>
    `,
    starterCode: `# Project 1: Command-Line Calculator
# Instructions:
# 1. Define functions for add, subtract, multiply, and divide.
# 2. Set your input numbers and operation symbol.
# 3. Use if/elif/else to calculate and print the result.
# 4. (Optional) Follow the Database Guide to store results using sqlite3.

# Step 1: Write your calculation functions below
def add(a, b):
    # Return sum of a and b
    pass

def subtract(a, b):
    # Return difference of a and b
    pass

def multiply(a, b):
    # Return product of a and b
    pass

def divide(a, b):
    # Return quotient, check if b == 0
    pass

# Step 2: Set input values
num1 = 20
num2 = 5
operation = "+"

# Step 3: Call the matching function based on operation and print the result


`,
    verify: (output, code) => {
      const hasDef = code.includes("def add") || code.includes("def subtract") || code.includes("def multiply") || code.includes("def divide");
      const hasOutput = output.toLowerCase().includes("result") || output.toLowerCase().includes("calculation") || /\d+/.test(output);
      const hasIf = code.includes("if ") && (code.includes("+") || code.includes("-") || code.includes("*") || code.includes("/"));
      return hasDef && hasIf && hasOutput;
    }
  },
  {
    id: "todolist",
    title: "Project 2: Task Management System with Database Storage",
    category: "Productivity Application",
    badgeId: "project_creator",
    difficulty: "Beginner",
    description: "Build a structured task manager to add, list, and complete tasks, and connect it to an SQLite database for persistent storage.",
    concepts: ["Lists", "List Methods", "Loops", "Database Operations (sqlite3)"],
    guidance: `
      <h4>Project Overview</h4>
      <p>A task management system allows users to store items, view active records, and remove completed work. In memory, Python lists provide the initial structure. For permanent persistence across app restarts, SQLite tables are used.</p>

      <h4>Step 1: In-Memory Task Management</h4>
      <p>Create a list of strings, append a new task using <code>.append()</code>, loop through items to print their numbering, and remove an item using <code>.remove()</code>:</p>
      <pre><code>tasks = ["Review Python syntax", "Write unit test"]

# Add task
tasks.append("Deploy project")

# Display tasks
print("Current Tasks:")
for index, task in enumerate(tasks, 1):
    print(str(index) + ". " + task)

# Complete and remove task
tasks.remove("Review Python syntax")
print("Remaining Tasks:", tasks)</code></pre>

      <h4>Step 2: Connecting to an SQLite Database</h4>
      <p>To ensure tasks are not lost when the program terminates, use Python's built-in <code>sqlite3</code> library:</p>
      <pre><code>import sqlite3

# 1. Open database connection
conn = sqlite3.connect("tasks.db")
cursor = conn.cursor()

# 2. Define schema
cursor.execute('''
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        status TEXT DEFAULT 'pending'
    )
''')

# 3. Insert task into database
new_task_title = "Complete Python course"
cursor.execute("INSERT INTO tasks (title, status) VALUES (?, ?)", (new_task_title, "pending"))
conn.commit()

# 4. Query all tasks from database
cursor.execute("SELECT id, title, status FROM tasks")
saved_tasks = cursor.fetchall()

print("Database Records:")
for task in saved_tasks:
    print(f"ID {task[0]}: {task[1]} [{task[2]}]")

# 5. Mark task as completed
cursor.execute("UPDATE tasks SET status = 'completed' WHERE id = ?", (1,))
conn.commit()

# 6. Close database connection
conn.close()</code></pre>
    `,
    starterCode: `# Project 2: Task Management System
# Instructions:
# 1. Initialize a list of tasks.
# 2. Add a new task using .append().
# 3. Loop through your list to print all tasks.
# 4. Remove a finished task using .remove().
# 5. (Optional) Connect to SQLite database using the guide on the left.

# Step 1: Create your initial task list
tasks = ["Setup environment", "Write code"]

# Step 2: Append a new task


# Step 3: Print all active tasks


# Step 4: Complete and remove a task


`,
    verify: (output, code) => {
      const hasList = code.includes("tasks") || code.includes("[");
      const hasAppendOrRemove = code.includes(".append(") || code.includes(".remove(") || code.includes("sqlite3");
      const hasOutput = output.toLowerCase().includes("task") || output.toLowerCase().includes("tasks") || output.length > 10;
      return hasList && hasAppendOrRemove && hasOutput;
    }
  },
  {
    id: "guessing_game",
    title: "Project 3: Guessing Game with Leaderboard Database",
    category: "Game Application",
    badgeId: "project_creator",
    difficulty: "Beginner",
    description: "Develop a number guessing game with conditional evaluation, and record scores and attempts to a high-score database table.",
    concepts: ["Loops", "Conditionals", "Comparison Operators", "Database High Scores"],
    guidance: `
      <h4>Project Overview</h4>
      <p>This program sets a secret number and evaluates player guesses against it, giving 'Too High' or 'Too Low' guidance until the exact number is found.</p>

      <h4>Step 1: Comparison Logic</h4>
      <p>Compare guesses against a target number using <code>&lt;</code>, <code>&gt;</code>, and <code>==</code> inside a loop:</p>
      <pre><code>secret_number = 7
guesses = [3, 9, 7]
attempts = 0

for guess in guesses:
    attempts += 1
    if guess &lt; secret_number:
        print("Guess", guess, "is too low.")
    elif guess &gt; secret_number:
        print("Guess", guess, "is too high.")
    else:
        print("Correct! Found the number in", attempts, "attempts.")
        break</code></pre>

      <h4>Step 2: Leaderboard Database Integration</h4>
      <p>Save user scores and attempts to an SQLite database table to preserve high scores:</p>
      <pre><code>import sqlite3

conn = sqlite3.connect("leaderboard.db")
cursor = conn.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        player_name TEXT,
        attempts INTEGER
    )
''')

# Insert score
cursor.execute("INSERT INTO scores (player_name, attempts) VALUES (?, ?)", ("Player1", attempts))
conn.commit()

# Fetch top scores
cursor.execute("SELECT player_name, attempts FROM scores ORDER BY attempts ASC LIMIT 5")
for rank, row in enumerate(cursor.fetchall(), 1):
    print(f"Rank {rank}: {row[0]} - {row[1]} attempts")

conn.close()</code></pre>
    `,
    starterCode: `# Project 3: Number Guessing Game
# Instructions:
# 1. Set a secret number between 1 and 10.
# 2. Define a list of player guesses or take input.
# 3. Compare each guess using if/elif/else.
# 4. Print hints ('Too low', 'Too high') and celebrate when correct.
# 5. (Optional) Save attempts to SQLite database using the guide on the left.

# Step 1: Set your secret target number
secret_number = 7
attempts = 0
guesses = [4, 8, 7]

# Step 2: Loop through guesses and test conditions


`,
    verify: (output, code) => {
      const hasSecret = code.includes("secret_number") || code.includes("guess");
      const hasIf = code.includes("if ") && (code.includes("<") || code.includes(">") || code.includes("=="));
      const hasOutput = output.toLowerCase().includes("low") || output.toLowerCase().includes("high") || output.toLowerCase().includes("correct") || output.toLowerCase().includes("found");
      return hasSecret && hasIf && hasOutput;
    }
  }
];
