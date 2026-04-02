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



viewer.addEventListener("load", () => {
    viewer.classList.add("loaded");
  });


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