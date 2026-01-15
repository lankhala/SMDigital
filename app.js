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
    }, 0);
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
      }, 100);
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
  // if (hour >= 6 && hour < 18) {
  //   document.body.classList.remove("dark"); // daytime → light mode
  // } else {
  //   document.body.classList.add("dark");    // nighttime → dark mode
  // }

  // ==========================
  // TAB3: Random Banner
  // ==========================
  const bannerImg = document.getElementById("randomBanner");
  if (bannerImg) {
    const bannerList = ["banner1.jpg", "banner2.jpg", "banner3.jpg"];
    const randomIndex = Math.floor(Math.random() * bannerList.length);
    bannerImg.src = bannerList[randomIndex];
  }

  // ==========================
  // HOME: hero + image upload (PNG with transparent background)
  // ==========================
  function initHomeHero() {
    const uploadInput = document.getElementById("homeUpload");
    const bgPicker = document.getElementById("homeBgPicker");
    const thumbs = document.getElementById("homeThumbs");
    const heroPreview = document.getElementById("heroPreview");
    const heroImage = document.getElementById("heroImage");
    const heroFileName = document.getElementById("heroFileName");

    if (!uploadInput || !thumbs || !heroPreview || !heroImage) return;

    // Set initial background color
    if (bgPicker) {
      heroPreview.style.backgroundColor = bgPicker.value || "#f5f5f7";
      bgPicker.addEventListener("input", (e) => {
        heroPreview.style.backgroundColor = e.target.value;
      });
    }

    // Helper: set hero image from URL and update caption
    function setHero(url, name) {
      heroImage.src = url || "";
      heroFileName.textContent = name || "(មិនទាន់ជ្រើសរើស)";
    }

    // Handle selected files (multiple)
    uploadInput.addEventListener("change", (e) => {
      const files = Array.from(e.target.files || []);
      thumbs.innerHTML = "";

      if (!files.length) {
        setHero("", "");
        return;
      }

      files.forEach((file, idx) => {
        // Accept only PNG for transparent backgrounds as requested
        if (!file.type || !file.type.includes("png")) {
          const warn = document.createElement("div");
          warn.className = "thumb warn";
          warn.textContent = `Skipped non-PNG: ${file.name}`;
          thumbs.appendChild(warn);
          return;
        }

        const url = URL.createObjectURL(file);
        const t = document.createElement("button");
        t.type = "button";
        t.className = "thumb";
        t.setAttribute("aria-label", file.name);

        const img = document.createElement("img");
        img.src = url;
        img.alt = file.name;

        t.appendChild(img);
        thumbs.appendChild(t);

        // Click thumbnail to set hero
        t.addEventListener("click", () => {
          setHero(url, file.name);
        });

        // Auto-select first image
        if (idx === 0) {
          setHero(url, file.name);
        }

        // Revoke object URL when image is unloaded (cleanup)
        img.addEventListener("load", () => {
          // keep URL until user navigates away; optionally revoke later
        });
      });
    });

    // If someone clicks a thumbnail that was created earlier (future-proof)
    thumbs.addEventListener("click", (e) => {
      const btn = e.target.closest(".thumb");
      if (!btn) return;
      const img = btn.querySelector("img");
      if (img) {
        setHero(img.src, img.alt || "");
      }
    });
  }

  // Initialize home hero right away (panel may be hidden initially)
  initHomeHero();

  // ==========================
  // PRODUCT SHEET (Same layout, different data)
  // ==========================
  const PRODUCTS = {
    "capcut_pro": {
      "name_km": "CapCut Pro",
      "price": "$5.00",
      "access": "1 ឧបករណ៍",
      "connect": "5-10 នាទី+",
      "plan": "1 ខែ",
      "warranty": "មួយខែពេញ",
      "type": "គណនីផ្តល់ជូន",
      "cover": "p9.jpg",
      "benefits": [
        "Template និង Effect ពិសេស (Pro)",
        "Export វីដេអូគ្មាន Watermark",
        "គាំទ្រ 4K / HD Quality",
        "Transition ស្អាត និង Smooth"
      ],
    },
    "adobe_creative": {
      "name_km": "Adobe Creative",
      "price": "$11.00",
      "access": "2 Devices",
      "connect": "10-20 នាទី+",
      "plan": "4 ខែ",
      "warranty": "2 សប្តាហ៍",
      "type": "គណនីផ្ទាល់ខ្លួន",
      "cover": "p7.jpg",
      "benefits": [
        "Photoshop រួមទាំងកម្មវិធីចាំបាច់សម្រាប់ Designer 20+",
        "Ai Credit រួមទាំង Adobe Fonts និង Stock",
        "Cloud Storage 100GB",
        "ដំណើការរហូតដល់២កុំព្យូទ័រ ក្នុងពេលតែមួយ"
      ],
    },
    "canva_pro": {
      "name_km": "Canva Pro",
      "price": "$5.00",
      "access": "5 Devices",
      "connect": "1 នាទី+",
      "plan": "1 ឆ្នាំ",
      "warranty": "1 ខែ",
      "type": "គណនីផ្ទាល់ខ្លួន  ",
      "cover": "p1.jpg",
      "benefits": [
        "Canva Pro Gmail ផ្ទាល់ខ្លួន",
        "ទាំងមុខងារ Education Plan",
        "ប្រើក្នុង Pro Affinity Plan",
        "៥ឧបករណ៍ក្នុងពេលតែមួយ",
        "ប្រើពុម្ពអក្សរខ្មែរច្រើនជាង 500+",
        "គម្រូមកស្រាប់រាប់លាន។"
      ],
    },
    "chatgpt_plus": {
      "name_km": "ChatGPT Plus",
      "price": "$4.99",
      "access": "1 Device",
      "connect": "5-10 នាទី+",
      "plan": "1 ខែ",
      "warranty": "7 ថ្ងៃ",
      "type": "គណនីផ្តល់ជូន",
      "cover": "p2.jpg",
      "benefits": [
        "គណនីផ្តល់ជូន ប្រើមួយឧបករណ៍",
        "អាចប្រើមុខងារទាំងអស់ក្នុង Plus",
        "Ai GPTs គ្រប់ Model",
        "GPT-5 (thinking, fast, auto)",
        "ល្បឿនធ្វើការលឿនជាងធម្មតា x3ដង",
        "ប្រើលើទូរស័ព្ទ ឬកុំព្យូទ័រ(ជាជម្រើស)"
      ],
    },
    "windows_11_pro": {
      "name_km": "Windows 11 Pro",
      "price": "$5.00",
      "access": "1 PC",
      "connect": "10-20 នាទី+",
      "plan": "Lifetime",
      "warranty": "1 ខែ",
      "type": "License Key",
      "cover": "p3.jpg",
      "benefits": [
        "Activate Windows 11 Pro ស្របច្បាប់",
        "ប្រើ Pro Features ពេញលេញ",
        "Support បើមានបញ្ហា activate"
      ],
    },
    "netflix_premium": {
      "name_km": "Netflix Premium",
      "price": "$3.00",
      "access": "1 Profile",
      "connect": "5-10 នាទី+",
      "plan": "Monthly",
      "warranty": "1 ខែ",
      "type": "គណនីផ្តល់ជូន",
      "cover": "p5.jpg",
      "benefits": [
        "មើល Movies/Series គុណភាព HD/4K",
        "ប្រើបានលើទូរស័ព្ទ/TV/PC",
        "Support តាម Telegram"
      ],
    },
    "google_drive_2tb": {
      "name_km": "Gemini Ai +2TB",
      "price": "$9.00",
      "access": "3 Devices",
      "connect": "60 នាទី+",
      "plan": "1 ឆ្នាំ",
      "warranty": "90 ថ្ងៃ",
      "type": "គណនីផ្ទាល់ខ្លួន",
      "cover": "p4.jpg",
      "benefits": [
        "Storage 2TB សម្រាប់ Backup ឯកសារ",
        "ប្រើលើគណនី Gmail ផ្ទាល់ខ្លួន",
        "គាំទ្រ Google Photos និង Google Docs",
        "Ai ជំនាន់ថ្មីលំដាប់កំពូលរបស់ Google"
      ],
    },
    "youtube_premium": {
      "name_km": "YouTube Premium",
      "price": "$20.00",
      "access": "1 Device",
      "connect": "5-10 នាទី+",
      "plan": "1 ឆ្នាំ",
      "warranty": "1 ឆ្នាំ",
      "type": "គណនីផ្តល់ជូន",
      "cover": "p6.jpg",
      "benefits": [
        "មើលគ្មាន Ads",
        "Background Play និង Download",
        "YouTube Music Premium"
      ],
    },
    "microsoft_office": {
      "name_km": "Microsoft Office 365",
      "price": "$20.00",
      "access": "1 Account",
      "connect": "10-20 នាទី+",
      "plan": "1 ឆ្នាំ",
      "warranty": "1 ឆ្នាំ",
      "type": "Offcial Account",
      "cover": "p8.jpg",
      "benefits": [
        "Word / Excel / PowerPoint",
        "សម្រាប់ការងារក្រុមហ៊ុន និងសាលា",
      ],
    }
  };

  const productModal = document.getElementById("productModal");
  const pmContent = document.getElementById("pmContent");
  const storeBox = document.querySelector("#store .box");
  const headerEl = document.querySelector("header");

  function setHeaderH(){
    const h = headerEl ? headerEl.offsetHeight : 50;
    document.documentElement.style.setProperty("--header-h", `${h}px`);
  }
  setHeaderH();
  window.addEventListener("resize", setHeaderH);

  function renderProduct(productId){
    const p = PRODUCTS[productId] || PRODUCTS["capcut_pro"];
    if (!pmContent || !p) return;

    const benefits = (p.benefits || []).map(li => `<li>${li}</li>`).join("");
    const gallery = (p.gallery || []).map(src => `<img src="${src}" alt="">`).join("");

    pmContent.innerHTML = `
      <img class="cover" src="${p.cover}" alt="${p.name_km}">
      <p>1. អំពីកម្មវិធី</p>

      <table class="simple-info-table">
        <tr><td>ឈ្មោះកម្មវិធី</td><td>${p.name_km}</td></tr>
        <tr><td>តម្លៃ</td><td>${p.price}</td></tr>
        <tr><td>ការចូលប្រើ</td><td>${p.access}</td></tr>
        <tr><td>រយៈពេលភ្ជាប់</td><td>${p.connect}</td></tr>
        <tr><td>គម្រោង</td><td>${p.plan}</td></tr>
        <tr><td>ការធានា</td><td>${p.warranty}</td></tr>
        <tr><td>ប្រភេទ</td><td>${p.type}</td></tr>
      </table>

      <p>2. អត្ថប្រយោជន៍</p>
      <ul class="fix-list">
        ${benefits}
      </ul>

      <button class="btn-store-info" type="button" id="pmBuyBtn">ទិញឥឡូវនេះ</button>

      <div class="gallery">
        ${gallery}
      </div>
    `;

    // Buy button action (you can change link later)
    const buyBtn = document.getElementById("pmBuyBtn");
    if (buyBtn) {
      buyBtn.onclick = () => window.open("https://t.me/smservicekh", "_blank", "noopener");
    }
  }

  if (productModal && storeBox) {
    const dialog = productModal.querySelector(".pm-dialog");
    const closeBtn = productModal.querySelector(".pm-close");
    const backdrop = productModal.querySelector(".pm-backdrop");

    let isClosing = false;

    function openSheet(productId) {
      if (isClosing) return;

      renderProduct(productId);
      productModal.dataset.product = productId || "";

      productModal.classList.add("is-visible");
      productModal.setAttribute("aria-hidden", "false");
      document.body.classList.add("sheet-open");

      requestAnimationFrame(() => {
        productModal.classList.add("is-open");
        if (closeBtn) closeBtn.focus();
      });
    }

    function closeSheet() {
      if (!productModal.classList.contains("is-open") || isClosing) return;

      isClosing = true;
      productModal.classList.remove("is-open");

      const finish = () => {
        productModal.classList.remove("is-visible");
        productModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("sheet-open");
        isClosing = false;
      };

      if (!dialog) { finish(); return; }

      const onEnd = (e) => {
        if (e && e.target === dialog) finish();
      };
      dialog.addEventListener("transitionend", onEnd, { once: true });

      setTimeout(finish, 450);
    }

    // Click product card → open
    storeBox.addEventListener("click", (e) => {
      const card = e.target.closest(".item.product-open");
      if (!card) return;
      openSheet(card.dataset.product || "");
    });

    // Keyboard open (Enter/Space)
    storeBox.addEventListener("keydown", (e) => {
      const card = e.target.closest(".item.product-open");
      if (!card) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openSheet(card.dataset.product || "");
      }
    });

    // Close handlers
    if (closeBtn) closeBtn.addEventListener("click", closeSheet);
    if (backdrop) backdrop.addEventListener("click", closeSheet);

    document.addEventListener("keydown", (e) => {
      if (!productModal.classList.contains("is-visible")) return;
      if (e.key === "Escape") closeSheet();
    });
  }

});

































//home.js
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













