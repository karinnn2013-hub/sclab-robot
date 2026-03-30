console.log("JS running");

const intro = document.getElementById("introVideo");
const scrollV = document.getElementById("scrollVideo");
const spline = document.getElementById("spline-desktop");

function isMobile() {
  return window.innerWidth < 450;
}

let videoReady = false;

// =======================
// INIT
// =======================
window.addEventListener("load", () => {

  if (isMobile()) {

    if (spline) spline.remove();

    // ✅ 先加载 scroll video
    scrollV.src = "./assets/scroll.mp4";
    scrollV.load();

    scrollV.addEventListener("loadeddata", () => {
      scrollV.currentTime = 0.01;
      videoReady = true;
    });

    // ✅ 再播 intro
    intro.src = "./assets/intro.mp4";
    intro.play();

  } else {

    if (intro) intro.remove();
    if (scrollV) scrollV.remove();

    if (spline) {
      spline.setAttribute(
        "url",
        "https://prod.spline.design/VxylDYgy5NiSa3YW/scene.splinecode"
      );
    }

  }

});

intro.addEventListener("ended", () => {

  if (!videoReady) {
    console.warn("scroll video not ready yet");
    return;
  }

  // 🔥 强制显示 scroll video
  scrollV.style.opacity = "1";

  // 🔥 确保在最上层
  scrollV.style.zIndex = "2";

  // 🔥 隐藏 intro
  intro.style.opacity = "0";
  intro.style.zIndex = "0";

});



let started = false;

document.addEventListener("touchstart", () => {

  if (!started) {

    scrollV.play().then(() => {
      scrollV.pause(); // 👉 先解锁
      started = true;
    });

  }

  // 👉 真正播放
  scrollV.play();

}, { passive: true });


scrollV.addEventListener("ended", () => {

  console.log("scroll video ended");

  // 👉 释放布局
  scrollV.classList.add("release");

});




const title1 = document.querySelector(".title-main");
const title1cn = document.querySelector(".title-maincn");

const title3 = document.querySelector(".title-main2");
const title3cn = document.querySelector(".title-maincn2");

window.addEventListener('scroll', () => {

  const trigger = 120;

  if (window.scrollY > trigger) {

    // 👉 第一组消失
    title1.classList.add("hidden");
    title1cn.classList.add("hidden");

    // 👉 第二组出现
    title3.classList.remove("hidden");
    title3cn.classList.remove("hidden");

    title3.classList.add("visible");
    title3cn.classList.add("visible");

  } else {

    // 👉 第一组出现
    title1.classList.remove("hidden");
    title1cn.classList.remove("hidden");

    // 👉 第二组消失
    title3.classList.remove("visible");
    title3cn.classList.remove("visible");

    title3.classList.add("hidden");
    title3cn.classList.add("hidden");
  }

});


setTimeout(() => {
  document.documentElement.style.scrollBehavior = "smooth";
}, 100);
/* =========================
   1️⃣ 页面初始化（防止自动滚动）
========================= */
history.scrollRestoration = "manual";

window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});

/* =========================
   2️⃣ 自定义鼠标
========================= */

const cursor = document.querySelector(".custom-cursor");

/* 让 cursor 跟随鼠标 */
document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

/* 所有可 hover 元素 */
const hoverTargets = document.querySelectorAll("a, button, .hover-target");

hoverTargets.forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
  });
});


/* =========================
   3️⃣ scroll indicator
========================= */
const scrollIndicator = document.querySelector('.scrollIndicator');

window.addEventListener('scroll', () => {
  if (!scrollIndicator) return;

  if (window.scrollY > 20) {
    scrollIndicator.style.opacity = "0";
  } else {
    scrollIndicator.style.opacity = "1";
  }
});


/* =========================
   4️⃣ 标题 fade（顶部消失）
========================= */
const title = document.querySelector(".title-main");
const title2 = document.querySelector(".title-maincn");

window.addEventListener('scroll', () => {
  if (!title || !title2) return;

  if (window.scrollY > 120) {
    title.classList.add("hidden");
    title2.classList.add("hidden");
  } else {
    title.classList.remove("hidden");
    title2.classList.remove("hidden");
  }
});


/* =========================
   5️⃣ explore button scroll
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const exploreBtn = document.querySelector(".explorebtn");

  if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
      window.scrollBy({
        top: window.innerHeight * 0.8,
        behavior: "smooth"
      });
    });
  }
});


/* =========================
   6️⃣ fade-block 动效（核心修复版）
========================= */
const el = document.querySelector(".title-2");
const el2 = document.querySelector(".para1");

let isReady = false;

window.addEventListener("load", () => {
  setTimeout(() => {
    isReady = true;
  }, 200);
});

window.addEventListener("scroll", () => {
  if (!el || !title2 || !isReady) return;

  const rect = el.getBoundingClientRect();
  const windowH = window.innerHeight;

  const enterStart = windowH * 0.8; // 进入区
  const leaveStart = windowH * 0.3;  // 离开区

  // ✅ 在屏幕中间 → 显示
  if (rect.top < enterStart && rect.bottom > leaveStart) {
    el.classList.add("visible");
    el.classList.remove("hidden");
    el2.classList.add("visible");
    el2.classList.remove("hidden");
  }

  // ✅ 滑出上方 → 隐藏
  else if (rect.top < leaveStart) {
    el.classList.remove("visible");
    el.classList.add("hidden");
    el2.classList.remove("visible");
    el2.classList.add("hidden");
  }

  // ✅ 在屏幕下方（还没进入）→ 初始隐藏
  else {
    el.classList.remove("visible");
    el.classList.remove("hidden");
    el2.classList.remove("visible");
    el2.classList.remove("hidden");
  }
});





const btn = document.querySelector('.scroll-btn');
const line = document.querySelector('#launchLine');

btn.addEventListener('click', () => {

  const target = document.querySelector('#nextSection');

  // 👉 按钮中心
  const rect = btn.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2;

  // ✅ 保证永远向下（关键）
  const minLength = 250; 
  const targetY = window.innerHeight * 0.66;
  const endY = Math.max(startY + minLength, targetY);

  // 👉 SVG坐标转换（安全版）
  const svg = line.ownerSVGElement;

  let svgStart = { x: startX, y: startY };
  let svgEnd = { x: startX, y: endY };

  try {
    const ptStart = svg.createSVGPoint();
    const ptEnd = svg.createSVGPoint();

    ptStart.x = startX;
    ptStart.y = startY;

    ptEnd.x = startX;
    ptEnd.y = endY;

    const matrix = svg.getScreenCTM();

    if (matrix) {
      svgStart = ptStart.matrixTransform(matrix.inverse());
      svgEnd = ptEnd.matrixTransform(matrix.inverse());
    }
  } catch (e) {
    console.warn("SVG transform fallback");
  }

  // 👉 设置线
  line.setAttribute('x1', svgStart.x);
  line.setAttribute('y1', svgStart.y);
  line.setAttribute('x2', svgEnd.x);
  line.setAttribute('y2', svgEnd.y);

  // 👉 重置动画
  line.style.transition = 'none';
  line.style.strokeDashoffset = 1000;
  line.style.opacity = 1;

  requestAnimationFrame(() => {
    line.style.transition =
      'stroke-dashoffset 0.7s cubic-bezier(0.3,0.8,0.2,1), opacity 0.3s ease 0.7s';

    line.style.strokeDashoffset = 0;
    line.style.opacity = 0;
  });

  // 👉 自定义平滑 scroll（不卡版本）
  const startScroll = window.scrollY;
  const targetScroll = target.getBoundingClientRect().top + window.scrollY;

  const distance = targetScroll - startScroll;
  const duration = 1200;

  let startTime = null;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateScroll(time) {
    if (!startTime) startTime = time;

    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeOutCubic(progress);

    window.scrollTo(0, startScroll + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);

});





const card = document.querySelectorAll('.card');

let triggered = new Set(); // ✅ 记录已经触发的卡片

window.addEventListener('scroll', () => {

  card.forEach((el, i) => {

    const rect = el.getBoundingClientRect();
    const triggerPoint = window.innerHeight * 0.85;

    // 👉 进入视口
    if (rect.top < triggerPoint) {

      if (!triggered.has(el)) {

        triggered.add(el);

        // 🔥 stagger delay
        const delay = i * 50;

        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, delay);

      }

    } else {
      // 👉 scroll 回去消失
      triggered.delete(el);

      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
    }

  });

});

const diagrams = document.querySelectorAll('.diagram');

// 创建 observer
const observer = new IntersectionObserver((entries) => {

  entries.forEach((entry, index) => {

    const el = entry.target;

    if (entry.isIntersecting) {

      // 🔥 stagger（用 CSS variable，更稳）
      el.style.setProperty('--delay', `${index * 0.08}s`);

      el.classList.add('show');

    } else {

      el.classList.remove('show');

    }

  });

}, {
  threshold: 0.2,              // 进入 20% 就触发
  rootMargin: "0px 0px -10% 0px" // 提前一点触发（类似你原来 0.85）
});


// 绑定所有元素
diagrams.forEach(el => observer.observe(el));





document.querySelectorAll('.paths path').forEach(path => {
  const length = path.getTotalLength();

  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  let progress = 0;

  function animate() {
    progress += 2;
    path.style.strokeDashoffset = length - (progress % length);
    requestAnimationFrame(animate);
  }

  animate();
});

const cards = document.querySelectorAll('.card');
const center = document.querySelector('.center-dot');

/* ===== 初始化路径 ===== */
document.querySelectorAll('.link-path').forEach(path => {
  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;
});


/* ===== 页面加载 → 自动展开 ===== */
window.addEventListener("load", () => {

  const paths = document.querySelectorAll('.link-path');

  paths.forEach((path, i) => {
    setTimeout(() => {
      path.style.transition = "stroke-dashoffset 1.2s ease";
      path.style.strokeDashoffset = 0;
    }, i * 300);
  });

  // 卡片出现
  cards.forEach((card, i) => {
    setTimeout(() => {
      card.classList.add('show');
    }, 800 + i * 200);
  });

});


/* ===== hover联动 ===== */
cards.forEach((card, i) => {

  const path = document.getElementById(card.dataset.path);
  const dot = document.getElementById("dot-" + ["a","b","c"][i]);

  card.addEventListener("mouseenter", () => {

    path.classList.add("active");
    center.classList.add("active");

    animateDot(path, dot);

  });

  card.addEventListener("mouseleave", () => {

    path.classList.remove("active");
    center.classList.remove("active");

    dot.style.opacity = 0;

  });

});


/* ===== 粒子沿路径流动 ===== */
function animateDot(path, dot) {

  const length = path.getTotalLength();
  let progress = 0;

  dot.style.opacity = 1;

  function move() {
    progress += 2;

    const point = path.getPointAtLength(progress % length);
    dot.setAttribute("cx", point.x);
    dot.setAttribute("cy", point.y);

    requestAnimationFrame(move);
  }

  move();
}


let lastScrollY = window.scrollY;
const footer = document.querySelector('.footer');

window.addEventListener('scroll', () => {
  const current = window.scrollY;

  if (current > lastScrollY) {
    footer.style.transform = "translateY(100%)";
  } else {
    footer.style.transform = "translateY(0)";
  }

  lastScrollY = current;
});


