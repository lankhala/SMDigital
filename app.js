/* app.js — adds Home panel behavior + keeps existing store/service/product sheet + theme + protection */

document.addEventListener("DOMContentLoaded", () => {
  // PANEL SWITCHING (Home / Store / Service)
  const buttons = document.querySelectorAll(".tool-btn");
  const panels = document.querySelectorAll(".panel");
  const panelOverlay = document.getElementById("panelOverlay");

  function showPanel(panelId) {
    if (!panelId) return;
    if (!document.getElementById(panelId)) return;

    if (panelOverlay) panelOverlay.classList.add("active");

    setTimeout(() => {
      panels.forEach((panel) => {
        panel.classList.toggle("active", panel.id === panelId);
      });

      buttons.forEach((btn) => {
        // only highlight buttons that actually map to a panel
        const id = btn.dataset.panel;
        btn.classList.toggle("active", id === panelId);
      });

      if (panelOverlay) panelOverlay.classList.remove("active");

      sessionStorage.setItem("lastPanel", panelId);
      sessionStorage.setItem("lastScroll", window.scrollY);
    }, 0);
  }

  // ✅ make accessible for Home internal buttons
  window.showPanel = showPanel;

  // Attach click only to buttons that have a data-panel
  buttons.forEach((btn) => {
    const panelId = btn.dataset.panel;
    if (!panelId) return;
    btn.addEventListener("click", () => showPanel(panelId));
  });

  // ✅ Home "quick actions" buttons: data-go-panel="store|service|home"
  
document.querySelectorAll("[data-go-panel]").forEach((el) => {
  el.addEventListener("click", () => {
    const target = el.getAttribute("data-go-panel");
    const scrollSel = el.getAttribute("data-scroll");

    showPanel(target);
    window.scrollTo(0, 0);

    // optional: scroll to a section inside the target panel
    if (scrollSel) {
      setTimeout(() => {
        const node = document.querySelector(scrollSel);
        if (node) node.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  });
});

// allow "Enter/Space" for home cards (keyboard)
document.querySelectorAll(".home-card-link[role='button']").forEach((card) => {
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.click();
    }
  });
});

  // Restore last panel + scroll position
  const lastPanel = sessionStorage.getItem("lastPanel");
  const lastScroll = sessionStorage.getItem("lastScroll");

  if (lastPanel && document.getElementById(lastPanel)) {
    showPanel(lastPanel);
    if (lastScroll) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(lastScroll, 10));
      }, 100);
    }
  } else {
    // ✅ Default to Home (instead of Store)
    showPanel("home");
  }

  // RANDOM BANNER (service)
  const bannerImg = document.getElementById("randomBanner");
  if (bannerImg) {
    const bannerList = ["banner1.jpg", "banner2.jpg", "banner3.jpg"];
    const randomIndex = Math.floor(Math.random() * bannerList.length);
    bannerImg.src = bannerList[randomIndex];
  }

  // PRODUCTS DATA (used by product sheet)
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
        "Ai Credit រួមទាំងAdobe Fonts និង Stock",
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
      "type": "គណនីផ្ទាល់ខ្លួន",
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
        "ប្រើ Pro Features ពេញចលនា",
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

  // PRODUCT MODAL (sheet)
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

    window.openSheet = openSheet;

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

    storeBox.addEventListener("click", (e) => {
      const card = e.target.closest(".item.product-open");
      if (!card) return;
      openSheet(card.dataset.product || "");
    });

    storeBox.addEventListener("keydown", (e) => {
      const card = e.target.closest(".item.product-open");
      if (!card) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openSheet(card.dataset.product || "");
      }
    });

    if (closeBtn) closeBtn.addEventListener("click", closeSheet);
    if (backdrop) backdrop.addEventListener("click", closeSheet);

    document.addEventListener("keydown", (e) => {
      if (!productModal.classList.contains("is-visible")) return;
      if (e.key === "Escape") closeSheet();
    });
  }

  // DARK / LIGHT MODE TOGGLE (single top-right #modeToggle)
  const modeBtn = document.getElementById('modeToggle');

  function applyMode(mode, save = true) {
    const isDark = mode === 'dark';
    document.body.classList.toggle('dark', isDark);
    document.documentElement.setAttribute('data-color-scheme', isDark ? 'dark' : 'light');
    if (save) localStorage.setItem('uiMode', isDark ? 'dark' : 'light');
  }

  let transitionTimeout = null;
  function toggleMode() {
    document.documentElement.classList.add('color-transition');
    void document.documentElement.offsetWidth;

    const current = localStorage.getItem('uiMode') || (document.body.classList.contains('dark') ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    applyMode(next, true);

    if (transitionTimeout) clearTimeout(transitionTimeout);
    transitionTimeout = setTimeout(() => {
      document.documentElement.classList.remove('color-transition');
      transitionTimeout = null;
    }, 420);
  }

  const saved = localStorage.getItem('uiMode');
  if (saved === 'dark' || saved === 'light') {
    applyMode(saved, false);
  }

  if (modeBtn) {
    modeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMode();
    });
    modeBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMode();
      }
    });
  }

  // Protection script (unchanged behavior)
  (function () {
    function applyProtection() {
      document.body.classList.add('no-select');

      document.addEventListener('contextmenu', function (e) {
        try { e.preventDefault(); } catch (err) {}
      }, { capture: true });

      ['copy','cut','paste'].forEach(evt => {
        document.addEventListener(evt, function (e) {
          try { e.preventDefault(); } catch (err) {}
        }, { capture: true });
      });

      document.addEventListener('selectstart', function (e) {
        try { e.preventDefault(); } catch (err) {}
      }, { capture: true });
      document.addEventListener('dragstart', function (e) {
        try { e.preventDefault(); } catch (err) {}
      }, { capture: true });

      function keyHandler(e) {
        if (e.key === 'F12' || e.keyCode === 123) {
          e.preventDefault && e.preventDefault();
          triggerBlock('F12 detected');
          return false;
        }
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.key === 'i' || e.key === 'j' || e.key === 'c')) {
          e.preventDefault && e.preventDefault();
          triggerBlock('DevTools shortcut detected');
          return false;
        }
        if (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.key === 'S' || e.key === 's')) {
          e.preventDefault && e.preventDefault();
          triggerBlock('Source/save shortcut detected');
          return false;
        }
      }

      document.addEventListener('keydown', keyHandler, { capture: true });

      let lastOuterHeight = window.outerHeight;
      window.addEventListener('resize', function () {
        if (Math.abs(window.outerHeight - lastOuterHeight) > 150) {
          triggerBlock('Window resized (possible devtools)');
        }
        lastOuterHeight = window.outerHeight;
      });

      function triggerBlock(reason) {
        try { console.warn('Protection triggered:', reason); } catch (e) {}
        try {
          document.documentElement.innerHTML = '<head><meta charset="utf-8"><title>Blocked</title></head><body style="display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#111;color:#fff;font-family:system-ui,Arial;"><div style="max-width:680px;padding:24px;text-align:center;"><h1 style="margin:0 0 12px;font-size:22px;">ការចូលដំណើរការ ត្រូវបានបិទ</h1><p style="margin:0 0 18px;color:#ccc">យើងបានរកឃើញការព្យាយាមបើក Developer Tools / Inspect Element។ សូមទោស — ទំព័រនេះបានបិទសម្រាប់សុវត្ថិភាព។</p></div></body>';
        } catch (err) {}
        try { window.location.href = 'about:blank'; } catch (err) {}
        try { window.close(); } catch (err) {}
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', applyProtection);
    } else {
      applyProtection();
    }
  })();

});
