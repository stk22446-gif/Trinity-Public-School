// =========================================================
// Trinity Public School Website
// File purpose: dark mode, mobile menu, form feedback, reveals
// =========================================================

const body = document.body;
const siteHeader = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-menu a");
const revealItems = document.querySelectorAll(".reveal");

// ---------- Mobile menu ----------
menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// ---------- Header active links ----------
function updateHeaderState() {
  let currentSection = null;

  navLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));

    if (section && section.offsetTop <= window.scrollY + 130) {
      currentSection = section;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", currentSection && link.getAttribute("href") === `#${currentSection.id}`);
  });
}

window.addEventListener("scroll", updateHeaderState);
updateHeaderState();

// ---------- Scroll reveal animation ----------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));

// ---------- Simple form feedback ----------
function handleFormSubmit(formId, messageId, successText) {
  const form = document.getElementById(formId);
  const message = document.getElementById(messageId);

  if (!form || !message) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    message.textContent = successText;
    form.reset();
  });
}

handleFormSubmit("admissionForm", "admissionMessage", "Thank you. Our admissions team will contact you soon.");
handleFormSubmit("contactForm", "contactMessage", "Message sent. We will reply shortly.");

// ---------- Typing Animation ----------
function initTypingAnimation() {
  const typingElements = document.querySelectorAll(".typing-text");

  typingElements.forEach((el) => {
    const text = el.textContent;
    el.textContent = "";
    let i = 0;

    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, 100);
      }
    }

    setTimeout(type, 1000);
  });
}

window.addEventListener("load", initTypingAnimation);

// ---------- Hero Slider (Swiper) ----------
const heroSwiper = new Swiper(".hero-slider", {
  loop: true,
  speed: 1000,
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  simulateTouch: false, // Allows text selection with mouse without swiping
  grabCursor: false, // Removed grab cursor as it suggests dragging which interferes with selection
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
