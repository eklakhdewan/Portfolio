document.documentElement.classList.add("js-enabled");

import { initRouter } from "./router.js";
import { initBot } from "./bot.js";

function initEvidenceLightbox() {
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-lightbox-src]");
    if (trigger) {
      const dialog = document.getElementById("evidence-lightbox");
      const image = document.getElementById("evidence-lightbox-image");
      const caption = document.getElementById("evidence-lightbox-caption");
      if (!dialog || !image) return;
      image.src = trigger.dataset.lightboxSrc;
      image.alt = trigger.dataset.lightboxAlt || "Project evidence";
      if (caption) caption.textContent = trigger.dataset.lightboxAlt || "";
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
      return;
    }

    if (event.target.closest("[data-lightbox-close]")) {
      const dialog = event.target.closest("dialog");
      if (dialog?.open) dialog.close();
    }
  });

  document.addEventListener("click", (event) => {
    const dialog = event.target.closest("dialog.evidence-lightbox");
    if (dialog && event.target === dialog) dialog.close();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initEvidenceLightbox();
  // Keep Haya outside the router-managed main element so route renders cannot remove the launcher.
  const botWidget = document.getElementById("bot-widget");
  if (botWidget && botWidget.parentElement !== document.body) document.body.appendChild(botWidget);
  const botImage = document.getElementById("haya-avatar-image");
  if (botImage) botImage.addEventListener("error", () => {
    const toggle = document.getElementById("bot-toggle");
    if (toggle) toggle.classList.add("haya-avatar-fallback");
  }, { once: true });
  const botManager = initBot();
  if (botManager) initRouter(botManager);
});
