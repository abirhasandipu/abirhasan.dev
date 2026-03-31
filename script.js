const storageKey = "theme-preference";
const root = document.documentElement;
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

const getStoredTheme = () => {
  try {
    return localStorage.getItem(storageKey);
  } catch {
    return null;
  }
};

const getPreferredTheme = () => {
  const storedTheme = getStoredTheme();
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return mediaQuery.matches ? "dark" : "light";
};

const applyTheme = (theme) => {
  root.dataset.theme = theme;
};

const setStoredTheme = (theme) => {
  try {
    localStorage.setItem(storageKey, theme);
  } catch {
    return;
  }
};

const renderThemeToggle = () => {
  const header = document.querySelector(".site-header");
  if (!header) {
    return null;
  }

  const button = document.createElement("button");
  button.className = "theme-toggle";
  button.type = "button";
  button.setAttribute("aria-live", "polite");

  const syncLabel = () => {
    const theme = root.dataset.theme === "dark" ? "dark" : "light";
    const nextTheme = theme === "dark" ? "light" : "dark";
    button.textContent = theme === "dark" ? "☾" : "☀";
    button.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
    button.setAttribute("title", `Switch to ${nextTheme} mode`);
  };

  button.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    setStoredTheme(nextTheme);
    syncLabel();
  });

  header.append(button);
  syncLabel();
  return button;
};

applyTheme(getPreferredTheme());
renderThemeToggle();

mediaQuery.addEventListener("change", (event) => {
  if (getStoredTheme()) {
    return;
  }

  applyTheme(event.matches ? "dark" : "light");
  document.querySelector(".theme-toggle")?.remove();
  renderThemeToggle();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

document.querySelectorAll(".reveal").forEach((section) => {
  observer.observe(section);
});
