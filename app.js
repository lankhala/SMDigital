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

      // ✅ Save last panel + scroll position
      localStorage.setItem("lastPanel", panelId);
      localStorage.setItem("lastScroll", window.scrollY);
    }, 150);
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => showPanel(btn.dataset.panel));
  });

  // ✅ Restore last panel + scroll position
  const lastPanel = localStorage.getItem("lastPanel");
  const lastScroll = localStorage.getItem("lastScroll");

  if (lastPanel) {
    showPanel(lastPanel);
    if (lastScroll) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(lastScroll, 10));
      }, 200);
    }
  } else {
    showPanel("store");
  }

  // ==========================
  // AUTO MODE BASED ON TIME
  // ==========================
  const now = new Date();
  const hour = now.getHours();

  // Example logic: 6am–18pm = light, otherwise dark
  if (hour >= 6 && hour < 18) {
    document.body.classList.remove("dark"); // daytime → light mode
  } else {
    document.body.classList.add("dark");    // nighttime → dark mode
  }

  // ==========================
  // TAB3: Random Banner
  // ==========================
  const bannerImg = document.getElementById("randomBanner");
  if (bannerImg) {
    const bannerList = ["banner1.jpg", "banner2.jpg", "banner3.jpg"];
    const randomIndex = Math.floor(Math.random() * bannerList.length);
    bannerImg.src = bannerList[randomIndex];
  }
});





