"use strict";
(() => {
  const key = "wnb_language_v1";
  const saved = () => { try { return localStorage.getItem(key); } catch { return null; } };
  const store = language => { try { localStorage.setItem(key, language); } catch {} };
  const page = document.body;
  const language = document.documentElement.lang === "id" ? "id" : "en";
  const isRootLanding = page.hasAttribute("data-language-welcome");
  const legalFile = /(?:\/|^)(privacy|terms)\.html$/.exec(window.location.pathname)?.[1] || "";

  document.querySelectorAll(".language-switch a, [data-select-language]").forEach(link => {
    const next = link.getAttribute("hreflang") || link.getAttribute("data-select-language");
    if (next !== "en" && next !== "id") return;
    if (legalFile) link.href = link.href.replace(/\/(?:en|id)\/?$/, `/${next}/${legalFile}.html`);
    link.addEventListener("click", () => {
      store(next);
      if (!legalFile && window.location.hash) {
        const url = new URL(link.href);
        url.hash = window.location.hash;
        link.href = url.href;
      }
    });
  });

  if (isRootLanding) {
    const choice = saved();
    if (choice === "en" || choice === "id") {
      window.location.replace(`${choice}/${window.location.hash || ""}`);
      return;
    }
    const dialog = document.getElementById("languageWelcome");
    const english = () => {
      store("en");
      dialog.close();
      window.location.assign(`en/${window.location.hash || ""}`);
    };
    document.getElementById("languageDismiss")?.addEventListener("click", english);
    dialog.addEventListener("cancel", event => { event.preventDefault(); english(); });
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }
})();
