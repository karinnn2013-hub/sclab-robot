console.log("JS running");


console.log("🔁 spline switch (opacity mode)");

function isMobile() {
  return window.matchMedia("(max-width: 450px)").matches;
}

window.addEventListener("load", () => {

  const desktop = document.getElementById("spline-desktop");
  const mobile = document.getElementById("spline-mobile");

  if (!desktop || !mobile) return;

  if (isMobile()) {
    mobile.classList.add("active");
    console.log("📱 mobile spline active");
  } else {
    desktop.classList.add("active");
    console.log("🖥 desktop spline active");
  }

});


/* =========================
   4️⃣ 标题 fade
========================= */
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


/* =========================
   5️⃣ explore button scroll
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const exploreBtn = document.querySelector(".explorebtn");
  const target = document.querySelector("#nextSection");

  if (exploreBtn && target) {
    exploreBtn.addEventListener("click", () => {

      const style = window.getComputedStyle(target);
      const marginTop = parseInt(style.scrollMarginTop) || 0;

      const targetScroll =
        target.getBoundingClientRect().top +
        window.scrollY -
        marginTop;

      window.scrollTo({
        top: targetScroll,
        behavior: "smooth"
      });

    });
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


function isMobile() {
  return window.innerWidth < 450;
  
}

btn.addEventListener('click', () => {

  const target = document.querySelector('#nextSection');

  // 👉 射线动画（保留）
  animateLine();

  setTimeout(() => {

    if (isMobile()) {

      // =========================
      // 📱 MOBILE（专用 scroll）
      // =========================

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    } else {

      // =========================
      // 💻 DESKTOP（保持你原逻辑）
      // =========================

      const startScroll = window.scrollY;
      const targetScroll =
        target.getBoundingClientRect().top + window.scrollY;

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
    }

  }, 80);

});



const card = document.querySelectorAll('.card');

let triggered = new Set(); // ✅ 记录已经触发的卡片

window.addEventListener('scroll', () => {

  card.forEach((el, i) => {

    const rect = el.getBoundingClientRect();
    const triggerPoint = window.innerHeight * 0.99;

    // 👉 进入视口
    if (rect.top < triggerPoint) {

      if (!triggered.has(el)) {

        triggered.add(el);

        // 🔥 stagger delay
        const delay = i * 20;

        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, delay);

      }

    } else {
      // 👉 scroll back and disappear
      triggered.delete(el);

      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
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


const featureSection = document.querySelector('.feature-section2');

if (featureSection) {
  const cards2 = featureSection.querySelectorAll('.card');
  const overlay = featureSection.querySelector('.card-overlay');
  const panel = featureSection.querySelector('.feature-panel');
  const closeButton = panel ? panel.querySelector('.feature-panel-close') : null;
  const panelContents = panel ? panel.querySelectorAll('.panel-content') : [];
  const panelVideoSource = './assets/feature-panel-left.mov';
  let activeCard = null;
  let suppressClickUntil = 0;

  function createPanelVideo() {
    const video = document.createElement('video');

    video.className = 'panel-video';
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.preload = 'auto';
    video.playsInline = true;
    video.src = panelVideoSource;
    video.setAttribute('playsinline', '');
    video.setAttribute('aria-label', 'Panel preview video');

    return video;
  }

  function clearPanelContent() {
    panelContents.forEach(content => {
      const media = content.querySelector('.panel-media');

      if (!media) {
        return;
      }

      media.querySelectorAll('video').forEach(video => {
      video.pause();
      video.removeAttribute('src');
      video.load();
      });

      media.replaceChildren();
      content.classList.remove('active');
    });
  }

  function getPanelContent(panelName) {
    if (!panelName) {
      return null;
    }

    return panel.querySelector(`[data-panel-content="${panelName}"]`);
  }

  function openPanel(card) {
    if (!panel || !overlay) {
      return;
    }

    activeCard = card;
    panel.dataset.sourceCard = card.dataset.panel || '';

    clearPanelContent();

    const activeContent = getPanelContent(card.dataset.panel);
    const panelMedia = activeContent ? activeContent.querySelector('.panel-media') : null;

    if (activeContent) {
      activeContent.classList.add('active');
    }

    if (panelMedia) {
      panelMedia.appendChild(createPanelVideo());
    }

    panel.classList.add('active');
    panel.setAttribute('aria-hidden', 'false');
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
  }

  function closePanel() {
    if (!panel || !overlay) {
      return;
    }

    activeCard = null;
    panel.classList.remove('active');
    panel.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    delete panel.dataset.sourceCard;
    clearPanelContent();
  }

  function handleCardActivation(card, event) {
    event.preventDefault();
    event.stopPropagation();

    if (event.target.closest('.card-back-btn')) {
      return;
    }

    if (card === activeCard && panel && panel.classList.contains('active')) {
      return;
    }

    openPanel(card);
  }

  cards2.forEach(card => {
    card.addEventListener('pointerup', event => {
      if (event.pointerType === 'mouse') {
        return;
      }

      suppressClickUntil = Date.now() + 500;
      handleCardActivation(card, event);
    });

    card.addEventListener('click', event => {
      if (Date.now() < suppressClickUntil) {
        return;
      }

      handleCardActivation(card, event);
    });
  });

  if (closeButton) {
    closeButton.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      closePanel();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      closePanel();
    });
  }

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closePanel();
    }
  });
}


const cursor = document.querySelector('.custom-cursor');

// 👉 禁用 mobile
function isMobile() {
  return window.innerWidth < 768;
}

if (!isMobile()) {

  // =========================
  // 跟随鼠标（smooth）
  // =========================
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    currentX += (mouseX - currentX) * 0.4;
    currentY += (mouseY - currentY) * 0.4;

    cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;

    requestAnimationFrame(animate);
  }

  animate();


  // =========================
  // hover 放大
  // =========================
  const hoverTargets = document.querySelectorAll('a, button, .card');

  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('active');
    });

    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
    });
  });

} else {
  // 👉 mobile 直接隐藏
  cursor.style.display = "none";
}
