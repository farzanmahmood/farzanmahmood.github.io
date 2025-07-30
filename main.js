// ===== GLOBAL VARIABLES =====
let particles = [];
let mouse = { x: 0, y: 0 };

// ===== DOM CONTENT LOADED =====
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

// ===== INITIALIZE APP =====
function initializeApp() {
  initializeParticles();
  initializeCursor();
  initializeNavigation();
  initializeTypingEffect();
  initializeCounters();
  initializeThemeToggle();
  initializeSmoothScrolling();

  // Initialize AOS
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
    });
  }
}

// ===== LOADING SCREEN REMOVED =====

// ===== PARTICLE SYSTEM =====
function initializeParticles() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const container = document.getElementById("particles");

  if (!container) return;

  canvas.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;";
  container.appendChild(canvas);

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
  }

  function createParticles() {
    particles = [];
    const count = Math.floor((canvas.width * canvas.height) / 15000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = "#00d9ff";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(animate);
  }

  resize();
  animate();
  window.addEventListener("resize", resize);
}

// ===== CUSTOM CURSOR =====
function initializeCursor() {
  const cursor = document.querySelector(".cursor");
  const follower = document.querySelector(".cursor-follower");

  if (!cursor || !follower) return;

  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    setTimeout(() => {
      follower.style.left = e.clientX - 15 + "px";
      follower.style.top = e.clientY - 15 + "px";
    }, 100);
  });
}

// ===== NAVIGATION =====
function initializeNavigation() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  // Mobile menu
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }
}

// ===== TYPING EFFECT =====
function initializeTypingEffect() {
  const element = document.querySelector(".title-typing");
  if (!element) return;

  const texts = ["Data Analyst & Problem Solver", "Business Intelligence Expert", "Data Visualization Expert"];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = texts[textIndex];

    if (isDeleting) {
      element.textContent = current.substring(0, charIndex);
      charIndex--;
    } else {
      element.textContent = current.substring(0, charIndex);
      charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex > current.length) {
      speed = 2000;
      isDeleting = true;
      charIndex = current.length;
    } else if (isDeleting && charIndex < 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      charIndex = 0;
      speed = 500;
    }

    setTimeout(type, speed);
  }

  setTimeout(type, 1000);
}

// ===== COUNTER ANIMATION =====
function initializeCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target.dataset.animated !== "true") {
        animateCounter(entry.target);
      }
    });
  });

  document.querySelectorAll(".stat-number").forEach((counter) => {
    observer.observe(counter);
  });
}

function animateCounter(counter) {
  const target = parseFloat(counter.dataset.count);
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    counter.textContent = target % 1 === 0 ? Math.floor(current) : current.toFixed(1);
  }, duration / steps);

  counter.dataset.animated = "true";
}

// ===== THEME TOGGLE =====
function initializeThemeToggle() {
  const toggle = document.querySelector(".theme-toggle");
  const body = document.body;
  const icon = toggle?.querySelector("i");

  if (!toggle || !icon) return;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light-theme");
    icon.classList.replace("fa-sun", "fa-moon");
  }

  toggle.addEventListener("click", () => {
    body.classList.toggle("light-theme");

    if (body.classList.contains("light-theme")) {
      icon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("theme", "light");
    } else {
      icon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme", "dark");
    }
  });
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        const headerHeight = document.querySelector(".navbar").offsetHeight;
        window.scrollTo({
          top: target.offsetTop - headerHeight,
          behavior: "smooth",
        });
      }
    });
  });
}

// ===== SCROLL PROGRESS =====
function initializeScrollProgress() {
  const progress = document.createElement("div");
  progress.style.cssText = `
        position:fixed;top:0;left:0;width:0;height:3px;
        background:#00d9ff;
        z-index:10001;transition:width 0.1s ease;
        box-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
    `;
  document.body.appendChild(progress);

  window.addEventListener("scroll", () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const current = (window.pageYOffset / total) * 100;
    progress.style.width = current + "%";
  });
}

// Initialize scroll progress
document.addEventListener("DOMContentLoaded", initializeScrollProgress);
