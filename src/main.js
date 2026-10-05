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
  const botManager = initBot();
  if (botManager) initRouter(botManager);
});
