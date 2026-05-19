const storageKey = "theme-preference";
const root = document.documentElement;
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const mobileNavQuery = window.matchMedia("(max-width: 680px)");
const fontAwesomeHref =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css";
const menuIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M4 7h16M4 12h16M4 17h16"></path>
  </svg>
`;

const ensureFontAwesome = () => {
  if (document.querySelector('link[data-fontawesome="true"]')) {
    return;
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = fontAwesomeHref;
  link.crossOrigin = "anonymous";
  link.referrerPolicy = "no-referrer";
  link.dataset.fontawesome = "true";
  document.head.append(link);
};

const getSemanticText = (element) =>
  (element?.textContent || "").trim().replace(/\s+/g, " ");

const iconMarkup = (classes) =>
  `<span class="fa-inline-icon" aria-hidden="true"><i class="${classes}"></i></span>`;

const applyIconLabel = (element, classes) => {
  if (!element || !classes) {
    return;
  }

  const label = element.textContent.trim();
  if (!label) {
    return;
  }

  element.classList.add("with-icon");
  element.innerHTML = `${iconMarkup(classes)}<span class="label-text">${label}</span>`;
};

const decorateNav = () => {
  const navIcons = {
    "index.html": "fa-solid fa-house",
    "my-work.html": "fa-solid fa-briefcase",
    "about.html": "fa-solid fa-user",
    "focus.html": "fa-solid fa-compass-drafting",
    "interests.html": "fa-solid fa-heart",
    "contact.html": "fa-solid fa-envelope",
  };

  document.querySelectorAll(".nav a").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const key = Object.keys(navIcons).find((item) => href.endsWith(item));
    applyIconLabel(link, key ? navIcons[key] : "fa-solid fa-link");
  });
};

const decorateButtons = () => {
  const buttonIcons = {
    "Work with me": "fa-solid fa-handshake",
    "View projects": "fa-solid fa-table-cells-large",
    "Open career focus page": "fa-solid fa-compass-drafting",
    "Get in touch": "fa-solid fa-paper-plane",
    "See career focus": "fa-solid fa-compass-drafting",
    "Live Site": "fa-solid fa-arrow-up-right-from-square",
    "Case Study": "fa-regular fa-file-lines",
    GitHub: "fa-brands fa-github",
  };

  document.querySelectorAll(".button").forEach((button) => {
    const label = getSemanticText(button);
    applyIconLabel(button, buttonIcons[label] || null);
  });
};

const decorateContactLinks = () => {
  document.querySelectorAll(".contact-links a").forEach((link) => {
    const href = link.getAttribute("href") || "";
    let icon = "fa-solid fa-link";

    if (href.startsWith("mailto:")) {
      icon = "fa-solid fa-envelope";
    } else if (href.includes("github.com")) {
      icon = "fa-brands fa-github";
    } else if (href.includes("linkedin.com")) {
      icon = "fa-brands fa-linkedin";
    }

    applyIconLabel(link, icon);
  });
};

const decorateLabels = () => {
  const labelIcons = {
    Portfolio: "fa-solid fa-sparkles",
    About: "fa-solid fa-user",
    Biography: "fa-solid fa-book-open",
    Timeline: "fa-solid fa-timeline",
    "Working Style": "fa-solid fa-people-arrows-left-right",
    "Career Focus": "fa-solid fa-compass-drafting",
    "About xCloud": "fa-solid fa-cloud",
    Contact: "fa-solid fa-envelope-open-text",
    "Current snapshot": "fa-solid fa-chart-column",
    "Reach Out": "fa-solid fa-address-book",
    "What I Can Help With": "fa-solid fa-toolbox",
    "Project 01": "fa-solid fa-train-subway",
    "Project 02": "fa-solid fa-coins",
    "Project 03": "fa-solid fa-house-user",
    "Blog Post 01": "fa-solid fa-file-signature",
    "Blog Post 02": "fa-solid fa-file-signature",
    "Blog Post 03": "fa-solid fa-file-signature",
    "Blog Post 04": "fa-solid fa-file-signature",
    "Blog Post 05": "fa-solid fa-file-signature",
  };

  document.querySelectorAll(".eyebrow, .card-label, .post-meta").forEach((element) => {
    const label = getSemanticText(element);
    applyIconLabel(element, labelIcons[label] || null);
  });
};

const decorateCardHeadings = () => {
  const headingIcons = {
    "Managed hosting support": "fa-solid fa-server",
    "Product testing and usability": "fa-solid fa-flask",
    "Cross-functional perspective": "fa-solid fa-diagram-project",
    "Technical support": "fa-solid fa-life-ring",
    "Migrations and operations": "fa-solid fa-arrows-rotate",
    "Testing and QA": "fa-solid fa-bug",
    "Usability improvement": "fa-solid fa-hand-pointer",
    Documentation: "fa-solid fa-book",
    "Cross-disciplinary thinking": "fa-solid fa-layer-group",
    "Managed hosting and server control": "fa-solid fa-cloud-arrow-up",
    "Built for speed and operations": "fa-solid fa-gauge-high",
    "Why it matters in my role": "fa-solid fa-circle-info",
    "Graphic Design": "fa-solid fa-pen-ruler",
    "Software Development Internship": "fa-solid fa-code",
    "Senior Technical Support Engineering": "fa-solid fa-headset",
    "Clear communication": "fa-solid fa-comments",
    "Practical problem solving": "fa-solid fa-screwdriver-wrench",
    "Cross-functional awareness": "fa-solid fa-arrows-to-circle",
    "Support and troubleshooting": "fa-solid fa-screwdriver-wrench",
    "Testing and product quality": "fa-solid fa-shield-halved",
    "Professional opportunities": "fa-solid fa-briefcase",
    "Best ways to connect": "fa-solid fa-address-card",
    "DhakaMRTTime.com": "fa-solid fa-train-subway",
    GoldPriceBD: "fa-solid fa-coins",
    GoodPrice: "fa-solid fa-tag",
    ServerDiagnosis: "fa-solid fa-stethoscope",
  };

  document
    .querySelectorAll(".info-card h3, .timeline-item h3, .project-header h2, .contact-panel h2")
    .forEach((heading) => {
      const label = getSemanticText(heading);
      applyIconLabel(heading, headingIcons[label] || null);
    });
};

const decorateInterface = () => {
  ensureFontAwesome();
  decorateNav();
  decorateButtons();
  decorateContactLinks();
  decorateLabels();
  decorateCardHeadings();
};

const getHeaderControls = () => {
  const header = document.querySelector(".site-header");
  if (!header) {
    return null;
  }

  let controls = header.querySelector(".header-controls");
  if (!controls) {
    controls = document.createElement("div");
    controls.className = "header-controls";
    header.append(controls);
  }

  return controls;
};

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

const renderNavToggle = () => {
  const header = document.querySelector(".site-header");
  const controls = getHeaderControls();
  const nav = document.querySelector(".nav");
  if (!header || !nav || !controls) {
    return null;
  }

  const button = document.createElement("button");
  button.className = "nav-toggle";
  button.type = "button";
  button.innerHTML = menuIcon;
  button.setAttribute("aria-label", "Toggle navigation menu");
  button.setAttribute("title", "Toggle navigation menu");
  button.setAttribute("aria-expanded", "false");

  const syncMenuState = () => {
    const expanded = header.classList.contains("is-menu-open");
    button.setAttribute("aria-expanded", expanded ? "true" : "false");
  };

  button.addEventListener("click", () => {
    header.classList.toggle("is-menu-open");
    syncMenuState();
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (!mobileNavQuery.matches) {
        return;
      }

      header.classList.remove("is-menu-open");
      syncMenuState();
    });
  });

  controls.append(button);
  syncMenuState();
  return button;
};

const syncMobileNav = () => {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  if (!header || !navToggle) {
    return;
  }

  const shouldCompact = mobileNavQuery.matches && window.scrollY > 60;
  header.classList.toggle("is-compact", shouldCompact);

  if (!shouldCompact) {
    header.classList.remove("is-menu-open");
  }

  navToggle.hidden = !shouldCompact;
  navToggle.setAttribute("aria-hidden", shouldCompact ? "false" : "true");
  navToggle.setAttribute("aria-expanded", header.classList.contains("is-menu-open") ? "true" : "false");
};

applyTheme(getPreferredTheme());
renderNavToggle();
syncMobileNav();
decorateInterface();

mediaQuery.addEventListener("change", (event) => {
  if (getStoredTheme()) {
    return;
  }

  applyTheme(event.matches ? "dark" : "light");
});

mobileNavQuery.addEventListener("change", () => {
  syncMobileNav();
});

window.addEventListener("scroll", syncMobileNav, { passive: true });

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
