(function () {
  var SETTINGS_KEY = "oleaTaxcoSettings";
  var LEGACY_THEME_KEY = "oleaTaxcoTheme";
  var root = document.documentElement;
  var openButtons = Array.prototype.slice.call(document.querySelectorAll("[data-settings-open]"));

  if (!openButtons.length) return;

  var defaults = {
    theme: "light",
    language: "en",
    transparency: 14,
    translucency: 16
  };

  var i18n = window.OLEA_SITE_I18N || {};
  var supportedLanguages = i18n.supportedLanguages || ["en"];
  var languageCodes = i18n.languageCodes || { en: "en" };
  var translations = i18n.translations || { en: {} };

  function clamp(value, min, max) {
    var number = Number(value);
    if (!Number.isFinite(number)) return min;
    return Math.min(max, Math.max(min, number));
  }

  function normalizeLanguage(language) {
    return supportedLanguages.indexOf(language) >= 0 ? language : defaults.language;
  }

  function normalizeTransparency(value) {
    var number = Number(value);
    if (!Number.isFinite(number)) return defaults.transparency;
    if (number > 60) number = 100 - number;
    return clamp(number, 4, 30);
  }

  function translate(key, language) {
    var normalized = normalizeLanguage(language);
    return (translations[normalized] && translations[normalized][key]) || translations.en[key] || "";
  }

  function setMeta(name, value) {
    var node = document.querySelector('meta[name="' + name + '"]');
    if (node) node.setAttribute("content", value);
  }

  function setPropertyMeta(property, value) {
    var node = document.querySelector('meta[property="' + property + '"]');
    if (node) node.setAttribute("content", value);
  }

  function setGlassVariable(name, value) {
    root.style.setProperty(name, value);
    if (document.body) document.body.style.setProperty(name, value);
  }

  function getVersion() {
    var meta = document.querySelector('meta[name="site-version"]');
    return meta ? meta.getAttribute("content") || "v144.3" : "v144.3";
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
      language: normalizeLanguage(saved.language),
      transparency: saved.transparency == null ? defaults.transparency : normalizeTransparency(saved.transparency),
      translucency: saved.translucency == null ? defaults.translucency : clamp(saved.translucency, 6, 28)
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
      '    <h2 class="settings-title" id="settings-title" data-i18n="settingsTitle">Settings</h2>',
      '    <button type="button" class="settings-close" data-settings-close aria-label="Close settings" data-i18n-attr="aria-label:settingsClose">',
      '      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
      "    </button>",
      "  </div>",
      '  <div class="settings-stack">',
      '    <div class="settings-row">',
      '      <span class="settings-label" data-i18n="settingsAbout">About</span>',
      '      <span class="settings-value" data-settings-version></span>',
      "    </div>",
      '    <label class="settings-field">',
      '      <span class="settings-label" data-i18n="settingsLanguage">Language</span>',
      '      <select class="settings-select" data-settings-language>',
      '        <option value="en" data-i18n="languageEnglish">English</option>',
      '        <option value="fr" data-i18n="languageFrench">French</option>',
      '        <option value="es" data-i18n="languageSpanish">Spanish</option>',
      "      </select>",
      "    </label>",
      '    <div class="settings-field">',
      '      <span class="settings-label" data-i18n="settingsTheme">Theme</span>',
      '      <div class="settings-segmented" role="group" aria-label="Theme" data-i18n-attr="aria-label:themeGroup">',
      '        <button type="button" data-theme-choice="light" data-i18n="themeDay">Day</button>',
      '        <button type="button" data-theme-choice="dark" data-i18n="themeNight">Night</button>',
      "      </div>",
      "    </div>",
      '    <label class="settings-field">',
      '      <span class="settings-row"><span class="settings-label" data-i18n="settingsTransparency">Transparency</span><span class="settings-value" data-transparency-value></span></span>',
      '      <input class="settings-range" data-settings-transparency type="range" min="4" max="30" step="1" />',
      "    </label>",
      '    <label class="settings-field">',
      '      <span class="settings-row"><span class="settings-label" data-i18n="settingsTranslucency">Translucency</span><span class="settings-value" data-translucency-value></span></span>',
      '      <input class="settings-range" data-settings-translucency type="range" min="6" max="28" step="1" />',
      "    </label>",
      "  </div>",
      "</section>"
    ].join("");
    document.body.appendChild(modal);
    return modal;
  }

  var modal = createModal();
  var versionNode = modal.querySelector("[data-settings-version]");
  var visibleVersionNodes = Array.prototype.slice.call(document.querySelectorAll("[data-visible-version]"));
  var languageSelect = modal.querySelector("[data-settings-language]");
  var themeButtons = Array.prototype.slice.call(modal.querySelectorAll("[data-theme-choice]"));
  var transparencyInput = modal.querySelector("[data-settings-transparency]");
  var translucencyInput = modal.querySelector("[data-settings-translucency]");
  var transparencyValue = modal.querySelector("[data-transparency-value]");
  var translucencyValue = modal.querySelector("[data-translucency-value]");
  var closeButton = modal.querySelector("[data-settings-close]");

  function applyTranslations(language) {
    var normalized = normalizeLanguage(language);

    root.setAttribute("lang", languageCodes[normalized] || normalized);
    document.title = translate("pageTitle", normalized);
    setMeta("description", translate("metaDescription", normalized));
    setMeta("twitter:title", translate("pageTitle", normalized));
    setMeta("twitter:description", translate("metaSocialDescription", normalized));
    setPropertyMeta("og:title", translate("pageTitle", normalized));
    setPropertyMeta("og:description", translate("metaSocialDescription", normalized));

    Array.prototype.slice.call(document.querySelectorAll("[data-i18n]")).forEach(function (node) {
      var value = translate(node.getAttribute("data-i18n"), normalized);
      if (value) node.textContent = value;
    });

    Array.prototype.slice.call(document.querySelectorAll("[data-i18n-html]")).forEach(function (node) {
      var value = translate(node.getAttribute("data-i18n-html"), normalized);
      if (value) node.innerHTML = value;
    });

    Array.prototype.slice.call(document.querySelectorAll("[data-i18n-attr]")).forEach(function (node) {
      node.getAttribute("data-i18n-attr").split(/[;,]/).forEach(function (pair) {
        var parts = pair.split(":");
        if (parts.length !== 2) return;
        var attr = parts[0].trim();
        var key = parts[1].trim();
        var value = translate(key, normalized);
        if (attr && value) node.setAttribute(attr, value);
      });
    });
  }

  function applySettings(shouldSave) {
    var transparency = normalizeTransparency(settings.transparency);
    var alpha = 100 - transparency;
    var blur = clamp(settings.translucency, 6, 28);
    var language = normalizeLanguage(settings.language);
    var theme = settings.theme === "dark" ? "dark" : "light";

    settings.transparency = transparency;
    settings.translucency = blur;
    settings.language = language;
    settings.theme = theme;

    root.setAttribute("data-theme", theme);
    root.setAttribute("data-language", language);
    setGlassVariable("--glass-alpha", alpha + "%");
    setGlassVariable("--glass-alpha-soft", Math.max(58, alpha - 8) + "%");
    setGlassVariable("--glass-control-alpha", Math.max(54, alpha - 10) + "%");
    setGlassVariable("--glass-popover-alpha", Math.min(96, alpha + 4) + "%");
    setGlassVariable("--glass-accent-alpha", Math.max(62, alpha - 2) + "%");
    setGlassVariable("--glass-sheen-opacity", Math.max(0.38, (80 - transparency) / 100));
    setGlassVariable("--glass-blur", blur + "px");

    applyTranslations(language);

    versionNode.textContent = getVersion();
    visibleVersionNodes.forEach(function (node) {
      node.textContent = getVersion();
    });
    languageSelect.value = language;
    transparencyInput.value = String(transparency);
    translucencyInput.value = String(blur);
    transparencyValue.textContent = translate("transparencyValue", language).replace("{value}", transparency);
    translucencyValue.textContent = translate("translucencyValue", language).replace("{value}", blur);
    transparencyInput.setAttribute("aria-valuetext", transparencyValue.textContent);
    translucencyInput.setAttribute("aria-valuetext", translucencyValue.textContent);

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
