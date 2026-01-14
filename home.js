// Home panel JavaScript (only the home-related code)
// - banner sizing
// - product boxes (hp-item) click / keyboard -> try to open product modal
// - footer carousel (5 images, rotate every 5s, loop)
// Safe: tries multiple ways to open a product modal (reuses existing store card click if present,
// calls global openSheet if defined, or dispatches a CustomEvent 'open-product' as a fallback).

(function () {
  // Configuration
  const FOOTER_SLIDES = ["slide1.jpg", "slide2.jpg", "slide3.jpg", "slide4.jpg", "slide5.jpg"];
  const FOOTER_INTERVAL_MS = 5000;
  const BANNER_HEIGHT_DESKTOP = 500;
  const BANNER_HEIGHT_MOBILE = 300;
  const MOBILE_BREAKPOINT = 900;

  // Utility: set banner height based on viewport width
  function adjustBannerHeight() {
    const bannerImg = document.querySelector(".home-banner-img");
    if (!bannerImg) return;
    const height = window.innerWidth >= MOBILE_BREAKPOINT ? BANNER_HEIGHT_DESKTOP : BANNER_HEIGHT_MOBILE;
    bannerImg.style.height = height + "px";
    bannerImg.style.objectFit = "cover";
  }

  // Try to open product modal by productId (best-effort)
  function openProductModal(productId) {
    if (!productId) return;

    // 1) If there's a store card with same data-product, click it to reuse existing handlers
    const storeCard = document.querySelector(`.item.product-open[data-product="${productId}"]`);
    if (storeCard) {
      // synthesize a trusted click as best as possible
      storeCard.click();
      return;
    }

    // 2) If a global function openSheet exists (from other script), call it
    if (typeof window.openSheet === "function") {
      try {
        window.openSheet(productId);
        return;
      } catch (err) {
        console.warn("openSheet failed:", err);
      }
    }

    // 3) Dispatch a custom event as fallback (other part of app can listen for 'open-product')
    const ev = new CustomEvent("open-product", { detail: { productId } });
    document.dispatchEvent(ev);
  }

  // Initialize product box interactions inside #home
  function initProductBoxes() {
    const homePanel = document.getElementById("home");
    if (!homePanel) return;

    // Click handler (delegation)
    homePanel.addEventListener("click", (e) => {
      const btn = e.target.closest(".hp-item, .hp-btn");
      if (!btn) return;

      // If clicked an hp-btn inside an hp-item, still open the product (use nearest hp-item)
      const item = btn.classList.contains("hp-item") ? btn : btn.closest(".hp-item");
      if (!item) return;

      const productId = item.dataset.product;
      if (!productId) return;

      // If button has data-action="learn" or "buy" you could handle differently:
      // For now both actions open modal (as requested)
      openProductModal(productId);
    });

    // Keyboard: Enter and Space to activate focused .hp-item
    homePanel.addEventListener("keydown", (e) => {
      const focused = document.activeElement;
      if (!focused) return;
      if (!focused.classList || !focused.classList.contains("hp-item")) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const productId = focused.dataset.product;
        if (productId) openProductModal(productId);
      }
    });

    // Make sure hp-item elements are keyboard-focusable (if not already)
    const items = homePanel.querySelectorAll(".hp-item");
    items.forEach((it) => {
      if (!it.hasAttribute("tabindex")) it.setAttribute("tabindex", "0");
      if (!it.hasAttribute("role")) it.setAttribute("role", "button");
    });
  }

  // Footer carousel: fade transition between images every X ms
  function initFooterCarousel() {
    const carouselImg = document.getElementById("carouselSlide");
    if (!carouselImg) return;
    let idx = 0;
    carouselImg.src = FOOTER_SLIDES.length ? FOOTER_SLIDES[0] : "";
    carouselImg.style.transition = "opacity 400ms ease";

    setInterval(() => {
      if (!FOOTER_SLIDES.length) return;
      idx = (idx + 1) % FOOTER_SLIDES.length;
      // fade out, switch src, fade in
      carouselImg.style.opacity = 0;
      setTimeout(() => {
        carouselImg.src = FOOTER_SLIDES[idx];
        carouselImg.style.opacity = 1;
      }, 320);
    }, FOOTER_INTERVAL_MS);
  }

  // Allow external code to programmatically open product modal via custom event listener
  // Example consumer can listen like: document.addEventListener('open-product', e => openSheet(e.detail.productId))
  // (This block only demonstrates the event; does not attach a global listener here.)
  function exposeForDebugging() {
    // Expose helper on window for debugging / integration if needed
    if (!window.__homePanel) {
      window.__homePanel = {
        openProductModal,
        adjustBannerHeight,
      };
    }
  }

  // Initialize everything when DOM is ready
  function init() {
    adjustBannerHeight();
    initProductBoxes();
    initFooterCarousel();
    exposeForDebugging();

    // adjust banner on resize
    window.addEventListener("resize", adjustBannerHeight);
  }

  // Run init on DOMContentLoaded (if already loaded, run immediately)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();













