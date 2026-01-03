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
    }, 180);
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
    const bannerList = ["banner/banner1.jpg", "banner/banner2.jpg", "banner/banner3.jpg"];
    const randomIndex = Math.floor(Math.random() * bannerList.length);
    bannerImg.src = bannerList[randomIndex];
  }

  // ==========================
  // PRODUCT SHEET (Same layout, different data)
  // ==========================
  const PRODUCTS = {
  "facebook_verify": {
    "name_km": "Facebook Verify",
    "price": "$4.99",
    "access": "1 Account/Page",
    "connect": "60 នាទី+",
    "plan": "1 ខែ",
    "warranty": "2 សប្តាហ៍",
    "type": "Personal Account",
    "cover": "Product/p10.jpg",
    "benefits": [
      "ទទួលបានសញ្ញាសម្គាល់ខៀវ",
      "គណនីមានសុវត្ថិភាពខ្ពស់",
      "បង្កើនគណនីឲ្យទាក់ទាញជាងមុន",
      "គណនីរបស់អ្នករឹងមាំ និងទទួលស្គាល់ពី Meta"
    ],
    // "gallery": [
    //   "imgtab1/fbv.webp"
    // ]
  },
  "capcut_pro": {
    "name_km": "CapCut Pro",
    "price": "$5.00",
    "access": "1 ឧបករណ៍",
    "connect": "5-10 នាទី+",
    "plan": "1 ខែ",
    "warranty": "មួយខែពេញ",
    "type": "Share Account",
    "cover": "Product/p9.jpg",
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
    "type": "Personal Account",
    "cover": "Product/p7.jpg",
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
    "type": "Personal Account",
    "cover": "Product/p1.jpg",
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
    "type": "Share Account",
    "cover": "Product/p2.jpg",
    "benefits": [
      "share account ប្រើមួយឧបករណ៍",
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
    "cover": "Product/p3.jpg",
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
    "type": "Share Account",
    "cover": "Product/p5.jpg",
    "benefits": [
      "មើល Movies/Series គុណភាព HD/4K",
      "ប្រើបានលើទូរស័ព្ទ/TV/PC",
      "Support តាម Telegram"
    ],
  },
  "google_drive_2tb": {
    "name_km": "Gemini Ai +2TB",
    "price": "$5.00",
    "access": "1 Account",
    "connect": "60 នាទី+",
    "plan": "Monthly",
    "warranty": "7 ថ្ងៃ",
    "type": "Personal Account",
    "cover": "Product/p4.jpg",
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
    "type": "Share Account",
    "cover": "Product/p6.jpg",
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
    "cover": "Product/p8.jpg",
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
      <h3>1. អំពីកម្មវិធី</h3>

      <table class="simple-info-table">
        <tr><td>ឈ្មោះកម្មវិធី</td><td>${p.name_km}</td></tr>
        <tr><td>តម្លៃ</td><td>${p.price}</td></tr>
        <tr><td>ការចូលប្រើ</td><td>${p.access}</td></tr>
        <tr><td>រយៈពេលភ្ជាប់</td><td>${p.connect}</td></tr>
        <tr><td>គម្រោង</td><td>${p.plan}</td></tr>
        <tr><td>ការធានា</td><td>${p.warranty}</td></tr>
        <tr><td>ប្រភេទ</td><td>${p.type}</td></tr>
      </table>

      <h3>2. អត្ថប្រយោជន៍</h3>
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




