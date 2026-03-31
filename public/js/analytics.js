/**
 * Google Analytics 4 (GA4) – VeIQ landing
 * VEIQ AI stream – Measurement ID from analytics.google.com
 */
(function () {
  var GA_MEASUREMENT_ID = "G-HVJ4NZCDS4";

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);

  /**
   * Track a custom event. Safe to call even if gtag is blocked (e.g. ad-blocker).
   * @param {string} category - e.g. "CTA", "engagement", "conversion"
   * @param {string} action - e.g. "click", "submit"
   * @param {string} [label] - e.g. "request_demo", "login"
   * @param {number} [value] - optional numeric value
   */
  window.trackEvent = function (category, action, label, value) {
    if (typeof gtag !== "function") return;
    var params = {
      event_category: category,
      event_action: action,
    };
    if (label) params.event_label = label;
    if (value != null) params.value = value;
    gtag("event", action, params);
  };
})();
