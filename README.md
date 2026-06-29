# DSA Code Reviewer

An AI-powered web app that reviews your Data Structures & Algorithms (DSA) solutions in seconds. Paste a problem statement and your code, pick a language, and get structured feedback on **correctness, time/space complexity, optimizations, and code quality** — powered by the [Groq](https://groq.com/) LLM API.

The UI is built with React + Vite + Material UI, supports **light/dark mode**, and uses a LeetCode-inspired color palette.

---

## ✨ Features

- **Instant AI reviews** of DSA solutions using Groq's `llama-3.3-70b-versatile` model.
- **Structured feedback**: Verdict, Correctness, Complexity, Optimization, Code Quality, and Suggested Improvements.
- **Multi-language support** (Python, Java, C++, C, C#, Go, Rust, TypeScript, Kotlin, and more).
- **Light / Dark theme** toggle with system-preference detection and persistence.
- **Markdown-rendered** output with formatted code blocks.

---

## 🧩 Use Case

This tool is ideal for:

- **Students & interview prep** — validate your LeetCode / HackerRank solutions and learn better approaches.
- **Self-review** — get a fast "second opinion" on correctness and complexity before submitting.
- **Learning** — understand why a solution is sub-optimal and how to improve it.

You provide the **problem statement** (optional) and your **solution code**, and the app returns a detailed, mentor-style review.

---

## 🛠️ Tech Stack

| Layer      | Technology                           |
| ---------- | ------------------------------------ |
| Frontend   | React 19, Vite                       |
| UI library | Material UI (MUI)                    |
| AI / LLM   | Groq SDK (`llama-3.3-70b-versatile`) |
| Markdown   | react-markdown                       |

---

## 📋 Prerequisites

Before installing, make sure you have:

- **[Node.js](https://nodejs.org/)** v18 or later (includes `npm`)
- A free **Groq API key** (steps below)
- A code editor such as **VS Code** (optional)

Check your Node version:

```bash
node --version
npm --version
```

---

## 🔑 Step 1 — Generate a Groq API Key

The app calls the Groq API, which requires a personal API key.

1. Go to **<https://console.groq.com/keys>**.
2. **Sign in** (or create a free account).
3. Click **"Create API Key"**.
4. Give it a name (e.g. `dsa-code-reviewer`) and click **Submit**.
5. **Copy the key immediately** — it starts with `gsk_...` and is shown only once.

> ⚠️ **Keep your key secret.** Never commit it to Git or share it publicly. If it leaks, revoke it from the same page and create a new one.

---

## 📥 Step 2 — Install the Project

Clone the repository and install dependencies:

```bash
# Clone the repo
git clone https://github.com/ASHarish001/dsa_code_reviewer.git

# Enter the project folder
cd dsa_code_reviewer

# Install dependencies
npm install
```

---

## ⚙️ Step 3 — Configure Your API Key

The project reads the Groq key from an environment file.

1. Copy the example file to create your local env file:

   ```bash
   # macOS / Linux
   cp .env.example .env.local

   # Windows (PowerShell)
   copy .env.example .env.local
   ```

2. Open **`.env.local`** and paste your key:

   ```dotenv
   VITE_GROQ_API_KEY=gsk_your_actual_key_here
   ```

> 🔒 `.env.local` is already listed in `.gitignore`, so your key stays out of version control.

---

## ▶️ Step 4 — Run on Localhost

Start the Vite development server:

```bash
npm run dev
```

You'll see output like:

```
  VITE v8.x  ready in 400 ms

  ➜  Local:   http://localhost:5173/
```

Open **<http://localhost:5173/>** in your browser. 🎉

> If you change `.env.local`, **restart** the dev server for the new key to take effect.

---

## 🚀 How to Use the App

1. _(Optional)_ Paste the **Problem Statement**.
2. Select the **Language** of your solution.
3. Paste your **Solution** code.
4. Click **Review Code**.
5. Read the AI-generated review in the right panel.
6. Toggle the **light/dark** mode icon in the top bar anytime.

---

## 📦 Available Scripts

| Command           | Description                            |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Start the local development server     |
| `npm run build`   | Build a production bundle into `dist/` |
| `npm run preview` | Preview the production build locally   |
| `npm run lint`    | Run ESLint across the project          |

---

## 🏗️ Building for Production

```bash
npm run build
npm run preview
```

The optimized static site is generated in the `dist/` folder, ready to deploy to any static host (Vercel, Netlify, GitHub Pages, etc.).

> ⚠️ **Security note:** This app calls Groq directly from the browser using `dangerouslyAllowBrowser`, which exposes the API key in the client bundle. That's fine for local use and personal demos. For a **public deployment**, move the Groq call behind a backend/serverless proxy so the key stays server-side.

---

## 📁 Project Structure

```
ai-code-reviewer/
├── index.html
├── vite.config.js
├── .env.example
└── src/
    ├── main.jsx              # App entry + theme/color-mode provider
    ├── App.jsx               # Main UI (inputs, review panel, theme toggle)
    ├── theme.js              # Light/dark MUI themes (LeetCode palette)
    ├── components/
    │   └── MarkdownView.jsx  # Renders the AI review markdown
    └── services/
        └── groq.js           # Groq API call + prompt construction
```

---

## 🧯 Troubleshooting

- **"Missing Groq API key" error** → Ensure `.env.local` exists, the variable is named exactly `VITE_GROQ_API_KEY`, and you **restarted** `npm run dev`.
- **Port already in use** → Vite will pick the next free port, or run `npm run dev -- --port 3000`.
- **Blank/no review** → Check the browser console and verify your API key is valid and not revoked.
