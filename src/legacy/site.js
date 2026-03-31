export function initLandingInteractions() {
// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");
const htmlElement = document.documentElement;

// Function to check if it's day time (between 7 AM and 9 PM)
function isDayTime() {
  const now = new Date();
  const hour = now.getHours();
  // Day mode from 7:00 to 21:00 (7 AM to 9 PM)
  // Dark mode from 21:00 to 7:00 (9 PM to 7 AM)
  return hour >= 7 && hour < 21;
}

// Function to get time-based theme (day = light, night = dark)
function getTimeBasedTheme() {
  return isDayTime() ? "light" : "dark";
}

// Function to update logos based on theme
function updateLogos(theme) {
  // Update header and sidebar logos (exclude footer which always uses white logo)
  const logoImages = document.querySelectorAll(".logo-img, .sidebar-logo-img");
  const logoFileName = theme === "dark" ? "logo_2026.png" : "logo_2026_black.png";

  logoImages.forEach((img) => {
    // Get the current src and replace the filename
    const currentSrc = img.getAttribute("src") || img.src;
    if (currentSrc) {
      // Replace the logo filename while keeping the path structure
      const newSrc = currentSrc.replace(/logo_2026(_black)?\.png/g, logoFileName);
      img.src = newSrc;
    } else {
      img.src = "/assets/logos/" + logoFileName;
    }
  });

  // Footer logo always uses white logo (logo_2026.png) since footer has black background
  const footerLogos = document.querySelectorAll(".footer-logo-img");
  footerLogos.forEach((img) => {
    const currentSrc = img.getAttribute("src") || img.src;
    if (currentSrc && currentSrc.includes("logo_2026_black.png")) {
      const newSrc = currentSrc.replace(/logo_2026_black\.png/g, "logo_2026.png");
      img.src = newSrc;
    } else if (!currentSrc || !currentSrc.includes("logo_2026.png")) {
      img.src = "/assets/logos/logo_2026.png";
    }
  });
}

// Function to apply theme
function applyTheme(theme) {
  htmlElement.setAttribute("data-theme", theme);
  updateLogos(theme);
}

// Function to get the appropriate theme
function getAutoTheme() {
  // Check if user has manually overridden the theme
  const manualOverride = localStorage.getItem("theme-manual-override");
  if (manualOverride === "true") {
    // User has manually set a preference, use it
    return localStorage.getItem("theme") || "dark";
  } else {
    // Use time-based theme: 7:00-21:00 = light, otherwise dark
    return getTimeBasedTheme();
  }
}

// Initialize theme on page load - use time-based detection
// Only override if user has explicitly set a preference
const savedTheme = localStorage.getItem("theme");
const manualOverride = localStorage.getItem("theme-manual-override");

// Use time-based theme unless user has manually overridden
let initialTheme;
if (manualOverride === "true") {
  // User explicitly set a theme, respect it
  initialTheme = savedTheme || "dark";
} else {
  // Use time-based theme: 7:00-21:00 = light, otherwise dark
  initialTheme = getTimeBasedTheme();
}

// Apply theme immediately
applyTheme(initialTheme);

// Update theme periodically (every minute) based on time
setInterval(() => {
  const manualOverride = localStorage.getItem("theme-manual-override");
  if (manualOverride !== "true") {
    // Use time-based theme: 7:00-21:00 = light, otherwise dark
    applyTheme(getTimeBasedTheme());
  }
}, 60000); // Check every minute

// Manual toggle handler
if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    localStorage.setItem("theme-manual-override", "true"); // Mark as manual override
  });
}

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
let isMenuOpen = false;

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMobileMenu();
  });
}

function toggleMobileMenu() {
  if (!isMenuOpen) {
    openMobileMenu();
  } else {
    closeMobileMenu();
  }
}

function openMobileMenu() {
  if (isMenuOpen) return;

  isMenuOpen = true;
  document.body.style.overflow = "hidden";

  // Add active class to toggle button
  mobileMenuToggle.classList.add("active");

  // Check if we're on the coming soon page
  const isComingSoonPage =
    window.location.pathname.includes("coming-soon.html") ||
    document.querySelector(".coming-soon-hero") !== null;
  const linkPrefix = isComingSoonPage ? "index.html" : "";

  // Create mobile menu overlay
  const currentLang = htmlElement.getAttribute("lang") || "en";
  const mobileMenu = document.createElement("div");
  mobileMenu.className = "mobile-menu";
  mobileMenu.innerHTML = `
        <div class="mobile-menu-header">
            <div class="mobile-menu-header-controls">
                <button class="dark-mode-toggle mobile-dark-mode-toggle" id="mobileDarkModeToggle" aria-label="Toggle dark mode">
                    <svg class="dark-mode-icon sun-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                    <svg class="dark-mode-icon moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </button>
            </div>
            <button class="mobile-menu-close" aria-label="Close menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
        <div class="mobile-nav">
            ${isComingSoonPage ? '<a href="index.html" class="mobile-nav-link" data-i18n="nav.home">Home</a>' : ""}
            <a href="${linkPrefix}#about" class="mobile-nav-link" data-i18n="nav.story">Story</a>
            <a href="${linkPrefix}#founders" class="mobile-nav-link" data-i18n="nav.about">About</a>
            <a href="https://app.veiq.ai" class="mobile-nav-link" target="_blank" rel="noopener noreferrer" data-i18n="nav.login">Login</a>
            <div class="mobile-nav-buttons">
                <a href="https://www.linkedin.com/in/arvin-esterabadi-b283a1166/" target="_blank" rel="noopener noreferrer" class="btn-secondary mobile-btn">Contact</a>
                <a href="https://www.linkedin.com/in/arvin-esterabadi-b283a1166/" target="_blank" rel="noopener noreferrer" class="btn-primary mobile-btn" data-i18n="nav.joinWaitlist">Request Demo</a>
            </div>
        </div>
    `;
  document.body.appendChild(mobileMenu);

  // Add close button event listener
  const closeBtn = mobileMenu.querySelector(".mobile-menu-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeMobileMenu();
    });
  }

  // Animate menu in
  requestAnimationFrame(() => {
    mobileMenu.classList.add("active");
    // Translate mobile menu elements after creation
    translatePage(currentLanguage);
  });

  // Close menu when clicking on navigation links (after scroll completes)
  const links = mobileMenu.querySelectorAll(".mobile-nav-link");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Let the smooth scroll handler handle the navigation
      // Close menu after a delay to allow scroll to start
      setTimeout(() => {
        closeMobileMenu();
      }, 300);
    });
  });

  // Add dark mode toggle event listener for mobile menu
  const mobileDarkModeToggle = mobileMenu.querySelector("#mobileDarkModeToggle");
  if (mobileDarkModeToggle) {
    mobileDarkModeToggle.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      localStorage.setItem("theme-manual-override", "true"); // Mark as manual override
    });
  }
}

function closeMobileMenu() {
  if (!isMenuOpen) return;

  isMenuOpen = false;
  document.body.style.overflow = "";
  mobileMenuToggle.classList.remove("active");

  const mobileMenu = document.querySelector(".mobile-menu");
  if (mobileMenu) {
    mobileMenu.classList.remove("active");
    setTimeout(() => {
      if (mobileMenu.parentNode) {
        mobileMenu.remove();
      }
    }, 300);
  }
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  const mobileMenu = document.querySelector(".mobile-menu");
  if (
    isMenuOpen &&
    mobileMenu &&
    !mobileMenu.contains(e.target) &&
    !mobileMenuToggle.contains(e.target)
  ) {
    closeMobileMenu();
  }
});

// Close mobile menu on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isMenuOpen) {
    closeMobileMenu();
  }
});

// Smooth scrolling for anchor links
document.addEventListener("click", function (e) {
  const anchor = e.target.closest('a[href^="#"]');
  if (anchor) {
    const href = anchor.getAttribute("href");
    if (href !== "#" && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
        // Close mobile menu if open
        if (isMenuOpen) {
          closeMobileMenu();
        }
      }
    }
  }
});

// Add scroll animation to feature cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeUp 0.6s ease forwards";
      entry.target.style.opacity = "1";
    }
  });
}, observerOptions);

// Observe all feature cards and insight items
document.querySelectorAll(".feature-card, .insight-item, .pricing-card").forEach((el) => {
  el.style.opacity = "0";
  observer.observe(el);
});

// Add parallax effect to hero section
let lastScrollTop = 0;
const heroImage = document.querySelector(".hero-image");

if (heroImage) {
  window.addEventListener(
    "scroll",
    () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop < heroImage.offsetHeight) {
        heroImage.style.transform = `translateY(${scrollTop * 0.3}px)`;
      }
    },
    { passive: true },
  );
}

// Add hover effects to pricing cards
document.querySelectorAll(".pricing-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transition = "all 0.3s ease";
  });
});

// GA4 / analytics: CTA click tracking
document.querySelectorAll(".btn-primary, .btn-hero, .pricing-button").forEach((button) => {
  button.addEventListener("click", (e) => {
    var label =
      button.id === "openWaitlistModal" || button.id === "openWaitlistModalHero"
        ? "request_demo"
        : null;
    if (!label && button.closest("a")) {
      var href = (button.closest("a").getAttribute("href") || "").toLowerCase();
      if (href.indexOf("app.veiq.ai") !== -1) label = "login";
    }
    if (!label) label = button.id || (button.textContent || "").trim().slice(0, 50) || "cta";
    if (typeof window.trackEvent === "function") window.trackEvent("CTA", "click", label);
  });
});

// Animate numbers on scroll (if needed for future use)
function animateNumber(element, target, duration = 1000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = Math.round(target).toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.round(current).toLocaleString();
    }
  }, 16);
}

// Example usage (uncomment when needed):
// const numberObserver = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             const target = parseInt(entry.target.dataset.target);
//             animateNumber(entry.target, target);
//             numberObserver.unobserve(entry.target);
//         }
//     });
// }, { threshold: 0.5 });
//
// document.querySelectorAll('[data-animate-number]').forEach(el => {
//     numberObserver.observe(el);
// });

// AI Prompt Badge Selection
document.querySelectorAll(".ai-prompt-badge").forEach((badge) => {
  badge.addEventListener("click", function (e) {
    e.stopPropagation();
    this.classList.toggle("active");
  });
});

// AI Prompt Questions - Fill input on click
document.querySelectorAll(".ai-prompt-question").forEach((question) => {
  question.addEventListener("click", function (e) {
    e.stopPropagation();
    const input = document.querySelector(".ai-prompt-standalone-input");
    if (input) {
      input.value = this.textContent.trim();
      input.focus();
    }
  });
});

// AI Prompt Box Hover - Auto-type suggested question carousel
const aiPromptBox = document.querySelector(".ai-prompt-box");
const aiPromptInput = document.querySelector(".ai-prompt-input");
let typingAnimation = null;
let typingInterval = null;
let carouselTimeout = null;
let isUserTyping = false;
let isCarouselActive = false;
let currentQuestionIndex = 0;
let originalPlaceholder = "";

// Get suggested questions from the standalone section
const suggestedQuestions = [
  "Hi Marvin, can you show me my deal matches of today?",
  "Find underpriced BMWs I can flip this week",
  "Select cars with the best margins from last month",
  "Analyze the factors driving price changes in the car market this month",
  "Identify the fastest-selling models this month",
  "Compare pricing trends for BMW vs Audi",
  "Locate regions with the highest demand",
];

if (aiPromptBox && aiPromptInput) {
  // Store original placeholder
  originalPlaceholder = aiPromptInput.placeholder;

  // Function to stop all typing animations and carousel
  function stopTypingAnimation() {
    if (typingAnimation) {
      clearTimeout(typingAnimation);
      typingAnimation = null;
    }
    if (typingInterval) {
      clearInterval(typingInterval);
      typingInterval = null;
    }
    if (carouselTimeout) {
      clearTimeout(carouselTimeout);
      carouselTimeout = null;
    }
    isCarouselActive = false;
  }

  // Function to type out text character by character
  function typeText(text, input, speed = 30) {
    return new Promise((resolve) => {
      // Clear any existing intervals first
      if (typingInterval) {
        clearInterval(typingInterval);
        typingInterval = null;
      }

      let index = 0;
      input.value = "";
      input.placeholder = "";

      typingInterval = setInterval(() => {
        if (!isCarouselActive || isUserTyping || document.activeElement === input) {
          clearInterval(typingInterval);
          typingInterval = null;
          resolve();
          return;
        }

        if (index < text.length) {
          input.value = text.substring(0, index + 1);
          index++;
        } else {
          clearInterval(typingInterval);
          typingInterval = null;
          resolve();
        }
      }, speed);
    });
  }

  // Function to clear text
  function clearText(input) {
    return new Promise((resolve) => {
      const text = input.value;
      if (!text) {
        resolve();
        return;
      }
      let index = text.length;
      const clearInt = setInterval(() => {
        if (!isCarouselActive || isUserTyping || document.activeElement === input) {
          clearInterval(clearInt);
          resolve();
          return;
        }

        if (index > 0) {
          index--;
          input.value = text.substring(0, index);
        } else {
          clearInterval(clearInt);
          input.value = "";
          resolve();
        }
      }, 15);
    });
  }

  // Function to cycle through questions
  async function cycleQuestions() {
    if (!isCarouselActive || isUserTyping || document.activeElement === aiPromptInput) {
      return;
    }

    // Get next question (cycle through array)
    const question = suggestedQuestions[currentQuestionIndex];
    currentQuestionIndex = (currentQuestionIndex + 1) % suggestedQuestions.length;

    // Type the question
    await typeText(question, aiPromptInput, 30);

    if (!isCarouselActive || isUserTyping || document.activeElement === aiPromptInput) {
      return;
    }

    // Wait before clearing (show full question for 2.5 seconds)
    await new Promise((resolve) => {
      carouselTimeout = setTimeout(resolve, 2500);
    });

    if (!isCarouselActive || isUserTyping || document.activeElement === aiPromptInput) {
      return;
    }

    // Clear the text
    await clearText(aiPromptInput);

    if (!isCarouselActive || isUserTyping || document.activeElement === aiPromptInput) {
      return;
    }

    // Wait a bit before next question
    await new Promise((resolve) => {
      carouselTimeout = setTimeout(resolve, 500);
    });

    // Continue cycling
    if (isCarouselActive && !isUserTyping && document.activeElement !== aiPromptInput) {
      cycleQuestions();
    }
  }

  // Function to reset input
  function resetInput() {
    if (document.activeElement !== aiPromptInput && !isUserTyping) {
      aiPromptInput.value = "";
      aiPromptInput.placeholder = originalPlaceholder;
    }
  }

  // Start carousel on hover
  aiPromptBox.addEventListener("mouseenter", () => {
    if (document.activeElement !== aiPromptInput && !aiPromptInput.value.trim()) {
      isUserTyping = false;
      isCarouselActive = true;
      currentQuestionIndex = Math.floor(Math.random() * suggestedQuestions.length);

      // Small delay before starting to type
      typingAnimation = setTimeout(() => {
        if (isCarouselActive && !isUserTyping && document.activeElement !== aiPromptInput) {
          cycleQuestions();
        }
      }, 500);
    }
  });

  // Stop carousel when mouse leaves
  aiPromptBox.addEventListener("mouseleave", () => {
    stopTypingAnimation();
    setTimeout(() => {
      if (document.activeElement !== aiPromptInput && !isUserTyping) {
        resetInput();
      }
    }, 100);
  });

  // Stop animation if user starts typing
  aiPromptInput.addEventListener("input", () => {
    isUserTyping = true;
    stopTypingAnimation();
  });

  // Stop animation on focus
  aiPromptInput.addEventListener("focus", () => {
    isUserTyping = true;
    stopTypingAnimation();
  });

  // Reset flag when user leaves input
  aiPromptInput.addEventListener("blur", () => {
    isUserTyping = false;
    setTimeout(() => {
      // Check if still hovering over the box
      if (!aiPromptBox.matches(":hover")) {
        resetInput();
      } else if (isCarouselActive && !aiPromptInput.value.trim()) {
        // Resume carousel if still hovering and input is empty
        cycleQuestions();
      }
    }, 200);
  });
}

// AI Prompt Standalone Box On Scroll - Auto-type suggested question carousel
const aiPromptStandaloneBox = document.querySelector(".ai-prompt-standalone-box");
const aiPromptStandaloneInput = document.querySelector(".ai-prompt-standalone-input");
let typingAnimationStandalone = null;
let typingIntervalStandalone = null;
let carouselTimeoutStandalone = null;
let isUserTypingStandalone = false;
let isCarouselActiveStandalone = false;
let currentQuestionIndexStandalone = 0;
let originalPlaceholderStandalone = "";
let startStandaloneCarousel = null;

if (aiPromptStandaloneBox && aiPromptStandaloneInput) {
  // Store original placeholder
  originalPlaceholderStandalone = aiPromptStandaloneInput.placeholder;

  // Function to stop all typing animations and carousel
  function stopTypingAnimationStandalone() {
    if (typingAnimationStandalone) {
      clearTimeout(typingAnimationStandalone);
      typingAnimationStandalone = null;
    }
    if (typingIntervalStandalone) {
      clearInterval(typingIntervalStandalone);
      typingIntervalStandalone = null;
    }
    if (carouselTimeoutStandalone) {
      clearTimeout(carouselTimeoutStandalone);
      carouselTimeoutStandalone = null;
    }
    isCarouselActiveStandalone = false;
  }

  // Function to type out text character by character
  function typeTextStandalone(text, input, speed = 30) {
    return new Promise((resolve) => {
      // Clear any existing intervals first
      if (typingIntervalStandalone) {
        clearInterval(typingIntervalStandalone);
        typingIntervalStandalone = null;
      }

      let index = 0;
      input.value = "";
      input.placeholder = "";

      typingIntervalStandalone = setInterval(() => {
        if (
          !isCarouselActiveStandalone ||
          isUserTypingStandalone ||
          document.activeElement === input
        ) {
          clearInterval(typingIntervalStandalone);
          typingIntervalStandalone = null;
          resolve();
          return;
        }

        if (index < text.length) {
          input.value = text.substring(0, index + 1);
          index++;
        } else {
          clearInterval(typingIntervalStandalone);
          typingIntervalStandalone = null;
          resolve();
        }
      }, speed);
    });
  }

  // Function to clear text
  function clearTextStandalone(input) {
    return new Promise((resolve) => {
      const text = input.value;
      if (!text) {
        resolve();
        return;
      }
      let index = text.length;
      const clearInt = setInterval(() => {
        if (
          !isCarouselActiveStandalone ||
          isUserTypingStandalone ||
          document.activeElement === input
        ) {
          clearInterval(clearInt);
          resolve();
          return;
        }

        if (index > 0) {
          index--;
          input.value = text.substring(0, index);
        } else {
          clearInterval(clearInt);
          input.value = "";
          resolve();
        }
      }, 15);
    });
  }

  // Function to cycle through questions
  async function cycleQuestionsStandalone() {
    if (
      !isCarouselActiveStandalone ||
      isUserTypingStandalone ||
      document.activeElement === aiPromptStandaloneInput
    ) {
      return;
    }

    // Get next question (cycle through array)
    const question = suggestedQuestions[currentQuestionIndexStandalone];
    currentQuestionIndexStandalone =
      (currentQuestionIndexStandalone + 1) % suggestedQuestions.length;

    // Type the question
    await typeTextStandalone(question, aiPromptStandaloneInput, 30);

    if (
      !isCarouselActiveStandalone ||
      isUserTypingStandalone ||
      document.activeElement === aiPromptStandaloneInput
    ) {
      return;
    }

    // Wait before clearing (show full question for 2.5 seconds)
    await new Promise((resolve) => {
      carouselTimeoutStandalone = setTimeout(resolve, 2500);
    });

    if (
      !isCarouselActiveStandalone ||
      isUserTypingStandalone ||
      document.activeElement === aiPromptStandaloneInput
    ) {
      return;
    }

    // Clear the text
    await clearTextStandalone(aiPromptStandaloneInput);

    if (
      !isCarouselActiveStandalone ||
      isUserTypingStandalone ||
      document.activeElement === aiPromptStandaloneInput
    ) {
      return;
    }

    // Wait a bit before next question
    await new Promise((resolve) => {
      carouselTimeoutStandalone = setTimeout(resolve, 500);
    });

    // Continue cycling
    if (
      isCarouselActiveStandalone &&
      !isUserTypingStandalone &&
      document.activeElement !== aiPromptStandaloneInput
    ) {
      cycleQuestionsStandalone();
    }
  }

  // Function to reset input
  function resetInputStandalone() {
    if (document.activeElement !== aiPromptStandaloneInput && !isUserTypingStandalone) {
      aiPromptStandaloneInput.value = "";
      aiPromptStandaloneInput.placeholder = originalPlaceholderStandalone;
    }
  }

  startStandaloneCarousel = () => {
    if (
      document.activeElement !== aiPromptStandaloneInput &&
      !aiPromptStandaloneInput.value.trim()
    ) {
      isUserTypingStandalone = false;
      isCarouselActiveStandalone = true;
      currentQuestionIndexStandalone = Math.floor(Math.random() * suggestedQuestions.length);

      // Small delay before starting to type
      typingAnimationStandalone = setTimeout(() => {
        if (
          isCarouselActiveStandalone &&
          !isUserTypingStandalone &&
          document.activeElement !== aiPromptStandaloneInput
        ) {
          cycleQuestionsStandalone();
        }
      }, 500);
    }
  };

  // Stop animation if user starts typing
  aiPromptStandaloneInput.addEventListener("input", () => {
    isUserTypingStandalone = true;
    stopTypingAnimationStandalone();
  });

  // Stop animation on focus
  aiPromptStandaloneInput.addEventListener("focus", () => {
    isUserTypingStandalone = true;
    stopTypingAnimationStandalone();
  });

  // Reset flag when user leaves input
  aiPromptStandaloneInput.addEventListener("blur", () => {
    isUserTypingStandalone = false;
    setTimeout(() => {
      if (!aiPromptStandaloneBox.classList.contains("is-open")) {
        resetInputStandalone();
      } else if (isCarouselActiveStandalone && !aiPromptStandaloneInput.value.trim()) {
        // Resume carousel if open and input is empty
        cycleQuestionsStandalone();
      }
    }, 200);
  });
}

// Waitlist Modal Logic
const waitlistModal = document.getElementById("waitlistModal");
const openWaitlistModalBtn = document.getElementById("openWaitlistModal");
const openWaitlistModalHeroBtn = document.getElementById("openWaitlistModalHero");
const closeWaitlistModalBtn = document.getElementById("closeWaitlistModal");
const waitlistModalOverlay = document.getElementById("waitlistModalOverlay");
const waitlistForm = document.getElementById("waitlistForm");
const waitlistSubmitBtn = document.getElementById("waitlistSubmitBtn");
const waitlistFormNote = document.getElementById("waitlistFormNote");

// Function to open modal
function openWaitlistModal() {
  if (waitlistModal) {
    if (typeof window.trackEvent === "function") window.trackEvent("CTA", "click", "request_demo");
    waitlistModal.classList.add("active");
    document.body.style.overflow = "hidden";
    // Focus on email input
    const emailInput = document.getElementById("waitlist-email");
    if (emailInput) {
      setTimeout(() => emailInput.focus(), 100);
    }
  }
}

// Function to close modal
function closeWaitlistModal() {
  if (waitlistModal) {
    waitlistModal.classList.remove("active");
    document.body.style.overflow = "";
    // Reset form after a delay
    setTimeout(() => {
      if (waitlistForm) {
        waitlistForm.reset();
        waitlistFormNote.textContent =
          "We'll never share your details. We'll be in touch soon to schedule your demo.";
        waitlistFormNote.style.color = "";
      }
    }, 300);
  }
}

// Open modal event listeners
if (openWaitlistModalBtn) {
  openWaitlistModalBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openWaitlistModal();
  });
}

if (openWaitlistModalHeroBtn) {
  openWaitlistModalHeroBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openWaitlistModal();
  });
}

// Close modal event listeners
if (closeWaitlistModalBtn) {
  closeWaitlistModalBtn.addEventListener("click", closeWaitlistModal);
}

if (waitlistModalOverlay) {
  waitlistModalOverlay.addEventListener("click", closeWaitlistModal);
}

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && waitlistModal && waitlistModal.classList.contains("active")) {
    closeWaitlistModal();
  }
});

// Handle mobile menu waitlist button (dynamically created)
document.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("mobile-btn") &&
    (e.target.textContent.trim() === "Request Demo" ||
      e.target.textContent.trim() === "Join Waitlist")
  ) {
    e.preventDefault();
    closeMobileMenu();
    setTimeout(() => {
      openWaitlistModal();
    }, 300);
  }
});

// Waitlist Form Submission (Formspree)
if (waitlistForm) {
  waitlistForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const originalText = waitlistSubmitBtn.textContent;
    waitlistSubmitBtn.textContent = "Sending...";
    waitlistSubmitBtn.disabled = true;
    waitlistFormNote.textContent = "Sending your request...";
    waitlistFormNote.style.color = "#6B7280";

    const formData = new FormData(waitlistForm);

    try {
      const res = await fetch(waitlistForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        if (typeof window.trackEvent === "function")
          window.trackEvent("conversion", "submit", "waitlist_demo");
        waitlistFormNote.textContent = "✓ Demo requested! We'll be in touch soon to schedule.";
        waitlistFormNote.style.color = "#10B981";

        waitlistForm.reset();
        waitlistSubmitBtn.textContent = originalText;
        waitlistSubmitBtn.disabled = false;

        // Close modal after success
        setTimeout(() => {
          closeWaitlistModal();
        }, 2000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      waitlistFormNote.textContent =
        "Error sending request. Please try again or contact us directly.";
      waitlistFormNote.style.color = "#EF4444";
      waitlistSubmitBtn.textContent = originalText;
      waitlistSubmitBtn.disabled = false;
    }
  });
}

// AI Chat Demo (Integrated into Standalone AI Prompt Box)
const aiChatDemoMessages = document.getElementById("aiChatDemoMessages");
const aiChatDemoInput = document.getElementById("aiChatDemoInput");
const aiChatDemoSend = document.getElementById("aiChatDemoSend");
const aiPromptStandaloneExpanded = document.querySelector(".ai-prompt-standalone-expanded");
const aiPromptStandaloneSubmit = document.querySelector(".ai-prompt-standalone-submit");

const demoConversation = [
  {
    role: "user",
    text: "Hi Marvin, can you show me my deal matches of today?",
  },
  {
    role: "assistant",
    text: "Yes, here are your matches of today.",
  },
  {
    type: "deal-cards",
    data: [
      {
        rank: 1,
        make: "Toyota",
        model: "iQ",
        year: 2010,
        price: "€5,600",
        marginPotential: "38%",
        rotationDays: "42 days",
      },
      {
        rank: 2,
        make: "Opel",
        model: "Astra",
        year: 2011,
        price: "€5,800",
        marginPotential: "59%",
        rotationDays: "28 days",
      },
      {
        rank: 3,
        make: "Daihatsu",
        model: "Terios",
        year: 2007,
        price: "€6,950",
        marginPotential: "32%",
        rotationDays: "15 days",
      },
      {
        rank: 4,
        make: "Volkswagen",
        model: "Golf",
        year: 2012,
        price: "€8,200",
        marginPotential: "45%",
        rotationDays: "35 days",
      },
      {
        rank: 5,
        make: "Ford",
        model: "Focus",
        year: 2013,
        price: "€7,500",
        marginPotential: "41%",
        rotationDays: "22 days",
      },
      {
        rank: 6,
        make: "BMW",
        model: "1 Series",
        year: 2014,
        price: "€12,800",
        marginPotential: "52%",
        rotationDays: "18 days",
      },
    ],
  },
  {
    role: "user",
    text: "Can you show me the top 3 with the highest rotation days?",
  },
  {
    role: "assistant",
    text: "Yes, here are the top 3 with the highest rotation days.",
  },
  {
    type: "rotation-cards",
    data: [
      {
        rank: 1,
        title: "Toyota iQ (2010)",
        rotationDays: "42 days",
        price: "€5,600",
        marginPotential: "38%",
      },
      {
        rank: 2,
        title: "Opel Astra (2011)",
        rotationDays: "28 days",
        price: "€5,800",
        marginPotential: "59%",
      },
      {
        rank: 3,
        title: "Daihatsu Terios (2007)",
        rotationDays: "15 days",
        price: "€6,950",
        marginPotential: "32%",
      },
    ],
  },
  {
    role: "user",
    text: "Which one has the highest margin potential?",
  },
  {
    role: "assistant",
    text: "The Opel Astra (2011) - 59% margin potential, €5,800, 28 days rotation. Best option from the top 3.",
  },
  {
    role: "user",
    text: "Super, open that second one and let me contact the seller.",
  },
  {
    role: "assistant",
    text: "Opening the second one now.",
  },
  {
    type: "deal-card",
    data: {
      rank: 2,
      make: "Opel",
      model: "Astra",
      year: 2011,
      price: "€5,800",
      marginPotential: "59%",
      rotationDays: "28 days",
      phoneNumber: "+31612345678",
    },
  },
];

let isDemoPlaying = false;
let demoTimeout = null;
let demoMessageIndex = 0;
let hasDemoPlayed = false;
let isTypingQuestion = false;

// Function to scroll to bottom of messages
function scrollToBottom() {
  if (aiChatDemoMessages) {
    // Use requestAnimationFrame to ensure DOM updates are complete
    requestAnimationFrame(() => {
      aiChatDemoMessages.scrollTop = aiChatDemoMessages.scrollHeight;
    });
  }
}

// Function to format text with lists, line breaks, etc.
function formatMessageText(text) {
  if (!text) return "";

  // Split by newlines
  const lines = text.split("\n");
  let html = "";
  let inList = false;
  let listItems = [];
  let listType = null; // 'ul' or 'ol'

  function closeList() {
    if (inList && listItems.length > 0) {
      const tag = listType === "ol" ? "ol" : "ul";
      html += `<${tag} class="chat-message-list">`;
      listItems.forEach((item) => {
        html += `<li>${item}</li>`;
      });
      html += `</${tag}>`;
      listItems = [];
    }
    inList = false;
    listType = null;
  }

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Check if it's a bullet point
    const bulletMatch = trimmed.match(/^[•\-\*]\s+(.+)$/);
    // Check if it's a numbered list item
    const numberedMatch = trimmed.match(/^(\d+)[\.\)]\s+(.+)$/);

    if (bulletMatch) {
      // Start or continue unordered list
      if (!inList || listType !== "ul") {
        closeList();
        inList = true;
        listType = "ul";
      }
      listItems.push(escapeHtml(bulletMatch[1]));
    } else if (numberedMatch) {
      // Start or continue ordered list
      if (!inList || listType !== "ol") {
        closeList();
        inList = true;
        listType = "ol";
      }
      listItems.push(escapeHtml(numberedMatch[2]));
    } else if (trimmed === "") {
      // Empty line - close list if open, add paragraph break
      closeList();
      if (index < lines.length - 1) {
        html += "<br>";
      }
    } else {
      // Regular text line
      closeList();
      html += `<p class="chat-message-text">${escapeHtml(trimmed)}</p>`;
    }
  });

  // Close any open list at the end
  closeList();

  return html || '<p class="chat-message-text">' + escapeHtml(text) + "</p>";
}

// Function to escape HTML
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Function to add message to chat
function addMessage(role, text, isTyping = false) {
  if (!aiChatDemoMessages) return null;

  if (isTyping) {
    const typingIndicator = document.createElement("div");
    typingIndicator.className = "typing-indicator";
    typingIndicator.innerHTML = "<span></span><span></span><span></span>";
    aiChatDemoMessages.appendChild(typingIndicator);
    scrollToBottom();
    return typingIndicator;
  } else {
    const messageDiv = document.createElement("div");
    messageDiv.className = `chat-message ${role}-message`;
    messageDiv.innerHTML = formatMessageText(text);
    aiChatDemoMessages.appendChild(messageDiv);
    scrollToBottom();
    return messageDiv;
  }
}

function addDealCardMessage(data) {
  if (!aiChatDemoMessages) return null;

  const card = document.createElement("div");
  card.className = "chat-message assistant-message ai-chat-deal-card";
  card.innerHTML = `
        <div class="ai-chat-deal-card-header">
            <span class="ai-chat-deal-badge">Selected match</span>
            <span class="ai-chat-deal-rank">#${data.rank}</span>
        </div>
        <div class="ai-chat-deal-title">${data.year} ${data.make} ${data.model}</div>
        <div class="ai-chat-deal-grid">
            <div class="ai-chat-deal-item">
                <span class="ai-chat-deal-label">Price</span>
                <span class="ai-chat-deal-value">${data.price}</span>
            </div>
            <div class="ai-chat-deal-item">
                <span class="ai-chat-deal-label">Margin potential</span>
                <span class="ai-chat-deal-value is-positive">${data.marginPotential}</span>
            </div>
            <div class="ai-chat-deal-item">
                <span class="ai-chat-deal-label">Rotation days</span>
                <span class="ai-chat-deal-value">${data.rotationDays}</span>
            </div>
        </div>
        <div class="ai-chat-deal-actions">
            <div class="ai-chat-deal-actions-row">
                <button class="ai-chat-call-button" type="button" data-phone="${data.phoneNumber}">
                    <i data-lucide="phone" class="ai-chat-button-icon"></i>
                    <span>Call seller</span>
                </button>
                <button class="ai-chat-negotiate-button" type="button" data-deal-id="${data.rank}">
                    <i data-lucide="sparkles" class="ai-chat-button-icon"></i>
                    <span>Negotiate for me</span>
                </button>
            </div>
            <div class="ai-chat-call-status" aria-live="polite">
                <span class="ai-chat-call-spinner" aria-hidden="true"></span>
                <span class="ai-chat-call-status-text">Calling seller...</span>
            </div>
            <div class="ai-chat-call-confirm" aria-hidden="true">
                <div class="ai-chat-call-confirm-text">Call the seller now?</div>
                <div class="ai-chat-call-confirm-actions">
                    <button class="ai-chat-call-confirm-button" type="button" data-phone="${data.phoneNumber}">Call now</button>
                    <button class="ai-chat-call-cancel-button" type="button">Cancel</button>
                </div>
            </div>
            <div class="ai-chat-negotiate-status" aria-live="polite">
                <span class="ai-chat-negotiate-spinner" aria-hidden="true"></span>
                <span class="ai-chat-negotiate-text">Starting negotiation...</span>
            </div>
            <div class="ai-chat-negotiate-messages" aria-hidden="true">
                <!-- Negotiation messages will be added here -->
            </div>
        </div>
    `;

  aiChatDemoMessages.appendChild(card);
  scrollToBottom();

  // Initialize Lucide icons for the new card
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  return card;
}

function addRotationCards(cards) {
  if (!aiChatDemoMessages) return null;

  const wrapper = document.createElement("div");
  wrapper.className = "chat-message assistant-message ai-chat-rotation-cards";

  const cardsHtml = cards
    .map(
      (card) => `
        <div class="ai-rotation-card">
            <div class="ai-rotation-card-title">${card.rank}. ${card.title}</div>
            <div class="ai-rotation-card-rows">
                <div class="ai-rotation-card-row">
                    <span class="ai-rotation-card-label">Rotation</span>
                    <span class="ai-rotation-card-value">${card.rotationDays}</span>
                </div>
                <div class="ai-rotation-card-row">
                    <span class="ai-rotation-card-label">Price</span>
                    <span class="ai-rotation-card-value">${card.price}</span>
                </div>
                <div class="ai-rotation-card-row">
                    <span class="ai-rotation-card-label">Margin potential</span>
                    <span class="ai-rotation-card-value is-positive">${card.marginPotential}</span>
                </div>
            </div>
        </div>
    `,
    )
    .join("");

  wrapper.innerHTML = `
        <div class="ai-rotation-cards-grid">
            ${cardsHtml}
        </div>
    `;

  aiChatDemoMessages.appendChild(wrapper);
  scrollToBottom();
  return wrapper;
}

function addDealCards(cards) {
  if (!aiChatDemoMessages) return null;

  const wrapper = document.createElement("div");
  wrapper.className = "chat-message assistant-message ai-chat-rotation-cards";

  const cardsHtml = cards
    .map(
      (card) => `
        <div class="ai-rotation-card">
            <div class="ai-rotation-card-title">${card.rank}. ${card.year} ${card.make} ${card.model}</div>
            <div class="ai-rotation-card-rows">
                <div class="ai-rotation-card-row">
                    <span class="ai-rotation-card-label">Price</span>
                    <span class="ai-rotation-card-value">${card.price}</span>
                </div>
                <div class="ai-rotation-card-row">
                    <span class="ai-rotation-card-label">Margin potential</span>
                    <span class="ai-rotation-card-value is-positive">${card.marginPotential}</span>
                </div>
                <div class="ai-rotation-card-row">
                    <span class="ai-rotation-card-label">Rotation</span>
                    <span class="ai-rotation-card-value">${card.rotationDays}</span>
                </div>
            </div>
        </div>
    `,
    )
    .join("");

  wrapper.innerHTML = `
        <div class="ai-rotation-cards-grid">
            ${cardsHtml}
        </div>
    `;

  aiChatDemoMessages.appendChild(wrapper);
  scrollToBottom();
  return wrapper;
}

// Function to type out message character by character (with formatting)
function typeMessage(element, text, speed = 5) {
  return new Promise((resolve) => {
    let index = 0;
    element.innerHTML = "";

    const typeInterval = setInterval(() => {
      if (index < text.length && isDemoPlaying) {
        const partialText = text.substring(0, index + 1);
        element.innerHTML = formatMessageText(partialText);
        index++;
        scrollToBottom();
      } else {
        clearInterval(typeInterval);
        // Ensure final formatting is applied
        element.innerHTML = formatMessageText(text);
        resolve();
      }
    }, speed);
  });
}

// Function to type question into input field
async function typeQuestionIntoInput(question) {
  if (!aiPromptStandaloneInput) return;

  isTypingQuestion = true;
  // Stop any existing carousel
  if (typingIntervalStandalone) {
    clearInterval(typingIntervalStandalone);
    typingIntervalStandalone = null;
  }
  if (carouselTimeoutStandalone) {
    clearTimeout(carouselTimeoutStandalone);
    carouselTimeoutStandalone = null;
  }
  isCarouselActiveStandalone = false;

  // Clear input
  aiPromptStandaloneInput.value = "";
  aiPromptStandaloneInput.placeholder = "";

  // Type the question character by character
  return new Promise((resolve) => {
    let index = 0;
    const typingSpeed = 40;

    const typeInterval = setInterval(() => {
      if (index < question.length && isTypingQuestion) {
        aiPromptStandaloneInput.value = question.substring(0, index + 1);
        index++;
      } else {
        clearInterval(typeInterval);
        isTypingQuestion = false;
        resolve();
      }
    }, typingSpeed);
  });
}

// Function to simulate submitting the question
async function submitQuestion() {
  if (!aiPromptStandaloneInput || !aiPromptStandaloneSubmit) return;

  const question = aiPromptStandaloneInput.value.trim();
  if (!question) return;

  // Add visual feedback to submit button
  aiPromptStandaloneSubmit.style.transform = "scale(0.95)";
  await new Promise((resolve) => setTimeout(resolve, 150));
  aiPromptStandaloneSubmit.style.transform = "";

  // Clear input and show it was sent
  aiPromptStandaloneInput.value = "";
  aiPromptStandaloneInput.placeholder = "Ask Marvin anything...";

  // Small delay before showing in chat
  await new Promise((resolve) => setTimeout(resolve, 300));
}

// Function to start demo conversation
async function startDemoConversation() {
  if (isDemoPlaying || hasDemoPlayed) return;

  // Check if expanded section is visible
  if (
    !aiPromptStandaloneExpanded ||
    window.getComputedStyle(aiPromptStandaloneExpanded).opacity === "0" ||
    window.getComputedStyle(aiPromptStandaloneExpanded).visibility === "hidden"
  ) {
    return;
  }

  isDemoPlaying = true;
  hasDemoPlayed = true;
  demoMessageIndex = 0;

  // Clear previous messages
  if (aiChatDemoMessages) {
    aiChatDemoMessages.innerHTML = "";
  }

  // Step 1: Type the first question into the input field
  const firstQuestion = demoConversation[0].text;
  await typeQuestionIntoInput(firstQuestion);

  // Step 2: Wait a moment, then "submit" it
  await new Promise((resolve) => setTimeout(resolve, 800));
  await submitQuestion();

  // Step 3: Show the question in the chat
  addMessage("user", firstQuestion);
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Step 4: Start the conversation from the first assistant response
  for (let i = 1; i < demoConversation.length; i++) {
    // Check if still visible
    if (
      !aiPromptStandaloneExpanded ||
      window.getComputedStyle(aiPromptStandaloneExpanded).opacity === "0"
    ) {
      break;
    }

    if (!isDemoPlaying) break;

    const message = demoConversation[i];

    if (message.type === "rotation-cards") {
      addRotationCards(message.data);
      await new Promise((resolve) => setTimeout(resolve, 1200));
    } else if (message.type === "deal-cards") {
      addDealCards(message.data);
      await new Promise((resolve) => setTimeout(resolve, 1200));
    } else if (message.type === "deal-card") {
      addDealCardMessage(message.data);
      await new Promise((resolve) => setTimeout(resolve, 1200));
    } else if (message.role === "user") {
      // User messages appear instantly
      addMessage("user", message.text);
      // No delay after user message - AI responds immediately
    } else {
      // Assistant messages show typing indicator first
      const typingIndicator = addMessage("assistant", "", true);

      // Show typing for 200-400ms (much faster!)
      const typingDelay = 200 + Math.random() * 200;
      await new Promise((resolve) => {
        demoTimeout = setTimeout(resolve, typingDelay);
      });

      if (!isDemoPlaying) break;

      // Remove typing indicator
      typingIndicator.remove();

      // Add message and type it out very fast (5ms per character)
      const messageElement = addMessage("assistant", "");
      await typeMessage(messageElement, message.text, 12);

      // Wait 1-3 seconds after AI reply so user can read before next user message
      const readDelay = 2000 + Math.random() * 2000; // 1-3 seconds
      await new Promise((resolve) => setTimeout(resolve, readDelay));
    }
  }

  // Demo finished
  if (
    isDemoPlaying &&
    aiPromptStandaloneExpanded &&
    window.getComputedStyle(aiPromptStandaloneExpanded).opacity !== "0"
  ) {
    isDemoPlaying = false;
  }
}

let hasStandaloneOpened = false;

// Watch for standalone box expansion on scroll
if (aiPromptStandaloneBox && aiPromptStandaloneExpanded) {
  // Function to check if expanded and start demo
  function checkAndStartDemo() {
    const expanded = document.querySelector(".ai-prompt-standalone-expanded");
    if (
      expanded &&
      window.getComputedStyle(expanded).opacity !== "0" &&
      window.getComputedStyle(expanded).visibility !== "hidden" &&
      !hasDemoPlayed
    ) {
      // Check if the current input value matches the demo conversation trigger question
      const triggerQuestion = demoConversation[0].text;
      const currentInputValue = aiPromptStandaloneInput ? aiPromptStandaloneInput.value.trim() : "";

      // Only start demo if the trigger question is currently shown or input is empty
      // The demo will type the trigger question anyway, so empty is fine
      if (currentInputValue === triggerQuestion || currentInputValue === "") {
        // Stop the carousel if it's running
        if (typingIntervalStandalone) {
          clearInterval(typingIntervalStandalone);
          typingIntervalStandalone = null;
        }
        if (carouselTimeoutStandalone) {
          clearTimeout(carouselTimeoutStandalone);
          carouselTimeoutStandalone = null;
        }
        isCarouselActiveStandalone = false;

        // Wait for expansion animation, then start demo
        setTimeout(() => {
          startDemoConversation();
        }, 600);
      }
      // If another question is shown, don't start the demo
      // User can wait for the carousel to cycle to the trigger question
    }
  }

  function openStandalonePrompt() {
    if (hasStandaloneOpened) return;
    hasStandaloneOpened = true;
    aiPromptStandaloneBox.classList.add("is-open");
    if (startStandaloneCarousel) {
      startStandaloneCarousel();
    }
    hasDemoPlayed = false;
    isTypingQuestion = false;
    // Wait a bit for the expansion to start
    setTimeout(() => {
      checkAndStartDemo();
    }, 400);
  }

  if ("IntersectionObserver" in window) {
    const aiPromptObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            openStandalonePrompt();
            aiPromptObserver.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );
    aiPromptObserver.observe(aiPromptStandaloneBox);
  } else {
    openStandalonePrompt();
  }
}

if (aiChatDemoMessages) {
  aiChatDemoMessages.addEventListener("click", (event) => {
    const callButton = event.target.closest(".ai-chat-call-button");
    if (callButton) {
      const card = callButton.closest(".ai-chat-deal-card");
      if (card) {
        // Prevent calling if already negotiating
        if (card.classList.contains("is-negotiating")) {
          return;
        }
        card.classList.add("is-confirming");
        const confirmPanel = card.querySelector(".ai-chat-call-confirm");
        if (confirmPanel) {
          confirmPanel.setAttribute("aria-hidden", "false");
        }
      }
      return;
    }

    const confirmButton = event.target.closest(".ai-chat-call-confirm-button");
    if (confirmButton) {
      const card = confirmButton.closest(".ai-chat-deal-card");
      if (card) {
        // Prevent calling if already negotiating
        if (card.classList.contains("is-negotiating")) {
          return;
        }
        card.classList.remove("is-confirming");
        card.classList.add("is-calling");
        startCallFlow(card);
      }
      return;
    }

    const cancelButton = event.target.closest(".ai-chat-call-cancel-button");
    if (cancelButton) {
      const card = cancelButton.closest(".ai-chat-deal-card");
      if (card) {
        card.classList.remove("is-confirming");
        const confirmPanel = card.querySelector(".ai-chat-call-confirm");
        if (confirmPanel) {
          confirmPanel.setAttribute("aria-hidden", "true");
        }
      }
      return;
    }

    const negotiateButton = event.target.closest(".ai-chat-negotiate-button");
    if (negotiateButton) {
      const card = negotiateButton.closest(".ai-chat-deal-card");
      if (card && !card.classList.contains("is-negotiating")) {
        // Prevent negotiating if already calling or confirming call
        if (card.classList.contains("is-calling") || card.classList.contains("is-confirming")) {
          return;
        }
        startNegotiationFlow(card);
      }
      return;
    }
  });
}

// Negotiation flow function
function startNegotiationFlow(card) {
  if (!card) return;

  // Mark card as negotiating
  card.classList.add("is-negotiating");

  const statusElement = card.querySelector(".ai-chat-negotiate-status");
  const messagesContainer = card.querySelector(".ai-chat-negotiate-messages");
  const negotiateText = card.querySelector(".ai-chat-negotiate-text");

  if (!statusElement || !messagesContainer || !negotiateText) return;

  // Show status
  statusElement.setAttribute("aria-hidden", "false");
  messagesContainer.setAttribute("aria-hidden", "false");

  // Get the actual price from the card to make negotiation realistic
  const priceElement = card.querySelector(".ai-chat-deal-value");
  const listedPrice = priceElement ? priceElement.textContent.replace(/[€,]/g, "") : "5800";
  const listedPriceNum = parseInt(listedPrice) || 5800;

  // Calculate realistic negotiation prices based on listed price
  const initialOffer = Math.round(listedPriceNum * 0.83); // ~17% below asking
  const sellerCounter = Math.round(listedPriceNum * 0.95); // ~5% below asking
  const aiCounter = Math.round(listedPriceNum * 0.9); // ~10% below asking
  const finalPrice = Math.round(listedPriceNum * 0.91); // ~9% below asking

  // Negotiation messages sequence
  const negotiationSteps = [
    { delay: 500, text: "Starting negotiation...", type: "status" },
    { delay: 1500, text: "Analyzing market data...", type: "status" },
    { delay: 2500, text: "Preparing offer...", type: "status" },
    {
      delay: 3500,
      text: `VEIQ AI: "Hello, I'm negotiating on behalf of my client. Based on current market data, I'd like to offer €${initialOffer.toLocaleString("nl-NL")} for this vehicle."`,
      type: "ai",
    },
    {
      delay: 5500,
      text: `Seller: "That's lower than asking price. Can you do €${sellerCounter.toLocaleString("nl-NL")}?"`,
      type: "seller",
    },
    {
      delay: 7500,
      text: `VEIQ AI: "I understand. However, similar vehicles in your area are selling for €${(listedPriceNum * 0.85).toLocaleString("nl-NL")}-€${(listedPriceNum * 0.92).toLocaleString("nl-NL")}. I can offer €${aiCounter.toLocaleString("nl-NL")}, which is fair given the market conditions."`,
      type: "ai",
    },
    {
      delay: 9500,
      text: `Seller: "Let me think... €${finalPrice.toLocaleString("nl-NL")} and we have a deal."`,
      type: "seller",
    },
    {
      delay: 11500,
      text: `VEIQ AI: "Agreed. €${finalPrice.toLocaleString("nl-NL")} it is. I'll send the contract details."`,
      type: "ai",
    },
    { delay: 13500, text: "Negotiation completed successfully!", type: "success" },
  ];

  let currentStep = 0;
  let lastDelay = 0;

  function showNextStep() {
    if (currentStep >= negotiationSteps.length) {
      // Negotiation complete
      negotiateText.textContent = "Negotiation completed!";
      return;
    }

    const step = negotiationSteps[currentStep];
    const stepDelay = step.delay - lastDelay;
    lastDelay = step.delay;

    setTimeout(() => {
      if (step.type === "status") {
        negotiateText.textContent = step.text;
      } else {
        // Add message to messages container
        const messageDiv = document.createElement("div");
        messageDiv.className = `ai-chat-negotiate-message is-${step.type}`;

        // Extract the message text
        let messageText = step.text;
        let sender = "";

        if (step.text.startsWith("VEIQ AI: ")) {
          sender = "VEIQ AI";
          messageText = step.text.replace("VEIQ AI: ", "");
        } else if (step.text.startsWith("Seller: ")) {
          sender = "Seller";
          messageText = step.text.replace("Seller: ", "");
        }

        // Add label if there's a sender
        if (sender) {
          const label = document.createElement("div");
          label.style.cssText =
            "font-size: 10px; color: rgba(255,255,255,0.25); margin-bottom: 3px; font-weight: 400; text-transform: uppercase; letter-spacing: 0.5px;";
          label.textContent = sender;
          messageDiv.appendChild(label);
        }

        // Add message content
        const content = document.createElement("div");
        content.textContent = messageText.replace(/^"|"$/g, "");
        messageDiv.appendChild(content);

        messagesContainer.appendChild(messageDiv);

        // Scroll to bottom
        scrollToBottom();
      }

      currentStep++;
      if (currentStep < negotiationSteps.length) {
        showNextStep();
      } else {
        // Final step - hide all verbosity and show success card
        setTimeout(() => {
          // Hide status and messages
          statusElement.style.display = "none";
          messagesContainer.style.display = "none";

          // Create and show success card
          showNegotiationSuccessCard(card);
        }, 1000);
      }
    }, stepDelay);
  }

  showNextStep();
}

// Call flow function
function startCallFlow(card) {
  if (!card) return;

  const statusElement = card.querySelector(".ai-chat-call-status");
  const statusText = statusElement
    ? statusElement.querySelector(".ai-chat-call-status-text")
    : null;

  if (!statusElement || !statusText) return;

  // Show status
  statusElement.setAttribute("aria-hidden", "false");

  // Call progression steps
  const callSteps = [
    { delay: 500, text: "Connecting to seller..." },
    { delay: 2000, text: "Calling seller..." },
    { delay: 4000, text: "Call connected" },
    { delay: 6000, text: "Call in progress..." },
    { delay: 8500, text: "Call completed successfully" },
  ];

  let currentStep = 0;
  let lastDelay = 0;

  function showNextCallStep() {
    if (currentStep >= callSteps.length) {
      // Call complete - show success
      setTimeout(() => {
        showCallSuccessCard(card);
      }, 500);
      return;
    }

    const step = callSteps[currentStep];
    const stepDelay = step.delay - lastDelay;
    lastDelay = step.delay;

    setTimeout(() => {
      if (statusText) {
        statusText.textContent = step.text;
      }

      currentStep++;
      if (currentStep < callSteps.length) {
        showNextCallStep();
      } else {
        // Final step - transition to success
        setTimeout(() => {
          showCallSuccessCard(card);
        }, 1000);
      }
    }, stepDelay);
  }

  showNextCallStep();
}

// Show call success card
function showCallSuccessCard(card) {
  const actionsContainer = card.querySelector(".ai-chat-deal-actions");
  if (!actionsContainer) return;

  // Hide status
  const statusElement = card.querySelector(".ai-chat-call-status");
  if (statusElement) {
    statusElement.style.display = "none";
  }

  // Mark as call completed
  card.classList.remove("is-calling");
  card.classList.add("is-call-completed");

  // Create success card
  const successCard = document.createElement("div");
  successCard.className = "ai-chat-call-success";
  successCard.innerHTML = `
        <div class="ai-chat-call-success-content">
            <div class="ai-chat-call-success-icon">
                <i data-lucide="phone-call" class="call-success-icon-lucide"></i>
            </div>
            <div class="ai-chat-call-success-text">
                <div class="ai-chat-call-success-title">Call Completed</div>
                <div class="ai-chat-call-success-details">You've successfully connected with the seller</div>
            </div>
        </div>
    `;

  // Insert success card
  actionsContainer.appendChild(successCard);

  // Initialize Lucide icon
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Animate in
  requestAnimationFrame(() => {
    successCard.style.opacity = "0";
    successCard.style.transform = "translateY(8px)";
    successCard.style.transition = "opacity 0.4s ease-out, transform 0.4s ease-out";

    requestAnimationFrame(() => {
      successCard.style.opacity = "1";
      successCard.style.transform = "translateY(0)";
    });
  });

  // Scroll to bottom
  scrollToBottom();
}

// Show negotiation success card
function showNegotiationSuccessCard(card) {
  const actionsContainer = card.querySelector(".ai-chat-deal-actions");
  if (!actionsContainer) return;

  // Get the final negotiated price from the last message or calculate it
  const priceElement = card.querySelector(".ai-chat-deal-value");
  const listedPrice = priceElement ? priceElement.textContent.replace(/[€,]/g, "") : "5800";
  const listedPriceNum = parseInt(listedPrice) || 5800;
  const finalPrice = Math.round(listedPriceNum * 0.91); // ~9% below asking

  // Create success card
  const successCard = document.createElement("div");
  successCard.className = "ai-chat-negotiate-success";
  successCard.innerHTML = `
        <div class="ai-chat-negotiate-success-content">
            <div class="ai-chat-negotiate-success-icon">
                <i data-lucide="check-circle" class="success-icon-lucide"></i>
            </div>
            <div class="ai-chat-negotiate-success-text">
                <div class="ai-chat-negotiate-success-title">Negotiation Complete</div>
                <div class="ai-chat-negotiate-success-details">Agreed price: €${finalPrice.toLocaleString("nl-NL")}</div>
            </div>
        </div>
    `;

  // Insert success card
  actionsContainer.appendChild(successCard);

  // Initialize Lucide icon
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Animate in
  requestAnimationFrame(() => {
    successCard.style.opacity = "0";
    successCard.style.transform = "translateY(8px)";
    successCard.style.transition = "opacity 0.4s ease-out, transform 0.4s ease-out";

    requestAnimationFrame(() => {
      successCard.style.opacity = "1";
      successCard.style.transform = "translateY(0)";
    });
  });

  // Scroll to bottom
  scrollToBottom();
}

// ============================================
// LANGUAGE TRANSLATION SYSTEM
// ============================================

const translations = {
  en: {
    // Navigation
    "nav.comingSoon": "Coming Soon",
    "nav.features": "Features",
    "nav.story": "Story",
    "nav.about": "About",
    "nav.joinWaitlist": "Request Demo",

    // Hero Section
    "hero.badge": "Early access",
    "hero.headline": "Buy Better Cars. Make More, In Less Time.",
    //'hero.subheadline': 'Clear buy, price, and sell actions. Deals and intel come to you.',
    "hero.subheadline": "The market comes to you.",
    "hero.seeDeals": "Request Demo",
    "hero.statsPreview": "Time saved daily",
    "hero.uspsLabel": "What dealers get",
    "hero.usp1": "No manual searching",
    "hero.usp2": "Minutes, not hours",
    "hero.usp3": "More profit per car",
    "hero.usp4": "Faster selling cars",
    "hero.usp5": "No slow (risky) stock",
    "hero.usp6": "Deals before others",
    "hero.usp1Verbose": "Deals come to you: no more searching",
    "hero.usp2Verbose": "Spend minutes, not hours, finding cars",
    "hero.usp3Verbose": "Make more profit per car",
    "hero.usp4Verbose": "Buy cars that sell faster",
    "hero.usp5Verbose": "Avoid slow and risky stock",
    "hero.usp6Verbose": "Act faster than other dealers",
    "hero.usp1Detail":
      "<p>Stop wasting hours scrolling through listings. VEIQ's AI continuously monitors the market and delivers the best deals directly to you. Get instant notifications when vehicles matching your criteria appear, so you never miss an opportunity.</p>",
    "hero.usp2Detail":
      "<p>What used to take hours of manual research now takes minutes. Our intelligent system analyzes thousands of listings, prices, and market trends in real-time, giving you actionable insights instantly. Focus on closing deals, not searching for them.</p>",
    "hero.usp3Detail":
      "<p>Make smarter buying decisions with real-time market intelligence. See exactly what each vehicle is worth, its profit potential, and how fast it will sell. Buy at the right price and maximize your margins on every transaction.</p>",
    "hero.usp4Detail":
      "<p>Reduce inventory risk by focusing on high-demand vehicles. Our system shows you rotation days, demand signals, and liquidity indicators for every vehicle, helping you build a portfolio that turns over quickly and generates consistent cash flow.</p>",
    "hero.usp5Detail":
      "<p>Identify problematic inventory before you buy. Get clear risk indicators and demand signals for every vehicle, so you can avoid cars that will sit on your lot for months. Protect your capital and maintain healthy inventory turnover.</p>",
    "hero.usp6Detail":
      "<p>Get first access to the best deals with instant alerts delivered via email, SMS, or WhatsApp. When a high-value opportunity appears, you'll know immediately and can act before your competitors even see it. Speed wins in this market.</p>",

    // How VEIQ Works Section
    "howWorks.step1Title": "Real-time market intelligence",
    "howWorks.step1Description":
      "Live prices, supply signals, and risk indicators across marketplaces.",
    "howWorks.step2Title": "AI agents match & rank deals",
    "howWorks.step2Description": "Opportunities are scored by margin, rotation speed, and fit.",
    "howWorks.step3Title": "You act faster, or VEIQ acts for you",
    "howWorks.step3Description": "From alerts to automated negotiation, execution is frictionless.",

    // Legacy hero translations (keeping for backwards compatibility)
    "hero.goingLive": 'We are going live <span style="text-decoration:underline;">very soon</span>',
    "hero.headlineSub": "to",
    "hero.automotive": "automotive trading",
    "hero.descriptionDesktop":
      "Real-time agentic AI for automotive professionals make faster, smarter decisions. See what matters, the moment it matters.",
    "hero.descriptionMobile": "Real-time automotive insights with AI-powered matching.",
    "hero.marketInsights": "Market Insights",
    "hero.vehicleMatching": "Vehicle Matching",
    "hero.smarterDeals": "Smarter Deals",
    "hero.getEarlyAccess": "Request Demo",

    // Features Section
    "features.title": "Daily Actionable Insights, Real-time Data",
    "features.subtitle": "Real intelligence. No guesswork.",
    "features.realTimeIntelligence": "Real-Time Vehicle Intelligence",
    "features.realTimeIntelligenceDesc":
      "See exactly what each vehicle is worth, how fast it sells and how much margin it can deliver, instantly.",
    "features.smartMatching": "Smart Matching for Dealers",
    "features.smartMatchingDesc":
      "AI finds the right vehicles for your needs, based on your criteria, margins, customer requests and stock strategy.",
    "features.dailyOpportunities": "Daily High-Value Opportunities",
    "features.dailyOpportunitiesDesc":
      "Live opportunities from C2B, B2B and salvage markets, filtered and ranked so you only see what matters.",
    "features.riskIndicators": "Clear Risk & Demand Indicators",
    "features.riskIndicatorsDesc":
      "Simple 0–100 risk and demand signals for every notified deal. No guesswork, no noise.",
    "features.instantAlerts": "Instant Alerts, Faster Action",
    "features.instantAlertsDesc":
      "Email, SMS or WhatsApp notifications the moment a strong opportunity appears. Act before others see it.",
    "features.aiSupport": "AI Support, Human Control",
    "features.aiSupportDesc":
      "VEIQ AI gives the intelligence; you stay in control. Smarter decisions, faster workflow, zero complexity.",

    // About Section
    "about.title": "About",
    "about.heroTitle": "A New Intelligence Layer for Europe's Automotive Market",
    "about.text1":
      "The automotive ecosystem is becoming more complex, fast-changing and fragmented. Dealers, traders, leasing companies and mobility operators are forced to make high-impact decisions with incomplete information, outdated tools and overwhelming noise.",
    "about.text2":
      "VEIQ brings clarity through real-time market intelligence and smart AI-matching, giving mobility professionals the ability to see what truly matters, the moment it matters.",
    "about.mission":
      "<strong>Our mission:</strong> To empower the mobility industry with intelligence that makes every deal smarter.",

    // Team Section
    "team.title": "Team",
    "team.ceo": "Founder & CEO",
    "team.cfo": "Founder & CFO",
    "team.cto": "Founder & CTO",
    "team.commercialLead": "Commercial Lead",
    "team.uxLead": "UX Lead",
    "team.linkedin": "LinkedIn →",
    "team.arvin.bio1":
      "Serial entrepreneur with 12+ years of experience across automotive, mobility trading, e-commerce, re-commerce, and technology platforms.",
    "team.arvin.bio2":
      "Arvin has spent his career close to the market, working with vehicle inventory, pricing, sourcing, and digital trading flows. He combines hands-on operational experience with a strong understanding of how technology can simplify complex decisions in mobility and trade.",
    "team.arvin.bio3":
      "His work focuses on bridging real dealer challenges with scalable digital systems, grounded in execution rather than theory.",
    "team.christian.bio1":
      "Background in building and scaling tech companies across finance, SaaS, and platform businesses.",
    "team.christian.bio2":
      "Christian has worked closely with founders and leadership teams on financial strategy, fundraising, and scale-up operations. His experience spans complex transactional models and high-growth environments, where solid financial architecture and operational discipline are critical.",
    "team.christian.bio3":
      "He focuses on creating financial structures that support long-term execution, clarity, and controlled growth from the start.",
    "team.marc.bio1":
      "Background in software engineering, data, and applied AI, with experience across investing and technology-driven companies.",
    "team.marc.bio2":
      "Marc has worked hands-on with complex datasets, building data systems and intelligence layers that support real operational decisions. With a foundation in Physics and applied AI, he brings a structured, analytical approach to product and system design.",
    "team.marc.bio3":
      "His focus is on turning raw data into clear, usable insights that teams can actually act on.",
    "team.machiel.bio1":
      "Over a decade of leadership experience across digital platforms and large-scale e-commerce environments.",
    "team.machiel.bio2":
      "Machiel has led and scaled complex organizations, including serving as CEO of a high-growth marketplace business and holding senior roles within major consumer and retail platforms. His background spans building marketplace operations, driving platform growth, and managing large multidisciplinary teams.",
    "team.machiel.bio3":
      "His focus is on execution, organizational clarity, and turning strategy into scalable, repeatable operations.",
    "team.jingwei.bio1":
      "Background in product, service design, and user-centered system development.",
    "team.jingwei.bio2":
      "Jingwei has worked on designing and shaping digital platforms where complexity needs to be translated into clarity for end users. With a foundation in interaction design, he focuses on how people actually use systems in practice, not how they look on paper.",
    "team.jingwei.bio3":
      "His work centers on making complex workflows intuitive, accessible, and immediately useful.",

    // Footer
    "footer.tagline": "Bringing agentic AI",
    "footer.taglineSub": "to automotive trading",
    "footer.productCompany": "Product / Company",
    "footer.followUs": "Follow Us",
    "footer.copyright": "© 2026 VEIQ. All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Services",
    "footer.imprint": "Imprint",

    // Request Demo Modal
    "waitlist.title": "Request Demo",
    "waitlist.description": "Get a personalized demo of VEIQ's AI-powered automotive intelligence.",
    "waitlist.company": "Company Name",
    "waitlist.companyPlaceholder": "Your Company Name",
    "waitlist.email": "Email Address",
    "waitlist.emailPlaceholder": "your.email@company.com",
    "waitlist.phone": "Phone Number",
    "waitlist.phonePlaceholder": "+31 6 12 34 56 78",
    "waitlist.submit": "Request Demo",
    "waitlist.note":
      "We'll never share your details. We'll be in touch soon to schedule your demo.",

    // AI Prompt
    "ai.placeholder": "Ask Marvin anything...",
    "ai.inputPlaceholder": "Ask anything...",

    // Dashboard
    "dashboard.activeFilters": "ACTIVE FILTERS:",
    "dashboard.agents": "Agents",
    "dashboard.askAI": "Ask Marvin",

    // Mobile Menu
    "nav.home": "Home",

    // Coming Soon Page
    "comingSoon.tagline": "AI-driven automotive data platform",
    "comingSoon.headline": "We're building something powerful.",
    "comingSoon.subheadline":
      "Our platform is under construction. Stay tuned for the future of mobility.",
    "comingSoon.inDevelopment": "In Development",
    "comingSoon.emailPlaceholder": "Enter your email",
    "comingSoon.notifyMe": "Notify Me",
    "comingSoon.disclaimer": "Be the first to know when we launch.",

    // Before / After Section
    "beforeAfter.title": "From problem to solution",
    "beforeAfter.tooltip1Mini": "Manual searching, guessing, wasting time.",
    "beforeAfter.tooltip1Full":
      "Manual searching, guessing, wasting time, missing good deals. Dealers struggle with scattered listings across multiple marketplaces, no clear ranking, and decision overload.",
    "beforeAfter.tooltip2Mini": "AI ranks the best deals automatically.",
    "beforeAfter.tooltip2Full":
      "AI ranks the best deals automatically. Action-ready clarity with one ranked list of vehicle opportunities, each deal clearly scored by margin, rotation speed, and fit.",
    "beforeAfter.tooltip3Mini": "VEIQ's intelligent platform transforms automotive trading.",
    "beforeAfter.tooltip3Full":
      "VEIQ's intelligent platform delivers real-time market intelligence and automated execution, transforming how dealers source and acquire vehicles.",
  },
  nl: {
    // Navigation
    "nav.comingSoon": "Binnenkort",
    "nav.features": "Functies",
    "nav.story": "Verhaal",
    "nav.about": "Over",
    "nav.joinWaitlist": "Demo aanvragen",

    // Hero Section
    "hero.badge": "Vroege toegang",
    "hero.headline": "Koop Betere Auto's. Verdien Meer, In Minder Tijd.",
    //'hero.subheadline': 'Duidelijke koop-, prijs- en verkoopacties. Deals en informatie komen naar jou toe.',
    "hero.subheadline": "De markt komt naar jou toe.",
    "hero.seeDeals": "Krijg vroege toegang",
    "hero.statsPreview": "Tijd bespaard dagelijks",
    "hero.uspsLabel": "Wat dealers krijgen",
    "hero.usp1": "Niets handmatig",
    "hero.usp2": "Minuten, geen uren",
    "hero.usp3": "Meer winst per auto",
    "hero.usp4": "Snel lopende auto's",
    "hero.usp5": "Geen trage voorraad",
    "hero.usp6": "Deals vóór anderen",
    "hero.usp1Verbose": "Deals komen naar jou toe: geen zoeken meer",
    "hero.usp2Verbose": "Besteed minuten, niet uren, met het vinden van auto's",
    "hero.usp3Verbose": "Maak meer winst per auto",
    "hero.usp4Verbose": "Koop auto's die sneller verkopen",
    "hero.usp5Verbose": "Vermijd trage en risicovolle voorraad",
    "hero.usp6Verbose": "Handel sneller dan andere dealers",
    "hero.usp1Detail":
      "<p>Stop met urenlang door advertenties scrollen. De AI van VEIQ monitort continu de markt en levert de beste deals direct aan jou. Ontvang directe meldingen wanneer voertuigen die aan jouw criteria voldoen verschijnen, zodat je nooit een kans mist.</p>",
    "hero.usp2Detail":
      "<p>Wat vroeger uren handmatig onderzoek kostte, kost nu minuten. Ons intelligente systeem analyseert duizenden advertenties, prijzen en markttrends in real-time, waardoor je direct actiegerichte inzichten krijgt. Focus op het sluiten van deals, niet op het zoeken ernaar.</p>",
    "hero.usp3Detail":
      "<p>Maak slimmere koopbeslissingen met real-time marktintelligentie. Zie precies wat elk voertuig waard is, het winstpotentieel en hoe snel het zal verkopen. Koop tegen de juiste prijs en maximaliseer je marges bij elke transactie.</p>",
    "hero.usp4Detail":
      "<p>Verminder voorraadrisico door te focussen op voertuigen met hoge vraag. Ons systeem toont je rotatiedagen, vraagsignalen en liquiditeitsindicatoren voor elk voertuig, waardoor je een portefeuille opbouwt die snel omslaat en consistente cashflow genereert.</p>",
    "hero.usp5Detail":
      "<p>Identificeer problematische voorraad voordat je koopt. Krijg duidelijke risico-indicatoren en vraagsignalen voor elk voertuig, zodat je auto's kunt vermijden die maandenlang op je terrein blijven staan. Bescherm je kapitaal en behoud gezonde voorraadomzet.</p>",
    "hero.usp6Detail":
      "<p>Krijg als eerste toegang tot de beste deals met directe meldingen via e-mail, SMS of WhatsApp. Wanneer een hoogwaardige kans verschijnt, weet je het direct en kun je handelen voordat je concurrenten het zelfs zien. Snelheid wint in deze markt.</p>",

    // How VEIQ Works Section
    "howWorks.step1Title": "Real-time marktintelligentie",
    "howWorks.step1Description":
      "Live prijzen, aanbod signalen en risico-indicatoren over marktplaatsen.",
    "howWorks.step2Title": "AI-agents matchen en rangschikken deals",
    "howWorks.step2Description": "Kansen worden gescoord op marge, rotatiesnelheid en fit.",
    "howWorks.step3Title": "Jij handelt sneller, of VEIQ handelt voor jou",
    "howWorks.step3Description":
      "Van meldingen tot geautomatiseerde onderhandeling, uitvoering is naadloos.",

    // Legacy hero translations (keeping for backwards compatibility)
    "hero.goingLive": 'We gaan live <span style="text-decoration:underline;">binnenkort</span>',
    "hero.headlineSub": "voor",
    "hero.automotive": "automotive trading",
    "hero.descriptionDesktop":
      "Real-time agentic ai voor automotive professionals om snellere, slimmere beslissingen te nemen. Zie wat ertoe doet, op het moment dat het ertoe doet.",
    "hero.descriptionMobile": "Real-time automotive inzichten met AI-gestuurde matching.",
    "hero.marketInsights": "Marktinzichten",
    "hero.vehicleMatching": "Voertuig Matching",
    "hero.smarterDeals": "Slimmere Deals",
    "hero.getEarlyAccess": "Krijg Vroege Toegang",

    // Features Section
    "features.title": "Dagelijkse Actiegerichte Inzichten, Real-time Data",
    "features.subtitle": "Echte intelligentie. Geen giswerk.",
    "features.realTimeIntelligence": "Real-Time Voertuig Intelligentie",
    "features.realTimeIntelligenceDesc":
      "Zie precies wat elk voertuig waard is, hoe snel het verkoopt en welke marge het kan opleveren, direct.",
    "features.smartMatching": "Slimme Matching voor Dealers",
    "features.smartMatchingDesc":
      "AI vindt de juiste voertuigen voor jouw behoeften, gebaseerd op jouw criteria, marges, klantverzoeken en voorraadstrategie.",
    "features.dailyOpportunities": "Dagelijkse Hoogwaardige Kansen",
    "features.dailyOpportunitiesDesc":
      "Live kansen uit C2B, B2B en sloopmarkten, gefilterd en gerangschikt zodat je alleen ziet wat ertoe doet.",
    "features.riskIndicators": "Duidelijke Risico- & Vraagindicatoren",
    "features.riskIndicatorsDesc":
      "Eenvoudige 0–100 risico- en vraagsignalen voor elke gemelde deal. Geen giswerk, geen ruis.",
    "features.instantAlerts": "Directe Waarschuwingen, Snellere Actie",
    "features.instantAlertsDesc":
      "E-mail, SMS of WhatsApp meldingen op het moment dat een sterke kans verschijnt. Handel voordat anderen het zien.",
    "features.aiSupport": "AI Ondersteuning, Menselijke Controle",
    "features.aiSupportDesc":
      "VEIQ AI geeft de intelligentie; jij blijft de controle houden. Slimmere beslissingen, snellere workflow, nul complexiteit.",

    // About Section
    "about.title": "Over",
    "about.heroTitle": "Een Nieuwe Intelligentielaag voor de Europese Automarkt",
    "about.text1":
      "Het automotive ecosysteem wordt complexer, snel veranderend en gefragmenteerd. Dealers, handelaren, leasemaatschappijen en mobiliteitsoperators worden gedwongen om hoog-impact beslissingen te nemen met incomplete informatie, verouderde tools en overweldigende ruis.",
    "about.text2":
      "VEIQ brengt duidelijkheid door real-time marktintelligentie en slimme AI-matching, waardoor mobiliteitsprofessionals de mogelijkheid krijgen om te zien wat er echt toe doet, op het moment dat het ertoe doet.",
    "about.mission":
      "<strong>Onze missie:</strong> De mobiliteitsindustrie empoweren met intelligentie die elke deal slimmer maakt.",

    // Team Section
    "team.title": "Team",
    "team.ceo": "Founder & CEO",
    "team.cfo": "Founder & CFO",
    "team.cto": "Founder & CTO",
    "team.commercialLead": "Commercieel Leider",
    "team.uxLead": "UX Lead",
    "team.linkedin": "LinkedIn →",
    "team.arvin.bio1":
      "Serial entrepreneur met 12+ jaar ervaring in automotive, mobiliteitshandel, e-commerce, re-commerce en technologieplatforms.",
    "team.arvin.bio2":
      "Arvin heeft zijn carrière dicht bij de markt doorgebracht, werkend met voertuiginventaris, prijzen, sourcing en digitale handelsstromen. Hij combineert hands-on operationele ervaring met een sterk begrip van hoe technologie complexe beslissingen in mobiliteit en handel kan vereenvoudigen.",
    "team.arvin.bio3":
      "Zijn werk richt zich op het overbruggen van echte dealeruitdagingen met schaalbare digitale systemen, gegrond in uitvoering in plaats van theorie.",
    "team.christian.bio1":
      "Achtergrond in het bouwen en schalen van techbedrijven in finance, SaaS en platformbedrijven.",
    "team.christian.bio2":
      "Christian heeft nauw samengewerkt met oprichters en leidinggevende teams aan financiële strategie, fundraising en scale-up operaties. Zijn ervaring omvat complexe transactionele modellen en hooggroeiomgevingen, waar solide financiële architectuur en operationele discipline cruciaal zijn.",
    "team.christian.bio3":
      "Hij richt zich op het creëren van financiële structuren die langetermijnuitvoering, duidelijkheid en gecontroleerde groei vanaf het begin ondersteunen.",
    "team.marc.bio1":
      "Achtergrond in software engineering, data en toegepaste AI, met ervaring in investeren en technologiegedreven bedrijven.",
    "team.marc.bio2":
      "Marc heeft hands-on gewerkt met complexe datasets, het bouwen van datasystemen en intelligentielagen die echte operationele beslissingen ondersteunen. Met een fundament in Natuurkunde en toegepaste AI, brengt hij een gestructureerde, analytische aanpak naar product- en systeemontwerp.",
    "team.marc.bio3":
      "Zijn focus ligt op het omzetten van ruwe data naar duidelijke, bruikbare inzichten waar teams daadwerkelijk op kunnen acteren.",
    "team.machiel.bio1":
      "Meer dan een decennium leiderschapservaring in digitale platforms en grootschalige e-commerceomgevingen.",
    "team.machiel.bio2":
      "Machiel heeft complexe organisaties geleid en geschaald, waaronder als CEO van een hooggroei marktplaatsbedrijf en senior rollen binnen grote consumenten- en retailplatforms. Zijn achtergrond omvat het bouwen van marktplaatsoperaties, het stimuleren van platformgroei en het beheren van grote multidisciplinaire teams.",
    "team.machiel.bio3":
      "Zijn focus ligt op uitvoering, organisatorische duidelijkheid en het omzetten van strategie naar schaalbare, herhaalbare operaties.",
    "team.jingwei.bio1":
      "Achtergrond in product, service design en gebruikersgerichte systeemontwikkeling.",
    "team.jingwei.bio2":
      "Jingwei heeft gewerkt aan het ontwerpen en vormgeven van digitale platforms waar complexiteit moet worden vertaald naar duidelijkheid voor eindgebruikers. Met een fundament in interaction design, richt hij zich op hoe mensen systemen daadwerkelijk in de praktijk gebruiken, niet hoe ze er op papier uitzien.",
    "team.jingwei.bio3":
      "Zijn werk richt zich op het intuïtief, toegankelijk en direct bruikbaar maken van complexe workflows.",

    // Footer
    "footer.tagline": "Bringing agentic AI",
    "footer.taglineSub": "to automotive trading",
    "footer.productCompany": "Product / Bedrijf",
    "footer.followUs": "Volg Ons",
    "footer.copyright": "© 2026 VEIQ. Alle rechten voorbehouden.",
    "footer.privacy": "Privacybeleid",
    "footer.terms": "Servicevoorwaarden",
    "footer.imprint": "Colofon",

    // Request Demo Modal
    "waitlist.title": "Demo aanvragen",
    "waitlist.description": "Krijg een persoonlijke demo van VEIQ's AI automotive intelligentie.",
    "waitlist.company": "Bedrijfsnaam",
    "waitlist.companyPlaceholder": "Jouw Bedrijfsnaam",
    "waitlist.email": "E-mailadres",
    "waitlist.emailPlaceholder": "jouw.email@bedrijf.nl",
    "waitlist.phone": "Telefoonnummer",
    "waitlist.phonePlaceholder": "+31 6 12345678",
    "waitlist.submit": "Demo aanvragen",
    "waitlist.note":
      "We delen je gegevens nooit. We nemen binnenkort contact op om je demo in te plannen.",

    // AI Prompt
    "ai.placeholder": "Vraag Marvin alles...",
    "ai.inputPlaceholder": "Vraag alles...",

    // Dashboard
    "dashboard.activeFilters": "ACTIEVE FILTERS:",
    "dashboard.agents": "Agents",
    "dashboard.askAI": "Vraag Marvin",

    // Mobile Menu
    "nav.home": "Home",

    // Coming Soon Page
    "comingSoon.tagline": "AI-gestuurd automotive dataplatform",
    "comingSoon.headline": "We bouwen iets krachtigs.",
    "comingSoon.subheadline":
      "Ons platform is in ontwikkeling. Blijf op de hoogte voor de toekomst van mobiliteit.",
    "comingSoon.inDevelopment": "In Ontwikkeling",
    "comingSoon.emailPlaceholder": "Voer je e-mailadres in",
    "comingSoon.notifyMe": "Houd me op de hoogte",
    "comingSoon.disclaimer": "Wees de eerste die het weet wanneer we lanceren.",

    // Before / After Section
    "beforeAfter.title": "Van probleem naar oplossing",
    "beforeAfter.tooltip1Mini": "Handmatig zoeken, gissen, tijd verspillen.",
    "beforeAfter.tooltip1Full":
      "Handmatig zoeken, gissen, tijd verspillen, goede deals missen. Dealers worstelen met verspreide advertenties over meerdere marktplaatsen, geen duidelijke rangschikking en besluitoverload.",
    "beforeAfter.tooltip2Mini": "AI rangschikt automatisch de beste deals.",
    "beforeAfter.tooltip2Full":
      "AI rangschikt automatisch de beste deals. Actie-klare duidelijkheid met één gerangschikte lijst van voertuigkansen, elke deal duidelijk gescoord op marge, rotatiesnelheid en fit.",
    "beforeAfter.tooltip3Mini": "VEIQ's intelligente platform transformeert automotive trading.",
    "beforeAfter.tooltip3Full":
      "VEIQ's intelligente platform levert real-time marktintelligentie en geautomatiseerde uitvoering, waardoor dealers voertuigen anders vinden en verwerven.",
  },
};

// Get current language from localStorage or default to 'en'
let currentLanguage = localStorage.getItem("language") || "en";

// Function to translate all elements
function translatePage(lang) {
  currentLanguage = lang;
  localStorage.setItem("language", lang);

  // Update HTML lang attribute
  document.documentElement.setAttribute("lang", lang);

  // Update all elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      // Check if element has an icon (for USP items)
      const icon = element.querySelector(".usp-icon");
      const span = element.querySelector("span");

      // Check if it's a detail card (contains paragraph)
      const isDetailCard = element.classList.contains("usp-detail-card");

      if (icon && span && !isDetailCard) {
        // Preserve icon, only update span text
        span.textContent = translations[lang][key];
      } else {
        // Regular translation - replace entire content (for detail cards and other elements)
        element.innerHTML = translations[lang][key];
      }
    }
  });

  // Update all elements with data-i18n-placeholder attribute
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    if (translations[lang] && translations[lang][key]) {
      element.setAttribute("placeholder", translations[lang][key]);
    }
  });

  // Update language toggle button
  const langToggle = document.getElementById("languageToggle");
  if (langToggle) {
    langToggle.setAttribute("data-lang", lang);
    langToggle.setAttribute(
      "title",
      lang === "en"
        ? "Wissel naar Nederlands / Switch to Dutch"
        : "Switch to English / Wissel naar Engels",
    );
  }

  // Update mobile header language toggle if it exists
  const mobileLangToggleHeader = document.getElementById("mobileLanguageToggleHeader");
  if (mobileLangToggleHeader) {
    mobileLangToggleHeader.setAttribute("data-lang", lang);
  }

  // Re-initialize Lucide icons after translation
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

// Initialize language on page load
translatePage(currentLanguage);

// Language toggle handler
const languageToggle = document.getElementById("languageToggle");
if (languageToggle) {
  languageToggle.addEventListener("click", () => {
    const newLang = currentLanguage === "en" ? "nl" : "en";
    translatePage(newLang);
  });
}

// Mobile header language toggle handler
const mobileLanguageToggleHeader = document.getElementById("mobileLanguageToggleHeader");
if (mobileLanguageToggleHeader) {
  mobileLanguageToggleHeader.addEventListener("click", () => {
    const newLang = currentLanguage === "en" ? "nl" : "en";
    translatePage(newLang);
  });
}

// Check if we should open mobile menu from demo page back button
function checkAndOpenMenuFromDemo() {
  const urlParams = new URLSearchParams(window.location.search);

  // Check for features menu
  if (urlParams.get("features") === "open") {
    // Only open on mobile devices
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      (window.innerWidth <= 768 && window.innerHeight <= 1024);

    if (isMobile) {
      // Open menu immediately for fast, app-like feel
      if (!isMobileFeaturesMenuOpen) {
        openMobileFeaturesMenu();
      }

      // Clean up URL parameter without page reload (after menu opens)
      setTimeout(() => {
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }, 50);
    }
  }

  // Check for regular mobile menu (legacy support)
  if (urlParams.get("menu") === "open") {
    // Only open on mobile devices
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      (window.innerWidth <= 768 && window.innerHeight <= 1024);

    if (isMobile && mobileMenuToggle) {
      // Small delay to ensure page is fully loaded
      setTimeout(() => {
        if (!isMenuOpen) {
          openMobileMenu();
        }
      }, 100);

      // Clean up URL parameter without page reload
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }
}

// Mobile Features Menu (from footer)
let isMobileFeaturesMenuOpen = false;
// Footer mobile features toggle removed - now in mobile menu header
const footerMobileFeaturesToggle = null;

function openMobileFeaturesMenu() {
  if (isMobileFeaturesMenuOpen) return;

  isMobileFeaturesMenuOpen = true;
  document.body.style.overflow = "hidden";

  // Check if menu already exists (from pre-render)
  let mobileFeaturesMenu = document.querySelector(".mobile-features-menu");

  if (!mobileFeaturesMenu) {
    // Create mobile features menu overlay
    const currentLang = htmlElement.getAttribute("lang") || "en";
    mobileFeaturesMenu = document.createElement("div");
    mobileFeaturesMenu.className = "mobile-menu mobile-features-menu";
    mobileFeaturesMenu.innerHTML = `
        <div class="mobile-menu-header">
            <button class="dark-mode-toggle mobile-dark-mode-toggle" id="mobileFeaturesDarkModeToggle" aria-label="Toggle dark mode">
                <svg class="dark-mode-icon sun-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
                <svg class="dark-mode-icon moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            </button>
            <button class="mobile-menu-close" aria-label="Close menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
        <div class="mobile-nav">
            <a href="mobile-scan-damage.html" class="mobile-nav-link mobile-demo-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" ry="2"/>
                    <path d="M9 2L7 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2l-2-3H9z"/>
                    <circle cx="12" cy="12" r="3"/>
                </svg>
                <span>Scan Damage</span>
            </a>
            <a href="mobile-generate-ad.html" class="mobile-nav-link mobile-demo-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                </svg>
                <span>Generate Ad</span>
            </a>
            <a href="mobile-valuation.html" class="mobile-nav-link mobile-demo-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                <span>Instant Valuation</span>
            </a>
            <a href="mobile-matching.html" class="mobile-nav-link mobile-demo-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                    <line x1="8" y1="11" x2="14" y2="11"/>
                    <line x1="11" y1="8" x2="11" y2="14"/>
                </svg>
                <span>Smart Matching</span>
            </a>
            <a href="mobile-risk-analyzer.html" class="mobile-nav-link mobile-demo-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="M9 12l2 2 4-4"/>
                </svg>
                <span>Risk Analyzer</span>
            </a>
            <a href="mobile-chat.html" class="mobile-nav-link mobile-demo-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span>Chat VEIQ AI</span>
            </a>
        </div>
    `;
    document.body.appendChild(mobileFeaturesMenu);

    // Add close button event listener
    const closeBtn = mobileFeaturesMenu.querySelector(".mobile-menu-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeMobileFeaturesMenu();
      });
    }

    // Add dark mode toggle event listener
    const mobileDarkModeToggle = mobileFeaturesMenu.querySelector("#mobileFeaturesDarkModeToggle");
    if (mobileDarkModeToggle) {
      mobileDarkModeToggle.addEventListener("click", () => {
        const currentTheme = htmlElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        localStorage.setItem("theme-manual-override", "true");
      });
    }

    // Close menu when clicking on navigation links
    const links = mobileFeaturesMenu.querySelectorAll(".mobile-nav-link");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        setTimeout(() => {
          closeMobileFeaturesMenu();
        }, 300);
      });
    });

    // Animate menu in - smooth app-like entrance
    mobileFeaturesMenu.style.opacity = "0";
    mobileFeaturesMenu.style.transform = "translateX(100%)";
    mobileFeaturesMenu.style.willChange = "opacity, transform";

    // Use double requestAnimationFrame for smoother animation start
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        mobileFeaturesMenu.classList.add("active");
        // Force reflow for smooth animation
        mobileFeaturesMenu.offsetHeight;
        // Smooth slide in with cubic-bezier easing - fast for app-like feel
        mobileFeaturesMenu.style.transition =
          "opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)";
        mobileFeaturesMenu.style.opacity = "1";
        mobileFeaturesMenu.style.transform = "translateX(0)";

        // Clean up will-change after animation
        setTimeout(() => {
          mobileFeaturesMenu.style.willChange = "auto";
        }, 300);
      });
    });
  }
}

function closeMobileFeaturesMenu() {
  if (!isMobileFeaturesMenuOpen) return;

  isMobileFeaturesMenuOpen = false;

  const mobileFeaturesMenu = document.querySelector(".mobile-features-menu");
  if (mobileFeaturesMenu) {
    // Smooth fade out animation
    mobileFeaturesMenu.style.transition =
      "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    mobileFeaturesMenu.style.opacity = "0";
    mobileFeaturesMenu.style.transform = "translateX(100%)";

    // Remove from DOM after animation completes
    setTimeout(() => {
      if (mobileFeaturesMenu.parentNode) {
        mobileFeaturesMenu.remove();
      }
      document.body.style.overflow = "";
    }, 400);
  } else {
    document.body.style.overflow = "";
  }
}

// Footer mobile features toggle (removed - now in mobile menu)
// Keeping variable for backward compatibility but button removed from footer

// Run check after page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", checkAndOpenMenuFromDemo);
} else {
  // DOM already loaded
  checkAndOpenMenuFromDemo();
}

// Close mobile features menu when clicking outside
document.addEventListener("click", (e) => {
  const mobileFeaturesMenu = document.querySelector(".mobile-features-menu");
  const mobileFeaturesToggleInMenu = document.querySelector("#mobileFeaturesToggleInMenu");
  if (isMobileFeaturesMenuOpen && mobileFeaturesMenu && !mobileFeaturesMenu.contains(e.target)) {
    // Don't close if clicking the toggle button
    if (mobileFeaturesToggleInMenu && mobileFeaturesToggleInMenu.contains(e.target)) {
      return;
    }
    closeMobileFeaturesMenu();
  }
});

// Close mobile features menu on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isMobileFeaturesMenuOpen) {
    closeMobileFeaturesMenu();
  }
});

// Header scroll shadow and mobile scroll behavior
const header = document.querySelector(".header");
let lastScrollY = window.scrollY;
let isMobile = window.innerWidth <= 768;
let scrollThreshold = 10; // Minimum scroll distance to trigger hide/show

// Update mobile detection on resize
window.addEventListener("resize", () => {
  isMobile = window.innerWidth <= 768;
});

const heroAiIcon = document.getElementById("heroAiIcon") || document.querySelector(".hero-ai-icon");
const headerAiIcon = document.querySelector(".header-ai-icon");
const AI_TRANSITION_START = 50;
const AI_TRANSITION_END = 130;
const AI_TRANSITION_RANGE = AI_TRANSITION_END - AI_TRANSITION_START;

function updateAiIconTransition() {
  if (!header) return;
  const y = window.scrollY;
  const progress = Math.max(0, Math.min(1, (y - AI_TRANSITION_START) / AI_TRANSITION_RANGE));
  document.documentElement.style.setProperty("--ai-transition-progress", String(progress));
  if (progress >= 0.99) {
    header.classList.add("header-ai-visible");
    if (heroAiIcon) heroAiIcon.classList.add("hero-ai-icon-scrolled");
  } else if (progress <= 0.01) {
    header.classList.remove("header-ai-visible");
    if (heroAiIcon) heroAiIcon.classList.remove("hero-ai-icon-scrolled");
  } else {
    header.classList.add("header-ai-visible");
    if (heroAiIcon) heroAiIcon.classList.remove("hero-ai-icon-scrolled");
  }
}

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  // Always add scrolled class for shadow effect
  if (currentScrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // AI icon transition: hero icon fades out, header AI icon fades in
  updateAiIconTransition();

  // Mobile-specific scroll behavior: hide on scroll down, show on scroll up
  if (isMobile) {
    const scrollDelta = Math.abs(currentScrollY - lastScrollY);

    // Always show at the very top
    if (currentScrollY <= 5) {
      header.classList.remove("header-hidden");
    }
    // Only act if scroll is significant enough
    else if (scrollDelta >= scrollThreshold) {
      const scrollingDown = currentScrollY > lastScrollY;
      const scrollingUp = currentScrollY < lastScrollY;

      if (scrollingDown && currentScrollY > 50) {
        // Scrolling down - hide header
        header.classList.add("header-hidden");
      } else if (scrollingUp) {
        // Scrolling up - show header
        header.classList.remove("header-hidden");
      }
    }
  }

  lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
});

// Check initial scroll position
if (header) {
  if (window.scrollY > 10) header.classList.add("scrolled");
  updateAiIconTransition();
}

// Animated Hero Expansion
const scrollToAIDemoBtn = document.getElementById("scrollToAIDemo");
const scrollToAIDemoEyebrowBtn = document.getElementById("scrollToAIDemoEyebrow");
const heroAnimationSection = document.getElementById("heroAnimationSection");
const scrollToAIPromptBtn = document.getElementById("scrollToAIPrompt");

// Track if animation has been triggered (shared between button and observer)
let hasAnimated = false;

// Function to trigger animation permanently
const triggerAnimation = () => {
  if (!hasAnimated && heroAnimationSection) {
    heroAnimationSection.classList.add("animate");
    hasAnimated = true;
    // Re-initialize Lucide icons after animation starts
    if (typeof lucide !== "undefined") {
      setTimeout(() => {
        lucide.createIcons();
      }, 100);
    }
  }
};

// Scroll to animation section on button click
if (scrollToAIDemoBtn && heroAnimationSection) {
  scrollToAIDemoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    heroAnimationSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    // Trigger animation immediately and permanently after scroll
    setTimeout(() => {
      triggerAnimation();
    }, 300);
  });
}

// Scroll to AI demo section on eyebrow button click
const aiPromptSection = document.querySelector(".ai-prompt-section");
if (scrollToAIDemoEyebrowBtn && aiPromptSection) {
  scrollToAIDemoEyebrowBtn.addEventListener("click", (e) => {
    e.preventDefault();
    aiPromptSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

// Scroll to AI prompt section
if (scrollToAIPromptBtn) {
  scrollToAIPromptBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const aiPromptSection = document.querySelector(".ai-prompt-section");
    if (aiPromptSection) {
      aiPromptSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
}

// Make hero USPs clickable - scroll to section 2 with tooltips
const heroUspItems = document.querySelectorAll(".hero-usp-clickable");
if (heroUspItems.length > 0 && heroAnimationSection) {
  heroUspItems.forEach((uspItem) => {
    uspItem.style.cursor = "pointer";
    uspItem.addEventListener("click", (e) => {
      e.preventDefault();
      const uspIndex = uspItem.getAttribute("data-usp-index");

      // Scroll to hero animation section
      heroAnimationSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Trigger animation and highlight corresponding USP after scroll
      setTimeout(() => {
        triggerAnimation();

        // Find and highlight the corresponding USP in section 2
        if (uspIndex !== null) {
          const targetUsp = heroAnimationSection.querySelector(
            `.hero-animation-usp-item[data-usp-index="${uspIndex}"]`,
          );
          if (targetUsp) {
            // Temporarily add active class to highlight
            targetUsp.classList.add("active");

            // Remove active class after a delay
            setTimeout(() => {
              targetUsp.classList.remove("active");
            }, 2000);
          }
        }
      }, 500);
    });
  });
}

// Auto-hide before/after section when scrolled past
const beforeAfterSection = document.querySelector(".hero-before-after");
if (beforeAfterSection) {
  let isHidden = false;

  const updateVisibility = () => {
    const rect = beforeAfterSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementTop = rect.top;
    const elementHeight = rect.height;

    // Hide when the section has scrolled past the top of the viewport
    // (when elementTop is negative and most of the section is above viewport)
    const hideThreshold = -elementHeight * 0.5; // Hide when 50% has scrolled past top
    const showThreshold = -elementHeight * 0.3; // Show again when scrolling back

    let shouldHide = elementTop < hideThreshold;

    if (shouldHide && !isHidden) {
      // Hide the entire section
      beforeAfterSection.style.opacity = "0";
      beforeAfterSection.style.visibility = "hidden";
      beforeAfterSection.style.pointerEvents = "none";
      isHidden = true;
    } else if (!shouldHide && isHidden && elementTop > showThreshold) {
      // Show the section again when scrolling back up
      beforeAfterSection.style.opacity = "1";
      beforeAfterSection.style.visibility = "visible";
      beforeAfterSection.style.pointerEvents = "auto";
      isHidden = false;
    } else if (!isHidden) {
      // Normal fade-in behavior when section is in view
      const startFade = windowHeight * 0.8;
      const endFade = windowHeight * 0.3;

      let opacity = 0.2;
      if (elementTop < startFade && elementTop > hideThreshold) {
        if (elementTop <= endFade) {
          opacity = 1.0;
        } else {
          const progress = Math.max(
            0,
            Math.min(1, (startFade - elementTop) / (startFade - endFade)),
          );
          opacity = 0.2 + progress * 0.8;
        }
      }
      beforeAfterSection.style.opacity = opacity;
    }
  };

  // Update on scroll
  window.addEventListener("scroll", updateVisibility, { passive: true });

  // Initial update
  updateVisibility();
}

// Intersection Observer for scroll-triggered animation
if (heroAnimationSection) {
  const observerOptions = {
    root: null,
    rootMargin: "-15% 0px -15% 0px",
    threshold: 0.2,
  };

  let scrollProgress = 0;
  let isScrolling = false;
  let scrollTimeout;
  const imageWrappers = heroAnimationSection.querySelectorAll(".hero-animation-image-wrapper");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        triggerAnimation();
      }
      // Once animated, never remove the animate class
    });
  }, observerOptions);

  observer.observe(heroAnimationSection);

  // Scroll-linked animation for images
  let lastScrollY = window.scrollY;
  let animationFrame;

  function updateScrollAnimation() {
    if (!heroAnimationSection.classList.contains("animate")) {
      cancelAnimationFrame(animationFrame);
      return;
    }

    const rect = heroAnimationSection.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const sectionHeight = rect.height;
    const viewportHeight = window.innerHeight;

    // Calculate scroll progress through the section
    const scrollPosition = window.scrollY;
    const sectionStart = sectionTop - viewportHeight * 0.3;
    const sectionEnd = sectionTop + sectionHeight - viewportHeight * 0.7;
    const scrollRange = sectionEnd - sectionStart;

    if (scrollPosition >= sectionStart && scrollPosition <= sectionEnd) {
      scrollProgress = Math.min(1, Math.max(0, (scrollPosition - sectionStart) / scrollRange));
    } else if (scrollPosition < sectionStart) {
      scrollProgress = 0;
    } else {
      scrollProgress = 1;
    }

    // Apply scroll-linked transform
    imageWrappers.forEach((wrapper, index) => {
      const offset = index === 0 ? scrollProgress * 15 : scrollProgress * -10;
      const scale = 1 + scrollProgress * 0.03;
      wrapper.style.transform = `translateY(${offset}px) scale(${scale})`;
    });

    animationFrame = requestAnimationFrame(updateScrollAnimation);
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!heroAnimationSection.classList.contains("animate")) return;

      isScrolling = true;
      updateScrollAnimation();

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    },
    { passive: true },
  );
}

// Initialize Lucide icons after page load
function initializeLucideIcons() {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  } else {
    // Retry after a short delay if Lucide isn't loaded yet
    setTimeout(initializeLucideIcons, 100);
  }
}

// Initialize on page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeLucideIcons);
} else {
  initializeLucideIcons();
}

// Mobile USP tooltip toggle
function initMobileUSPTooltips() {
  const isMobile = window.innerWidth <= 768;
  if (!isMobile) return;

  const uspItems = document.querySelectorAll(".hero-animation-usp-item");

  uspItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      // Don't toggle if clicking inside the tooltip
      if (e.target.closest(".usp-detail-card")) {
        return;
      }

      // Toggle active class
      const isActive = this.classList.contains("active");

      // Close all other items
      uspItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
      });

      // Toggle this item
      if (!isActive) {
        this.classList.add("active");
      }
    });
  });

  // Close tooltips when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".hero-animation-usp-item")) {
      uspItems.forEach((item) => {
        item.classList.remove("active");
      });
    }
  });
}

// Initialize mobile USP tooltips
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMobileUSPTooltips);
} else {
  initMobileUSPTooltips();
}

// Re-initialize on resize (in case user rotates device)
let resizeTimer;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    initMobileUSPTooltips();
  }, 250);
});

// Stats Badge Carousel
function initStatsCarousel() {
  const statsValues = document.querySelectorAll(".stats-preview-value");
  const statsIcons = document.querySelectorAll(".stats-preview-icon");
  if (statsValues.length < 3 || statsIcons.length < 3) return;

  // Initialize Lucide icons if available
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  const stats = ["time", "profit", "turnover"];
  let currentIndex = 0;

  function rotateStats() {
    const currentStat = stats[currentIndex];

    // Remove active from current text and icon
    statsValues.forEach((val) => {
      if (val.dataset.stat === currentStat) {
        val.classList.remove("active");
      }
    });
    statsIcons.forEach((icon) => {
      if (icon.dataset.stat === currentStat) {
        icon.classList.remove("active");
      }
    });

    // Move to next
    currentIndex = (currentIndex + 1) % stats.length;
    const nextStat = stats[currentIndex];

    // Add active to next text and icon
    statsValues.forEach((val) => {
      if (val.dataset.stat === nextStat) {
        val.classList.add("active");
      }
    });
    statsIcons.forEach((icon) => {
      if (icon.dataset.stat === nextStat) {
        icon.classList.add("active");
      }
    });
  }

  // Start rotation every 3 seconds
  setInterval(rotateStats, 3000);
}

// Initialize stats carousel
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initStatsCarousel);
} else {
  initStatsCarousel();
}

// Market Data Ticker
function initMarketTicker() {
  const tickerItems = document.querySelectorAll(".market-ticker-item");
  if (tickerItems.length === 0) return;

  let currentIndex = 0;
  const tickerInterval = 4000; // 4 seconds per item

  function rotateTicker() {
    // Remove active from current
    tickerItems[currentIndex].classList.remove("active");

    // Move to next
    currentIndex = (currentIndex + 1) % tickerItems.length;

    // Add active to next
    tickerItems[currentIndex].classList.add("active");

    // Animate number counting if it has a data-value
    const valueElement = tickerItems[currentIndex].querySelector(".ticker-value");
    if (valueElement && valueElement.dataset.value) {
      const prefix = valueElement.dataset.prefix || "";
      const suffix = valueElement.dataset.suffix || "";
      animateNumber(valueElement, parseFloat(valueElement.dataset.value), prefix, suffix);
    }

    // Re-initialize Lucide icons for new active item
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }

  function animateNumber(element, targetValue, prefix, suffix) {
    let current = 0;
    const duration = 1000;
    const steps = 40;
    const increment = targetValue / steps;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        current = targetValue;
        clearInterval(timer);
      }

      if (suffix === "M") {
        element.textContent = prefix + current.toFixed(1) + suffix;
      } else if (suffix === "%") {
        element.textContent = Math.round(current) + suffix;
      } else {
        element.textContent = prefix + Math.round(current).toLocaleString() + suffix;
      }
    }, stepDuration);
  }

  // Start rotation
  setInterval(rotateTicker, tickerInterval);

  // Initialize first item
  if (tickerItems.length > 0) {
    tickerItems[0].classList.add("active");
    const firstValue = tickerItems[0].querySelector(".ticker-value");
    if (firstValue && firstValue.dataset.value) {
      const prefix = firstValue.dataset.prefix || "";
      const suffix = firstValue.dataset.suffix || "";
      setTimeout(() => {
        animateNumber(firstValue, parseFloat(firstValue.dataset.value), prefix, suffix);
      }, 500);
    }

    // Initialize Lucide icons
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }
}

// Stats Badge (Hours Saved, Extra Profit, Turnover)
function initStatsBadge() {
  const badgeItems = document.querySelectorAll(".stats-badge-item");
  if (badgeItems.length === 0) return;

  let currentIndex = 0;
  const badgeInterval = 4000; // 4 seconds per item

  function rotateBadge() {
    // Remove active from current
    badgeItems[currentIndex].classList.remove("active");

    // Move to next
    currentIndex = (currentIndex + 1) % badgeItems.length;

    // Add active to next
    badgeItems[currentIndex].classList.add("active");

    // Animate number counting if it has a data-value
    const valueElement = badgeItems[currentIndex].querySelector(".stats-badge-value");
    if (valueElement && valueElement.dataset.value) {
      const prefix = valueElement.dataset.prefix || "";
      const suffix = valueElement.dataset.suffix || "";
      animateStatsBadgeNumber(valueElement, parseFloat(valueElement.dataset.value), prefix, suffix);
    }

    // Re-initialize Lucide icons for new active item
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }

  function animateStatsBadgeNumber(element, targetValue, prefix, suffix) {
    let current = 0;
    const duration = 1000;
    const steps = 40;
    const increment = targetValue / steps;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        current = targetValue;
        clearInterval(timer);
      }

      if (suffix === "hrs") {
        element.textContent = current.toFixed(1) + suffix;
      } else if (suffix === "%") {
        element.textContent = prefix + Math.round(current) + suffix;
      } else {
        element.textContent = prefix + Math.round(current).toLocaleString() + suffix;
      }
    }, stepDuration);
  }

  // Start rotation
  setInterval(rotateBadge, badgeInterval);

  // Initialize first item
  if (badgeItems.length > 0) {
    badgeItems[0].classList.add("active");
    const firstValue = badgeItems[0].querySelector(".stats-badge-value");
    if (firstValue && firstValue.dataset.value) {
      const prefix = firstValue.dataset.prefix || "";
      const suffix = firstValue.dataset.suffix || "";
      setTimeout(() => {
        animateStatsBadgeNumber(firstValue, parseFloat(firstValue.dataset.value), prefix, suffix);
      }, 500);
    }

    // Initialize Lucide icons
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }
}

// Initialize market ticker and stats badge
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initMarketTicker();
    initStatsBadge();
    // Re-initialize Lucide icons after badges are set up
    if (typeof lucide !== "undefined") {
      setTimeout(() => lucide.createIcons(), 100);
    }
  });
} else {
  initMarketTicker();
  initStatsBadge();
  // Re-initialize Lucide icons after badges are set up
  if (typeof lucide !== "undefined") {
    setTimeout(() => lucide.createIcons(), 100);
  }
}

console.log("VEIQ landing page loaded successfully 🚗");
}
