(function () {
  var SETTINGS_KEY = "oleaTaxcoSettings";
  var LEGACY_THEME_KEY = "oleaTaxcoTheme";
  var root = document.documentElement;
  var openButtons = Array.prototype.slice.call(document.querySelectorAll("[data-settings-open]"));

  if (!openButtons.length) return;

  var defaults = {
    theme: "light",
    language: "en",
    transparency: 86,
    translucency: 16
  };

  function clamp(value, min, max) {
    var number = Number(value);
    if (!Number.isFinite(number)) return min;
    return Math.min(max, Math.max(min, number));
  }

  function getVersion() {
    var meta = document.querySelector('meta[name="site-version"]');
    return meta ? meta.getAttribute("content") || "v118.0" : "v118.0";
  }

  function loadSettings() {
    var saved = {};
    try {
      saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") || {};
      if (!saved.theme) {
        var legacyTheme = localStorage.getItem(LEGACY_THEME_KEY);
        if (legacyTheme === "dark" || legacyTheme === "light") saved.theme = legacyTheme;
      }
    } catch (error) {
      saved = {};
    }

    return {
      theme: saved.theme === "dark" || saved.theme === "light" ? saved.theme : defaults.theme,
      language: ["en", "fr", "es"].indexOf(saved.language) >= 0 ? saved.language : defaults.language,
      transparency: saved.transparency == null ? defaults.transparency : clamp(saved.transparency, 70, 96),
      translucency: saved.translucency == null ? defaults.translucency : clamp(saved.translucency, 8, 24)
    };
  }

  function saveSettings(settings) {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      localStorage.setItem(LEGACY_THEME_KEY, settings.theme);
    } catch (error) {
      return false;
    }
    return true;
  }

  var settings = loadSettings();
  var lastFocused = null;

  function createModal() {
    var modal = document.createElement("div");
    modal.className = "settings-backdrop";
    modal.setAttribute("data-settings-modal", "");
    modal.hidden = true;
    modal.innerHTML = [
      '<section class="settings-popover" role="dialog" aria-modal="true" aria-labelledby="settings-title">',
      '  <div class="settings-head">',
      '    <h2 class="settings-title" id="settings-title">Settings</h2>',
      '    <button type="button" class="settings-close" data-settings-close aria-label="Close settings">',
      '      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
      "    </button>",
      "  </div>",
      '  <div class="settings-stack">',
      '    <div class="settings-row">',
      '      <span class="settings-label">About</span>',
      '      <span class="settings-value" data-settings-version></span>',
      "    </div>",
      '    <label class="settings-field">',
      '      <span class="settings-label">Language</span>',
      '      <select class="settings-select" data-settings-language>',
      '        <option value="en">English</option>',
      '        <option value="fr">French</option>',
      '        <option value="es">Spanish</option>',
      "      </select>",
      "    </label>",
      '    <div class="settings-field">',
      '      <span class="settings-label">Theme</span>',
      '      <div class="settings-segmented" role="group" aria-label="Theme">',
      '        <button type="button" data-theme-choice="light">Day</button>',
      '        <button type="button" data-theme-choice="dark">Night</button>',
      "      </div>",
      "    </div>",
      '    <label class="settings-field">',
      '      <span class="settings-row"><span class="settings-label">Transparency</span><span class="settings-value" data-transparency-value></span></span>',
      '      <input class="settings-range" data-settings-transparency type="range" min="70" max="96" step="1" />',
      "    </label>",
      '    <label class="settings-field">',
      '      <span class="settings-row"><span class="settings-label">Translucency</span><span class="settings-value" data-translucency-value></span></span>',
      '      <input class="settings-range" data-settings-translucency type="range" min="8" max="24" step="1" />',
      "    </label>",
      "  </div>",
      "</section>"
    ].join("");
    document.body.appendChild(modal);
    return modal;
  }

  var modal = createModal();
  var versionNode = modal.querySelector("[data-settings-version]");
  var languageSelect = modal.querySelector("[data-settings-language]");
  var themeButtons = Array.prototype.slice.call(modal.querySelectorAll("[data-theme-choice]"));
  var transparencyInput = modal.querySelector("[data-settings-transparency]");
  var translucencyInput = modal.querySelector("[data-settings-translucency]");
  var transparencyValue = modal.querySelector("[data-transparency-value]");
  var translucencyValue = modal.querySelector("[data-translucency-value]");
  var closeButton = modal.querySelector("[data-settings-close]");

  function applySettings(shouldSave) {
    var alpha = clamp(settings.transparency, 70, 96);
    var blur = clamp(settings.translucency, 8, 24);
    var language = ["en", "fr", "es"].indexOf(settings.language) >= 0 ? settings.language : "en";
    var theme = settings.theme === "dark" ? "dark" : "light";

    settings.transparency = alpha;
    settings.translucency = blur;
    settings.language = language;
    settings.theme = theme;

    root.setAttribute("data-theme", theme);
    root.setAttribute("data-language", language);
    root.style.setProperty("--glass-alpha", alpha + "%");
    root.style.setProperty("--glass-alpha-soft", Math.max(62, alpha - 6) + "%");
    root.style.setProperty("--glass-blur", blur + "px");

    versionNode.textContent = getVersion();
    languageSelect.value = language;
    transparencyInput.value = String(alpha);
    translucencyInput.value = String(blur);
    transparencyValue.textContent = alpha + "%";
    translucencyValue.textContent = blur + "px";

    themeButtons.forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-theme-choice") === theme ? "true" : "false");
    });

    if (shouldSave) saveSettings(settings);
  }

  function getFocusable() {
    return Array.prototype.slice.call(modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
      .filter(function (item) {
        return !item.disabled && item.offsetParent !== null;
      });
  }

  function setExpanded(value) {
    openButtons.forEach(function (button) {
      button.setAttribute("aria-expanded", value ? "true" : "false");
    });
  }

  function openModal() {
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("settings-open");
    setExpanded(true);
    applySettings(false);
    closeButton.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("settings-open");
    setExpanded(false);
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  openButtons.forEach(function (button) {
    button.addEventListener("click", openModal);
  });

  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", function (event) {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", function (event) {
    if (modal.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
      return;
    }
    if (event.key !== "Tab") return;

    var focusable = getFocusable();
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  themeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      settings.theme = button.getAttribute("data-theme-choice") === "dark" ? "dark" : "light";
      applySettings(true);
    });
  });

  languageSelect.addEventListener("change", function () {
    settings.language = languageSelect.value;
    applySettings(true);
  });

  transparencyInput.addEventListener("input", function () {
    settings.transparency = transparencyInput.value;
    applySettings(true);
  });

  translucencyInput.addEventListener("input", function () {
    settings.translucency = translucencyInput.value;
    applySettings(true);
  });

  function initReveals() {
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var revealNodes = Array.prototype.slice.call(document.querySelectorAll(".hero-copy, .hero-support, .hero-quote-block, .section.panel, .card, .channel-card"));
    var serviceCards = Array.prototype.slice.call(document.querySelectorAll("#services .service-card"));

    serviceCards.forEach(function (card, index) {
      card.setAttribute("data-card-number", String(index + 1).padStart(2, "0"));
    });

    Array.prototype.slice.call(document.querySelectorAll(".cards, .channel-list")).forEach(function (group) {
      Array.prototype.slice.call(group.querySelectorAll(".card, .channel-card")).forEach(function (item, index) {
        item.style.setProperty("--reveal-delay", Math.min(index * 80, 240) + "ms");
      });
    });

    revealNodes.forEach(function (node) {
      node.setAttribute("data-reveal", "");
      if (reduceMotion) node.classList.add("is-visible");
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealNodes.forEach(function (node) {
        node.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });

    revealNodes.forEach(function (node) {
      observer.observe(node);
    });
  }

  function initStickyCta() {
    var sticky = document.querySelector("[data-mobile-sticky-cta]");
    var hero = document.querySelector(".hero");
    if (!sticky || !hero) return;

    var mobileQuery = window.matchMedia("(max-width: 760px)");

    function updateSticky() {
      var heroBottom = hero.offsetTop + hero.offsetHeight;
      var shouldShow = mobileQuery.matches && window.scrollY > heroBottom - 80;
      document.body.classList.toggle("show-sticky-cta", shouldShow);
    }

    updateSticky();
    window.addEventListener("scroll", updateSticky, { passive: true });
    window.addEventListener("resize", updateSticky);
    if (mobileQuery.addEventListener) mobileQuery.addEventListener("change", updateSticky);
  }

  applySettings(false);
  initReveals();
  initStickyCta();
})();
