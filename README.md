# ⚡ FlowBoard

<div align="center">

**A minimalist, local-first Kanban task management application designed for speed and clarity.**

<br/>

[![Live Demo](https://img.shields.io/badge/Live_Demo-flowboard--hazal.netlify.app-4F46E5?style=for-the-badge&logo=netlify&logoColor=white)](https://flowboard-hazal.netlify.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

<br/>

| Light Mode | Dark Mode |
| :---: | :---: |
| ![Light Mode](screenshots/light.png) | ![Dark Mode](screenshots/dark.png) |

<br/>

[Explore Demo](https://flowboard-hazal.netlify.app/) • [Features](#-key-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Architecture](#-project-structure)

</div>

---

## 💡 Overview

**FlowBoard** is a modern task manager inspired by tools like Linear and Notion. It strips away the bloat of traditional project management tools in favor of a clean, responsive, and completely private user experience.

- **Zero setup:** No sign-up, no database to configure, no cloud subscriptions.
- **Local-first privacy:** All data remains strictly inside your browser's local storage.
- **Fluid interactions:** Native HTML5 Drag and Drop without external library overhead.
- **Instant response:** Built on Vite and React 19 for instantaneous render and sub-millisecond filtering.

---

## ✨ Key Features

### 🎯 Streamlined Kanban Workflow
- **4-Stage Pipeline:** Organize work across *To Do*, *In Progress*, *In Review*, and *Done*.
- **Native Drag & Drop:** Move cards between stages with real-time drop-zone highlights.
- **Quick Actions:** Toggle completion status with one click, or jump directly into modal editing.

### 🔍 Instant Search & Filtering
- **Live Search:** Instant client-side filtering across task titles and descriptions.
- **Priority Triage:** Filter by severity levels: `Urgent`, `High`, `Medium`, and `Low`.
- **Progress Tracking:** Real-time completion counter and percentage indicator.

### 💾 Data Portability & Backup
- **JSON Export:** Download your entire board as an offline `.json` backup file.
- **JSON Import:** Restore or migrate tasks between browsers with format validation.
- **Demo Reset:** One-click restore to sample engineering sprint tasks for evaluation.

### 🌓 Thoughtful Design & Theming
- **Adaptive Dark / Light Theme:** Custom-tailored color palettes using Tailwind CSS v4 custom variants.
- **Responsive Layout:** Optimized from compact mobile views to ultrawide desktop monitors.
- **Accessible & Clean Typography:** High contrast ratios, semantic hierarchy, and subtle transitions.

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) | Component architecture & declarative state management |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict type safety, interfaces, and compile-time validation |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern utility-first styling with native dark mode variant |
| **Icons** | [Lucide React](https://lucide.dev/) | Crisp, consistent icon set |
| **Bundler** | [Vite](https://vitejs.dev/) | Ultra-fast HMR and production rollups |
| **Hosting** | [Netlify](https://www.netlify.com/) | Continuous deployment with automated build pipeline |

---

## 📂 Project Structure

```text
flowboard/
├── public/
│   └── favicon.svg              # Custom SVG icon
├── screenshots/
│   ├── light.png                # Light mode capture
│   └── dark.png                 # Dark mode capture
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── Column.tsx           # Column droppable container
│   │   ├── DeleteConfirmModal.tsx # Safe deletion dialog
│   │   ├── FilterBar.tsx        # Search, priority pills & metrics
│   │   ├── Header.tsx           # Brand navigation & primary actions
│   │   ├── ImportExportModal.tsx# JSON backup & restore modal
│   │   ├── TaskCard.tsx         # Draggable task item
│   │   └── TaskModal.tsx        # Task creation & edit dialog
│   ├── interfaces/              # TypeScript contracts
│   │   ├── column.ts            # Column definitions
│   │   ├── filter.ts            # Filter & stats models
│   │   └── task.ts              # Core Task data models
│   ├── pages/
│   │   └── BoardPage.tsx        # Board view & state coordinator
│   ├── utils/                   # Shared utilities
│   │   ├── constants.ts         # Initial mock tasks & presets
│   │   ├── date.ts              # Relative date formatting
│   │   └── storage.ts           # LocalStorage synchronization
│   ├── App.tsx                  # Root component
│   ├── index.css                # Base stylesheet & dark mode variants
│   └── main.tsx                 # Application bootstrap
├── index.html                   # HTML entry point
├── netlify.toml                 # Production routing rules
├── package.json                 # Project dependencies & scripts
└── vite.config.ts               # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or later recommended)
- `npm`, `pnpm`, or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hazalakks/flowboard.git
   cd flowboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Lint the codebase:**
   ```bash
   npm run lint
   ```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to use and adapt it for your own personal or commercial projects.
