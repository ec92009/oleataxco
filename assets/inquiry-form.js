(function () {
  var inquiry = document.querySelector("[data-inquiry-form]");
  if (!inquiry) return;

  var submitButton = inquiry.querySelector("[data-inquiry-submit]");
  var status = inquiry.querySelector("[data-inquiry-status]");
  var recipient = "hello@oleataxco.com";
  var fieldNames = ["name", "email", "service", "entity", "taxYear", "timing", "summary"];

  if (!submitButton) return;

  function clean(value) {
    return String(value || "").trim();
  }

  function getField(name) {
    return inquiry.querySelector('[name="' + name + '"]');
  }

  function validateFields() {
    for (var index = 0; index < fieldNames.length; index += 1) {
      var field = getField(fieldNames[index]);
      if (field && !field.checkValidity()) {
        field.reportValidity();
        return false;
      }
    }
    return true;
  }

  submitButton.addEventListener("click", function () {
    if (!validateFields()) return;

    var name = clean(getField("name").value);
    var email = clean(getField("email").value);
    var service = clean(getField("service").value);
    var entity = clean(getField("entity").value) || "Not provided";
    var taxYear = clean(getField("taxYear").value) || "Not provided";
    var timing = clean(getField("timing").value) || "Not provided";
    var summary = clean(getField("summary").value);
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

    var emailLink = document.createElement("a");
    emailLink.href = "mailto:" + recipient + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    emailLink.click();
  });
})();
