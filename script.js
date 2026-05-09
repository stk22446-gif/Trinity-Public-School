/**
 * Trinity Public School - Core Website Scripts
 * 
 * Includes logic for:
 * - Mobile Navigation & Overlay
 * - Scroll Reveal Animations
 * - Header Active State Management
 * - Form Handling & Feedback
 * - Swiper Hero Slider Initialization
 */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const siteHeader = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const menuOverlay = document.getElementById("menuOverlay");
  const revealItems = document.querySelectorAll(".reveal");

  /* ---------------------------------------------------------
     1. MOBILE MENU LOGIC
     --------------------------------------------------------- */
  if (menuToggle && navMenu && menuOverlay) {
    const toggleMenu = (forceClose = false) => {
      const isOpen = forceClose ? false : !navMenu.classList.contains("open");
      
      navMenu.classList.toggle("open", isOpen);
      menuToggle.classList.toggle("active", isOpen);
      menuOverlay.classList.toggle("visible", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      
      // Prevent scrolling when menu is open
      body.style.overflow = isOpen ? "hidden" : "";
    };

    menuToggle.addEventListener("click", () => toggleMenu());
    menuOverlay.addEventListener("click", () => toggleMenu(true));
    
    // Close menu when a link is clicked
    navLinks.forEach((link) => {
      link.addEventListener("click", () => toggleMenu(true));
    });
  }

  /* ---------------------------------------------------------
     2. ACCORDION (ABOUT SECTION)
     --------------------------------------------------------- */
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");

    if (header) {
      header.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // Close all other items
        accordionItems.forEach((otherItem) => {
          otherItem.classList.remove("active");
        });

        // Toggle current item
        if (!isActive) {
          item.classList.add("active");
        }
      });
    }
  });

  /* ---------------------------------------------------------
     3. HEADER ACTIVE LINKS (ScrollSpy)
     --------------------------------------------------------- */
  const updateHeaderState = () => {
    let currentSection = null;

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        const section = document.querySelector(href);
        if (section && section.offsetTop <= window.scrollY + 130) {
          currentSection = section;
        }
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href.startsWith("#") && currentSection) {
        link.classList.toggle("active", href === `#${currentSection.id}`);
      }
    });
  };

  window.addEventListener("scroll", updateHeaderState);
  updateHeaderState();

  /* ---------------------------------------------------------
     3. SCROLL REVEAL ANIMATION (Intersection Observer)
     --------------------------------------------------------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  /* ---------------------------------------------------------
     4. FORM HANDLING
     --------------------------------------------------------- */
  const handleFormSubmit = (formId, messageId, successText) => {
    const form = document.getElementById(formId);
    const message = document.getElementById(messageId);

    if (form && message) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        message.textContent = successText;
        message.classList.add("success");
        form.reset();
      });
    }
  };

  handleFormSubmit("admissionForm", "admissionMessage", "Thank you! Our admissions team will contact you soon.");
  handleFormSubmit("contactForm", "contactMessage", "Message sent successfully. We will reply shortly.");

  /* ---------------------------------------------------------
     5. TYPING ANIMATION
     --------------------------------------------------------- */
  const typingElements = document.querySelectorAll(".typing-text");
  
  // Store original text in data attribute for repeated use
  typingElements.forEach(el => {
    el.setAttribute("data-text", el.textContent);
    el.textContent = "";
  });

  const runTypingAnimation = (activeSlide) => {
    const el = activeSlide.querySelector(".typing-text");
    if (!el) return;

    const text = el.getAttribute("data-text");
    el.textContent = "";
    let i = 0;

    const type = () => {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, 80); // Slightly faster typing
      }
    };

    setTimeout(type, 500); // Start after slide transition
  };

  /* ---------------------------------------------------------
     6. HERO SLIDER (Swiper.js)
     --------------------------------------------------------- */
  if (document.querySelector(".hero-slider")) {
    const heroSwiper = new Swiper(".hero-slider", {
      loop: true,
      speed: 1000,
      effect: "fade",
      fadeEffect: { crossFade: true },
      autoplay: {
        delay: 6000, // Slightly longer delay
        disableOnInteraction: false,
      },
      simulateTouch: false,
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
      on: {
        init: function () {
          // Trigger animation for initial slide after a short delay
          setTimeout(() => {
            runTypingAnimation(this.slides[this.activeIndex]);
          }, 500);
        },
        slideChangeTransitionStart: function () {
          // Trigger animation whenever slide changes
          runTypingAnimation(this.slides[this.activeIndex]);
        }
      }
    });
  }
});
