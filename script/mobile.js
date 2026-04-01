console.log("📱 MOBILE MODE");

// =========================
// INIT
// =========================
document.addEventListener("DOMContentLoaded", () => {

  disableDesktop();
  setupHero();
  setupScrollReveal();
  finishLoading();

});


// =========================
// 1️⃣ 关闭 desktop 系统
// =========================
function disableDesktop() {

  const spline = document.getElementById("spline-layer");
  const desktopVideo = document.getElementById("scrollVideo");

  if (spline) spline.style.display = "none";
  if (desktopVideo) desktopVideo.pause();

}


// =========================
// 2️⃣ HERO（用 GIF / 静态图）
// =========================
function setupHero() {

  const hero = document.getElementById("heromedia");

  if (!hero) return;

  // 👉 推荐用 GIF 或 MP4（轻量）
  hero.src = "./assets/scroll.gif";

  hero.style.opacity = 0;

  // 淡入
  setTimeout(() => {
    hero.style.transition = "opacity 0.8s ease";
    hero.style.opacity = 1;
  }, 100);

}


// =========================
// 3️⃣ CARD 滑入（核心体验）
// =========================
function setupScrollReveal() {

  const cards = document.querySelectorAll(".card");

  if (!cards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }

    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -10% 0px"
  });

  cards.forEach(card => observer.observe(card));

}


// =========================
// 4️⃣ 防卡顿 scroll fallback（iOS关键）
// =========================
let ticking = false;

function safeScroll(callback) {
  if (!ticking) {
    requestAnimationFrame(() => {
      callback();
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener("scroll", () => {
  safeScroll(() => {
    // 👉 这里可以以后加轻量逻辑（现在先空）
  });
}, { passive: true });


// =========================
// 5️⃣ PRELOAD 结束
// =========================
function finishLoading() {

  window.addEventListener("load", () => {

    document.body.classList.add("loaded");

    console.log("✅ mobile ready");

  });

}