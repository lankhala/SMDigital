document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".tool-btn");
  const panels = document.querySelectorAll(".panel");
  const overlay = document.getElementById("overlay");

  function showPanel(panelId) {
    // បង្ហាញ overlay
    overlay.classList.add("active");

    // បន្ទាប់ពី overlay fade-in (500ms) → ប្តូរផ្ទាំង
    setTimeout(() => {
      panels.forEach((panel) => {
        panel.classList.toggle("active", panel.id === panelId);
      });

      buttons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.panel === panelId);
      });

      // fade-out overlay
      overlay.classList.remove("active");
    }, 200);
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      showPanel(btn.dataset.panel);
    });
  });

  // Default: show Home
  showPanel("home");
});


//មិនអាចទាញយកបាន
// JS: បិទ drag & drop រូបភាព
document.addEventListener("dragstart", function (e) {
  e.preventDefault();
});

// JS: បិទ right-click លើរូបភាព
document.querySelectorAll("img").forEach(img => {
  img.addEventListener("contextmenu", e => e.preventDefault());
});
// JS: បិទ context menu (Right-click)
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});








// Smooth scroll to target panel
document.querySelectorAll(".scroll-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.target;
    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
      targetPanel.scrollIntoView({ behavior: "smooth" });
    }
  });
});