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







document.addEventListener("DOMContentLoaded", () => {
  // Banner auto-slide infinite forward
  const track = document.querySelector("#service .banner-track");
  const banners = document.querySelectorAll("#service .banner-track img");
  let index = 0;
  const total = banners.length;

  function showBanner(i) {
    track.style.transform = `translateX(-${i * 100}%)`;
  }

  setInterval(() => {
    index++;
    showBanner(index);

    // ✅ when reaching the last clone, reset to original without flashing
    if (index >= total - 3) {
      setTimeout(() => {
        track.style.transition = "none"; // disable animation
        index = 0;
        showBanner(index);
        // re-enable animation
        setTimeout(() => {
          track.style.transition = "transform 0.6s ease";
        }, 50);
      }, 600);
    }
  }, 5000);

  // ✅ allow manual swipe on touch devices
  let startX = 0;
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });
  track.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    if (endX < startX - 50) {
      index = (index + 1) % total;
    } else if (endX > startX + 50) {
      index = (index - 1 + total) % total;
    }
    showBanner(index);
  });
});

