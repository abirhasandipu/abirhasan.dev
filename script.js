const storageKey = "theme-preference";
const root = document.documentElement;
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const sunIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="4.5"></circle>
    <path d="M12 2.5v2.5M12 19v2.5M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2.5 12H5M19 12h2.5M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"></path>
  </svg>
`;
const moonIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M18.2 15.4A7.9 7.9 0 0 1 8.6 5.8a8.5 8.5 0 1 0 9.6 9.6Z"></path>
  </svg>
`;

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
    button.innerHTML = theme === "dark" ? moonIcon : sunIcon;
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
