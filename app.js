document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // PANEL SWITCHING (Home / Store / Service)
  // =========================
  const buttons = document.querySelectorAll(".tool-btn");
  const panels = document.querySelectorAll(".panel");
  const panelOverlay = document.getElementById("panelOverlay"); // ✅ rename

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
  }, 150); // ✅ delay 300ms ដើម្បីឲ្យ overlay fade-in/out មើលបាន
}

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => showPanel(btn.dataset.panel));
  });

  // Default: show Home
  showPanel("home");

  // =========================
  // DETERRent
  // =========================
  document.addEventListener("dragstart", (e) => e.preventDefault());
  document.addEventListener("contextmenu", (e) => e.preventDefault());
  document.querySelectorAll("img, video").forEach((el) => {
    el.addEventListener("contextmenu", (e) => e.preventDefault());
  });

  document.addEventListener("keydown", (e) => {
    const k = (e.key || "").toLowerCase();
    if ((e.ctrlKey || e.metaKey) && (k === "s" || k === "u" || k === "p")) {
      e.preventDefault();
      return;
    }
    if (e.key === "F12") {
      e.preventDefault();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (k === "i" || k === "j" || k === "c")) {
      e.preventDefault();
      return;
    }
  });

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
  // SLIDE MENU LOGIC
  // ==========================
  const menuBtn = document.getElementById("menuBtn");
  const sideMenu = document.getElementById("sideMenu");
  const menuOverlay = document.getElementById("menuOverlay");

  function toggleMenu() {
    sideMenu.classList.toggle("active");
    menuOverlay.classList.toggle("active");
  }

  menuBtn.addEventListener("click", toggleMenu);
  menuOverlay.addEventListener("click", toggleMenu);

  // ==========================
  // DARK / LIGHT MODE
  // ==========================
  const toggleMode = document.getElementById("toggleMode");

  if (localStorage.getItem("mode") === "dark") {
    document.body.classList.add("dark");
  }

  toggleMode.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "mode",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  });
});
