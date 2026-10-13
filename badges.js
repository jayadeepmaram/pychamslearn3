// PyQuest Badges Dataset & Renderer
const BADGES = [
  {
    id: "first_print",
    name: "First Print",
    title: "Syntax Initiate",
    icon: `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 17l6-6-6-6M12 19h8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    color: "#00f2fe",
    bgGradient: "linear-gradient(135deg, rgba(0,242,254,0.2), rgba(79,172,254,0.1))",
    description: "Successfully executed your very first Python print statement!"
  },
  {
    id: "variable_master",
    name: "Variable Master",
    title: "Data Keeper",
    icon: `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    color: "#a855f7",
    bgGradient: "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(192,132,252,0.1))",
    description: "Mastered storage chests, text strings, numbers & boolean variables."
  },
  {
    id: "math_wizard",
    name: "Math Wizard",
    title: "Alchemical Calculator",
    icon: `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/><line x1="5" y1="19" x2="19" y2="19"/></svg>`,
    color: "#eab308",
    bgGradient: "linear-gradient(135deg, rgba(234,179,8,0.2), rgba(250,204,21,0.1))",
    description: "Performed mathematical formulas and arithmetic magic."
  },
  {
    id: "logic_knight",
    name: "Logic Knight",
    title: "Guardian of If/Else",
    icon: `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    color: "#3b82f6",
    bgGradient: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(96,165,250,0.1))",
    description: "Conquered decision gates using Python conditional logic."
  },
  {
    id: "loop_weaver",
    name: "Loop Weaver",
    title: "Chrono Sorcerer",
    icon: `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`,
    color: "#10b981",
    bgGradient: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(52,211,153,0.1))",
    description: "Automated repetitive tasks with Python for-loops and ranges."
  },
  {
    id: "list_collector",
    name: "List Collector",
    title: "Inventory Master",
    icon: `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="15" x2="15" y2="15"/></svg>`,
    color: "#ec4899",
    bgGradient: "linear-gradient(135deg, rgba(236,72,153,0.2), rgba(244,114,182,0.1))",
    description: "Organized data into ordered lists and appended items."
  },
  {
    id: "function_alchemist",
    name: "Function Alchemist",
    title: "Spell Creator",
    icon: `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    color: "#8b5cf6",
    bgGradient: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(167,139,250,0.1))",
    description: "Crafted modular reusable functions with return values."
  },
  {
    id: "python_champion",
    name: "Python Champion",
    title: "Grand Master of Python",
    icon: `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>`,
    color: "#f43f5e",
    bgGradient: "linear-gradient(135deg, rgba(244,63,94,0.3), rgba(251,113,133,0.15))",
    description: "Defeated the Python Shadow Dragon in the final RPG capstone level!"
  },
  {
    id: "input_voyager",
    name: "Input Voyager",
    title: "Interactive Communicator",
    icon: `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h8M6 16h12"/></svg>`,
    color: "#06b6d4",
    bgGradient: "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(14,165,233,0.1))",
    description: "Learned to capture live user keyboard inputs with input()!"
  },
  {
    id: "type_artisan",
    name: "Type Artisan",
    title: "Data Transformer",
    icon: `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/></svg>`,
    color: "#f97316",
    bgGradient: "linear-gradient(135deg, rgba(249,115,22,0.2), rgba(251,146,60,0.1))",
    description: "Mastered data type conversion between int, str, and float!"
  },
  {
    id: "logic_architect",
    name: "Logic Architect",
    title: "Boolean Strategist",
    icon: `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2"><circle cx="7" cy="12" r="5"/><circle cx="17" cy="12" r="5"/></svg>`,
    color: "#6366f1",
    bgGradient: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(129,140,248,0.1))",
    description: "Built multi-condition logic using 'and', 'or', and 'not'!"
  },
  {
    id: "project_creator",
    name: "Python Creator",
    title: "Master Software Builder",
    icon: `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    color: "#eab308",
    bgGradient: "linear-gradient(135deg, rgba(234,179,8,0.3), rgba(250,204,21,0.15))",
    description: "Successfully built and ran a real Python Mini-Project!"
  }
];
