document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // PANEL SWITCHING (Store / Home / Service)
  // =========================
  const buttons = document.querySelectorAll(".tool-btn");
  const panels = document.querySelectorAll(".panel");
  const panelOverlay = document.getElementById("panelOverlay");

  function showPanel(panelId) {
    if (panelOverlay) panelOverlay.classList.add("active");

    setTimeout(() => {
      panels.forEach((panel) => {
        panel.classList.toggle("active", panel.id === panelId);
      });

      buttons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.panel === panelId);
      });

      if (panelOverlay) panelOverlay.classList.remove("active");
    }, 150); // delay for overlay fade-in/out
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => showPanel(btn.dataset.panel));
  });

  // ✅ Default: show Store first
  showPanel("store");

  // =========================
  // Smooth scroll
  // =========================
  document.querySelectorAll(".scroll-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ==========================
  // DARK / LIGHT MODE TOGGLE (with PNG icons + smooth transition)
  // ==========================
  const toggleMode = document.getElementById("toggleMode");

  // Add smooth transition for background and color
  document.body.style.transition = "background-color 0.4s ease, color 0.4s ease";

  // Load saved mode
  if (localStorage.getItem("mode") === "dark") {
    document.body.classList.add("dark");
    if (toggleMode) toggleMode.src = "lightmode.png"; // show light icon when dark mode is active
  } else {
    if (toggleMode) toggleMode.src = "darkmode.png"; // show dark icon when light mode is active
  }

  if (toggleMode) {
    toggleMode.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("mode", isDark ? "dark" : "light");
      toggleMode.src = isDark ? "lightmode.png" : "darkmode.png";
    });
  }
});
