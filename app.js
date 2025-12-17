document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // PANEL SWITCHING (Home / Store / Service)
  // =========================
  const buttons = document.querySelectorAll(".tool-btn");
  const panels = document.querySelectorAll(".panel");
  const overlay = document.getElementById("overlay");

  function showPanel(panelId) {
    if (overlay) overlay.classList.add("active");

    setTimeout(() => {
      panels.forEach((panel) => {
        panel.classList.toggle("active", panel.id === panelId);
      });

      buttons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.panel === panelId);
      });

      if (overlay) overlay.classList.remove("active");
    }, 200);
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => showPanel(btn.dataset.panel));
  });

  // Default: show Home
  showPanel("home");

  // =========================
  // DETERRент: reduce easy download/save options
  // (Cannot block 100% on browser, but make it harder)
  // =========================

  // Block drag & drop (images/videos)
  document.addEventListener("dragstart", (e) => e.preventDefault());

  // Block right-click (global)
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  // Block right-click specifically on images/videos (extra)
  document.querySelectorAll("img, video").forEach((el) => {
    el.addEventListener("contextmenu", (e) => e.preventDefault());
  });

  // Block common save/view-source/devtools shortcuts (deterrent only)
  document.addEventListener("keydown", (e) => {
    const k = (e.key || "").toLowerCase();

    // Ctrl/Cmd + S/U/P
    if ((e.ctrlKey || e.metaKey) && (k === "s" || k === "u" || k === "p")) {
      e.preventDefault();
      return;
    }

    // F12
    if (e.key === "F12") {
      e.preventDefault();
      return;
    }

    // Ctrl/Cmd + Shift + I/J/C
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (k === "i" || k === "j" || k === "c")) {
      e.preventDefault();
      return;
    }
  });

  // =========================
  // Smooth scroll (if you use .scroll-btn anywhere)
  // =========================
  document.querySelectorAll(".scroll-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.scrollIntoView({ behavior: "smooth" });
    });
  });
});