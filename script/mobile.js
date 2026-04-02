console.log("📱 MOBILE MODE");

// =========================
// GLOBAL VAR
// =========================
const imageElement = document.getElementById("imageElement");
const trigger = document.getElementById("trigger-zone");

const intro = "/assets/intro-last.png";
const forward = "/assets/scroll.gif";
const reverse = "/assets/scroll-reverse.gif";

// 防止重复触发
let state = "intro";

const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {
      // 👉 进入 trigger → 播放 forward
      if (state !== "forward") {
        imageElement.src = forward + "?t=" + Date.now();
        state = "forward";
        console.log("▶ forward");
      }

    } else {
      // 👉 离开 → 播放 reverse
      if (state !== "reverse") {
        imageElement.src = reverse + "?t=" + Date.now();
        state = "reverse";
        console.log("◀ reverse");
      }
    }

  });

}, {
  threshold: 0.3   // 👈 控制触发点
});

observer.observe(trigger);


// =========================
// LOADING END
// =========================
function finishLoading() {
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
    console.log("✅ mobile ready");
  });
}


// =========================
// DISABLE DESKTOP


const title = document.querySelector(".title-main");
const title2 = document.querySelector(".title-maincn");
const scrollbtn = document.querySelector(".btn");
const herotitle2 = document.querySelector(".title-main2");
const para2 = document.querySelector(".title-maincn2");


window.addEventListener('scroll', () => {
  if (!title || !title2 ||!herotitle2 ||!para2) return;

  if (window.scrollY > 80) {
    title.classList.add("hidden");
    title2.classList.add("hidden");
    scrollbtn.classList.add("hidden");
    herotitle2.classList.remove("hidden");
    para2.classList.remove("hidden");

  } else {
    title.classList.remove("hidden");
    title2.classList.remove("hidden");
    scrollbtn.classList.remove("hidden");
    herotitle2.classList.add("hidden");
    para2.classList.add("hidden");

  }
});





function isMobile() {
  return window.innerWidth < 450;
  
}
