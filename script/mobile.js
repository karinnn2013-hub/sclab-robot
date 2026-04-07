console.log("📱 MOBILE MODE");

// =========================
// GLOBAL VAR
// =========================
const imageElement = document.getElementById("imageElement");
const trigger = document.getElementById("trigger-zone");

const intro = "./assets/intro-last.png";
const forward = "./assets/scroll.gif";
const reverse = "./assets/scroll-reverse.gif";

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


const hero = document.getElementById("scroll-section");

const observer2 = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
  
      console.log("hero intersect:", entry.isIntersecting);
  
      if (entry.isIntersecting) {
        // 👉 hero 在屏幕 → 显示 title
        title.classList.remove("hidden");
        title2.classList.remove("hidden");
        scrollbtn.classList.remove("hidden");
  
      } else {
        // 👉 hero 离开 → 隐藏
        title.classList.add("hidden");
        title2.classList.add("hidden");
        scrollbtn.classList.add("hidden");
      }
  
    });
  
  }, {
    threshold: 0.1
  });
  
  observer2.observe(hero);

const featureSection = document.querySelector('.feature-section2');

if (featureSection) {
  const cards = featureSection.querySelectorAll('.card');
  const overlay = featureSection.querySelector('.card-overlay');
  const panel = featureSection.querySelector('.feature-panel');
  const closeButton = panel ? panel.querySelector('.feature-panel-close') : null;
  const panelContents = panel ? panel.querySelectorAll('.panel-content') : [];
  const panelVideoSource = './assets/feature-panel-left.mov';
  let activeCard = null;
  let suppressClickUntil = 0;

  function createPanelVideo() {
    const video = document.createElement('video');

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

  cards.forEach(card => {
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
  });

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closePanel();
    }
  });
}
