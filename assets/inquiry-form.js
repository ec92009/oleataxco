(function () {
  var form = document.querySelector("[data-inquiry-form]");
  if (!form) return;

  var status = form.querySelector("[data-inquiry-status]");
  var recipient = "hello@oleataxco.com";

  function clean(value) {
    return String(value || "").trim();
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var fields = new FormData(form);
    var name = clean(fields.get("name"));
    var email = clean(fields.get("email"));
    var service = clean(fields.get("service"));
    var entity = clean(fields.get("entity")) || "Not provided";
    var taxYear = clean(fields.get("taxYear")) || "Not provided";
    var timing = clean(fields.get("timing")) || "Not provided";
    var summary = clean(fields.get("summary"));
    var subject = "Olea Tax Co. inquiry - " + service;
    var body = [
      "Hello Kelly,",
      "",
      "I would like to inquire about Olea Tax Co. services.",
      "",
      "Name: " + name,
      "Email: " + email,
      "Service needed: " + service,
      "Entity or filing situation: " + entity,
      "Tax year: " + taxYear,
      "Timing: " + timing,
      "",
      "Main question or concern:",
      summary,
      "",
      "I have not included tax documents or sensitive financial information in this message."
    ].join("\n");

    if (status) {
      var language = document.documentElement.getAttribute("data-language") || "en";
      var i18n = window.OLEA_SITE_I18N || {};
      var translations = i18n.translations || {};
      status.textContent = (translations[language] && translations[language].formOpeningStatus) ||
        (translations.en && translations.en.formOpeningStatus) ||
        "Opening your email app. Review the message before sending.";
    }

    window.location.href = "mailto:" + recipient + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  });
})();
