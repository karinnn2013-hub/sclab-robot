console.log("JS running");

/* =========================
   🔧 工具函数（统一封装）
========================= */

// 是否 mobile
const isMobile = window.matchMedia("(max-width: 768px)").matches;

// 安全选择
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// scroll 进度
const getScrollProgress = () => {
  return window.scrollY / (document.body.scrollHeight - window.innerHeight);
};


/* =========================
   1️⃣ 页面初始化
========================= */

history.scrollRestoration = "manual";

window.addEventListener("load", () => {

  document.body.style.opacity = "1";
  document.body.classList.remove("preload");
  document.body.classList.add("ready");

  $$(".hero").forEach(el => el.style.visibility = "visible");

  const preloader = $("#preloader");
  if (preloader) {
    setTimeout(() => preloader.classList.add("hidden"), 500);
  }

  setTimeout(() => {
    document.body.classList.remove("init");
  }, 200);

});


document.body.classList.add("init");

setTimeout(() => {
  document.documentElement.style.scrollBehavior = "smooth";
}, 100);


/* =========================
   2️⃣ Custom Cursor（自动禁用 mobile）
========================= */

if (!isMobile) {

  const cursor = $(".custom-cursor");

  if (cursor) {
    document.addEventListener("pointermove", e => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });

    $$("a, button, .hover-target").forEach(el => {
      el.addEventListener("pointerenter", () => cursor.classList.add("hover"));
      el.addEventListener("pointerleave", () => cursor.classList.remove("hover"));
    });
  }

}


/* =========================
   3️⃣ Scroll Logic（统一入口🔥）
========================= */

const title1 = $(".title-main");
const title1cn = $(".title-maincn");

const title2 = $(".title-main2");
const title2cn = $(".title-maincn2");

const scrollIndicator = $(".scrollIndicator");

let ticking = false;

window.addEventListener("scroll", () => {

  if (!ticking) {
    window.requestAnimationFrame(handleScroll);
    ticking = true;
  }

}, { passive: true });


function handleScroll() {

  const y = window.scrollY;

  /* ===== title 切换 ===== */
  if (title1 && title1cn && title2 && title2cn) {

    if (y > 120) {
      title1.classList.add("hidden");
      title1cn.classList.add("hidden");

      title2.classList.remove("hidden");
      title2cn.classList.remove("hidden");

      title2.classList.add("visible");
      title2cn.classList.add("visible");

    } else {
      title1.classList.remove("hidden");
      title1cn.classList.remove("hidden");

      title2.classList.remove("visible");
      title2cn.classList.remove("visible");

      title2.classList.add("hidden");
      title2cn.classList.add("hidden");
    }
  }

  /* ===== scroll indicator ===== */
  if (scrollIndicator) {
    scrollIndicator.style.opacity = y > 20 ? "0" : "1";
  }

  /* ===== fade block ===== */
  const el = $(".title-2");
  const el2 = $(".para1");

  if (el && el2) {
    const rect = el.getBoundingClientRect();
    const h = window.innerHeight;

    if (rect.top < h * 0.8 && rect.bottom > h * 0.3) {
      el.classList.add("visible");
      el.classList.remove("hidden");
      el2.classList.add("visible");
      el2.classList.remove("hidden");
    } else if (rect.top < h * 0.3) {
      el.classList.remove("visible");
      el.classList.add("hidden");
      el2.classList.remove("visible");
      el2.classList.add("hidden");
    }
  }

  /* ===== card animation ===== */
  $$(".card").forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    } else {
      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";
    }
  });

  /* ===== footer ===== */
  const footer = $(".footer");
  if (footer) {
    footer.style.transform = (y > lastScrollY)
      ? "translateY(100%)"
      : "translateY(0)";
  }

  lastScrollY = y;
  ticking = false;
}

let lastScrollY = window.scrollY;


/* =========================
   4️⃣ Explore Button（兼容 touch）
========================= */

const exploreBtn = $(".explorebtn");

if (exploreBtn) {
  exploreBtn.addEventListener("pointerdown", () => {
    window.scrollBy({
      top: window.innerHeight * 0.8,
      behavior: "smooth"
    });
  });
}


/* =========================
   5️⃣ SVG line + scroll（优化版）
========================= */

const btn = $(".scroll-btn");
const line = $("#launchLine");

if (btn && line) {

  btn.addEventListener("pointerdown", () => {

    const target = $("#nextSection");
    if (!target) return;

    const rect = btn.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    const endY = startY + 300;

    line.setAttribute("x1", startX);
    line.setAttribute("y1", startY);
    line.setAttribute("x2", startX);
    line.setAttribute("y2", endY);

    line.style.strokeDashoffset = 0;

    target.scrollIntoView({ behavior: "smooth" });

  });

}


/* =========================
   6️⃣ Path 动画（性能安全）
========================= */

$$(".paths path").forEach(path => {

  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  let progress = 0;

  function animate() {
    progress += 1;
    path.style.strokeDashoffset = length - (progress % length);
    requestAnimationFrame(animate);
  }

  animate();

});


/* =========================
   7️⃣ hover → mobile fallback
========================= */

if (!isMobile) {

  const cards = $$(".card");
  const center = $(".center-dot");

  cards.forEach((card, i) => {

    const path = document.getElementById(card.dataset.path);

    card.addEventListener("pointerenter", () => {
      if (path) path.classList.add("active");
      if (center) center.classList.add("active");
    });

    card.addEventListener("pointerleave", () => {
      if (path) path.classList.remove("active");
      if (center) center.classList.remove("active");
    });

  });

}

