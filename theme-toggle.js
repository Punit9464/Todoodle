// Theme Toggle Functionality - Separate from main dashboard logic
class ThemeManager {
  constructor() {
    this.themeToggle = document.querySelector("#themeToggle")
    this.currentTheme = localStorage.getItem("todoodle-theme") || "dark"

    this.init()
  }

  init() {
    // Set initial theme
    this.setTheme(this.currentTheme)

    // Add event listener
    this.themeToggle.addEventListener("click", () => {
      this.toggleTheme()
    })

    // Add keyboard shortcut (Ctrl/Cmd + Shift + T)
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "T") {
        e.preventDefault()
        this.toggleTheme()
      }
    })
  }

  setTheme(theme) {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light")
    } else {
      document.documentElement.removeAttribute("data-theme")
    }

    this.currentTheme = theme
    localStorage.setItem("todoodle-theme", theme)

    // Update button aria-label for accessibility
    const label = theme === "light" ? "Switch to dark theme" : "Switch to light theme"
    this.themeToggle.setAttribute("aria-label", label)
  }

  toggleTheme() {
    const newTheme = this.currentTheme === "dark" ? "light" : "dark"
    this.setTheme(newTheme)

    // Add a subtle animation feedback
    this.themeToggle.style.transform = "scale(0.95)"
    setTimeout(() => {
      this.themeToggle.style.transform = "scale(1)"
    }, 100)
  }

  getTheme() {
    return this.currentTheme
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.themeManager = new ThemeManager()
})

// Respect system preference on first visit
if (!localStorage.getItem("todoodle-theme")) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  localStorage.setItem("todoodle-theme", prefersDark ? "dark" : "light")
}
