# 🗂️ Todoodle

**Todoodle** is a cross-platform personal desktop task management application built with **Electron.js** and **MongoDB**. Designed for professionals, executives, and productivity enthusiasts, it offers a modern, responsive dashboard for organizing daily tasks, tracking accomplishments, and customizing the interface through light/dark theming.

---

## 🚀 Features

* ✅ **Executive Dashboard** – A sleek, user-focused interface for managing tasks efficiently.
* 📎 **Persistent Storage** – Local MongoDB integration ensures your data remains secure and private.
* 📊 **Progress Tracking** – Visual progress bars and daily completion stats to keep you on track.
* 🌗 **Theme Toggle** – Supports light/dark modes with real-time switching and system preference detection.
* ⌨️ **Keyboard Shortcuts** – Quickly toggle themes using `Ctrl/Cmd + Shift + T`.
* 📱 **Responsive Design** – Optimized for both desktop and scaled views.
* 📦 **Electron Packaging** – Cross-platform compatibility via Electron Forge for seamless deployment.

---

## 📅 Getting Started

### 📌 Prerequisites

* [Node.js](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/)
* [Electron](https://www.electronjs.org/)

### 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Punit9464/Todoodle.git
   cd Todoodle
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Ensure MongoDB is running locally:

   * Default port: `mongodb://localhost:27017`

4. Start the application:

   ```bash
   npm start
   ```

---

## 🧱 Project Structure

```
Todoodle/
├── assets/              # App icons and static images
├── schema/
│   └── todo.js          # Mongoose schema for task model
├── styles.css           # Shared styles
├── home.html            # Landing page markup
├── home.css             # Landing page styles
├── dashboard.html       # Main task dashboard UI
├── dashboard.js         # Task rendering and logic
├── theme-toggle.js      # Theme switching functionality
├── preload.js           # Secure context bridging
└── main.js              # Electron main process and IPC handlers
```

---

## 🛠️ Packaging

To package the application for production:

```bash
npm run make
```

Electron Forge will generate builds for your operating system under the `out/` directory.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

Made with 💻 by [Punit Kumar](https://github.com/Punit9464)
