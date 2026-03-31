console.log("JS running");

const intro = './assets/intro-last.png';
const scrollForward = './assets/scroll.gif';
const scrollReverse = './assets/scroll-reverse.gif';
const finalFrame = './assets/scroll-last.png';

// =========================
// PRELOAD
// =========================
[intro, scrollForward, scrollReverse, finalFrame].forEach(src => {
  const img = new Image();
  img.src = src;
});

// =========================
// DOM
// =========================
const imageElement = document.getElementById('imageElement');

// =========================
// STATE
// =========================
let currentState = 0; 
let isPlaying = false;
let lastScrollY2 = window.scrollY;
let reverseLock = false; // 🔒 防止重复触发

// =========================
// SWITCH IMAGE
// =========================
const switchImage = (src) => {
  imageElement.src = src;
};

// =========================
// SCROLL LOGIC（抽出来）
// =========================
function handleScroll() {

  const currentScrollY = window.scrollY;
  const delta = currentScrollY - lastScrollY2;

  const goingDown = delta > 1;
  const goingUp = delta < -1;

  // ▶ 向下播放
  if (goingDown && currentState === 0 && !isPlaying) {

    isPlaying = true;
    currentState = 1;

    switchImage(scrollForward + "?t=" + Date.now());

    setTimeout(() => {
      switchImage(finalFrame);
      currentState = 2;
      isPlaying = false;
    }, 1200);
  }

  // ⏪ 向上播放（加锁版）
  if (currentScrollY < 50 && currentState === 2 && !isPlaying && !reverseLock) {

    reverseLock = true;
    isPlaying = true;
    currentState = -1;

    imageElement.src = "";

    requestAnimationFrame(() => {

      switchImage(scrollReverse + "?t=" + Date.now());

      setTimeout(() => {
        switchImage(intro);
        currentState = 0;
        isPlaying = false;

        // 🔓 延迟解锁（防止连续触发）
        setTimeout(() => {
          reverseLock = false;
        }, 100);

      }, 1200);

    });
  }

  // 👇 最后更新（一定要在最后）
  lastScrollY2 = currentScrollY;
}

// =========================
// THROTTLE（关键）
// =========================
let ticking = false;

window.addEventListener('scroll', () => {

  if (!ticking) {

    requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });

    ticking = true;
  }

});
// =========================
// 强制可滚动（测试用）
// =========================
document.body.style.height = "200vh";



/* =========================
   4️⃣ 标题 fade
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
