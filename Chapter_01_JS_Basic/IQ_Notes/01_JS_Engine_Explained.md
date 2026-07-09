# JavaScript Engine — How It Works

## What is a JS Engine?

A **JavaScript Engine** is a program that executes JavaScript code. It parses, compiles (JIT), and runs the code, managing memory along the way.

---

## JS Engine Comparison Table

| Engine | Browser | Language | JIT Compiler | Key Innovation |
|--------|---------|----------|-------------|----------------|
| **V8** | Chrome, Edge, Brave, Opera | C++ | TurboFan + Ignition | Fast property access, hidden classes |
| **SpiderMonkey** | Firefox | C++ (Rust in parts) | IonMonkey + Baseline | First JS engine ever (2009) |
| **JavaScriptCore (Nitro)** | Safari | C++ | DFG + B3 + FTL | Low memory footprint, ARM optimized |
| **Chakra** | Legacy Edge (pre-2019) | C++ | SimpleJIT + FullJIT | Parallel parsing, reclaims memory faster |

---

## Walkthrough: How Your Code Flows Through the Engine

Let's trace what happens when you run this file:

### Code (from `01_helloworld.js`)

```javascript
console.log("Hello Wolrd")
```

### Step‑by‑Step Engine Pipeline

| Step | Layer | What Happens | Our Code's Example |
|------|-------|-------------|-------------------|
| **1** | **Source Code** | Raw text/file fed into the engine | The string `console.log("Hello Wolrd")` is read |
| **2** | **Scanner / Lexer** | Breaks text into **tokens** (keywords, identifiers, operators, literals) | Tokens: `console`, `.`, `log`, `(`, `"Hello Wolrd"`, `)` |
| **3** | **Parser** | Builds an **AST** (Abstract Syntax Tree) from tokens — validates grammar | A tree: `CallExpression` → `MemberExpression(console.log)` with `StringLiteral("Hello Wolrd")` |
| **4** | **Interpreter (Ignition)** | Walks the AST and generates **bytecode** — runs code immediately | Bytecode: `LoadProperty console "log"`, `LoadStr "Hello Wolrd"`, `Call` |
| **5** | **Profiler** | Watches hot code paths (functions called many times) | This runs once, no hot path detected (trivial script) |
| **6** | **Compiler (TurboFan)** | Optimises hot bytecode into **machine code** for the CPU | In a longer loop, TurboFan would generate x86/ARM instructions |
| **7** | **Execution** | CPU runs the machine code / interpreter runs the bytecode | `"Hello Wolrd"` printed to the console |
| **8** | **Memory Management** | GC (Orinoco / Scavenger) reclaims unused heap memory | The temporary string `"Hello Wolrd"` is freed after the call |

---

## Visual Pipeline (V8)

```
Source Code  →  Scanner  →  Parser  →  AST  →  Ignition (Interpreter)
                                                     ↓
                                                Bytecode
                                                     ↓
                                             TurboFan (JIT Compiler)
                                                     ↓
                                              Machine Code  →  CPU
```

- **Ignition** runs bytecode fast on first execution.
- **TurboFan** watches for "hot" paths and compiles them to optimised native code.
- If TurboFan's assumptions break, it **deoptimises** back to bytecode.

---

## Why This Matters in Playwright

Playwright runs JavaScript inside actual browser engines (Chromium = V8, Firefox = SpiderMonkey, WebKit = JavaScriptCore). When you write:

```javascript
await page.evaluate(() => document.title);
```

That string is **parsed and executed by the browser's JS engine**, not Node's. The same pipeline above runs inside the browser context.

---

## Summary

| Concept | Takeaway |
|---------|----------|
| JS Engine | Converts human-readable JS → machine-executable code |
| Interpreter | Runs code immediately (fast startup) |
| JIT Compiler | Optimises hot code paths (fast long-run performance) |
| GC | Automatically frees memory you no longer use |
| V8 | The engine behind Chrome, Edge, and Node.js |
