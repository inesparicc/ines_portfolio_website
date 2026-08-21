// ==========================================
// MAIN INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  
  // --- 1. DARK MODE TOGGLE ---
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  if (themeToggle && themeIcon) {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme);
      if (currentTheme === 'dark') {
        themeIcon.textContent = '☀'; 
      }
    }

    themeToggle.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');
      if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeIcon.textContent = '☾'; 
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.textContent = '☀'; 
      }
    });
  }

  // --- 2. CASE STUDY NAVIGATION HIGHLIGHTING ---
  const caseSections = document.querySelectorAll(".case-chapter");
  const caseNavLinks = document.querySelectorAll(".case-nav-inner a");

  if (caseSections.length && caseNavLinks.length) {
    window.addEventListener("scroll", () => {
      let current = "";
      caseSections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      caseNavLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    });
  }

  // --- 3. SCROLL-IN ANIMATION (.fade-in-up) ---
  const faders = document.querySelectorAll(".fade-in-up");

  if (faders.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    faders.forEach((el) => observer.observe(el));
  }

  // --- 4. DYNAMIC BACKGROUND COLOR ON SCROLL ---
  const colorSections = document.querySelectorAll("[data-bg]");

  if (colorSections.length) {
    const bgObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const color = entry.target.getAttribute("data-bg");
            document.documentElement.style.setProperty("--page-bg", color);
          }
        });
      },
      { threshold: 0.35 }
    );

    colorSections.forEach((section) => bgObserver.observe(section));
  }

  // --- 5. PHOTO SLIDER (ABOUT PAGE) ---
  const gallerySlides = document.querySelectorAll(".gallery-slide");
  const prevBtn = document.querySelector(".gallery-btn.prev");
  const nextBtn = document.querySelector(".gallery-btn.next");

  if (gallerySlides.length && prevBtn && nextBtn) {
    let currentIndex = 0;
    const updateSlides = () => {
      gallerySlides.forEach((slide, index) => {
        slide.classList.toggle("active", index === currentIndex);
      });
    };
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + gallerySlides.length) % gallerySlides.length;
      updateSlides();
    });
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % gallerySlides.length;
      updateSlides();
    });
    updateSlides();
  }

  // --- 6. "OPEN TO OPPORTUNITIES" POPUP ---
  const popup = document.getElementById("interestPopup");
  const closePopupBtn = document.getElementById("closePopupBtn");

  if (popup && closePopupBtn) {
    const hasSeen = localStorage.getItem("ines_popup_seen");
    if (!hasSeen) {
      setTimeout(() => { popup.style.display = "block"; }, 2000);
    }
    closePopupBtn.addEventListener("click", () => {
      popup.style.display = "none";
      localStorage.setItem("ines_popup_seen", "true");
    });
  }

  // --- 7. HERO SCROLL BUTTON (HOMEPAGE) ---
  const scrollCue = document.querySelector(".scroll-cue");
  const workSection = document.querySelector("#work");

  if (scrollCue && workSection) {
    scrollCue.addEventListener("click", (e) => {
      e.preventDefault();
      workSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // --- 8. MAIN NAVIGATION SCROLL SPY (PROGRESS LINE) ---
  const mainSections = document.querySelectorAll("main section[id]");
  const mainNavItems = document.querySelectorAll(".sliding-nav .nav-item");
  const activeIndicator = document.querySelector(".sliding-nav .active-indicator");

  if (mainSections.length > 0 && mainNavItems.length > 0 && activeIndicator) {
    
    // Function to stretch the line like a progress bar
    const updateIndicator = (targetLink) => {
      if (!targetLink) return;
      // Stretches the width from the left edge all the way to the end of the active link
      activeIndicator.style.width = `${targetLink.offsetLeft + targetLink.offsetWidth}px`;
      activeIndicator.style.left = `0px`; // Always anchors to the far left
    };

    const navObserverOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.4, 
    };

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute("id");
          const activeLink = document.querySelector(`.sliding-nav .nav-item[href="#${currentId}"]`);

          mainNavItems.forEach((link) => link.classList.remove("active"));
          if (activeLink) {
            activeLink.classList.add("active");
            updateIndicator(activeLink);
          }
        }
      });
    }, navObserverOptions);

    mainSections.forEach((section) => navObserver.observe(section));

    window.addEventListener("resize", () => {
      const activeLink = document.querySelector(".sliding-nav .nav-item.active");
      updateIndicator(activeLink);
    });

    mainNavItems.forEach((link) => {
      link.addEventListener("click", function () {
        updateIndicator(this);
      });
    });

    setTimeout(() => {
      const initialActive = document.querySelector(".sliding-nav .nav-item.active");
      if (initialActive) updateIndicator(initialActive);
    }, 100);
  }
});

// ==========================================
// FAIRY DUST MOUSE TRAIL EFFECT
// ==========================================
let lastX = 0;
let lastY = 0;

document.addEventListener('mousemove', function(e) {
  const deltaX = e.pageX - lastX;
  const deltaY = e.pageY - lastY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  if (distance > 10) {
    const amount = Math.random() > 0.5 ? 2 : 1; 
    for(let i = 0; i < amount; i++) {
      createFairyDust(e.pageX, e.pageY);
    }
    lastX = e.pageX;
    lastY = e.pageY;
  }
});

function createFairyDust(x, y) {
  const particle = document.createElement('div');
  particle.className = 'mouse-particle';
  
  const size = Math.random() * 4 + 2;
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';

  const offsetX = (Math.random() - 0.5) * 20;
  const offsetY = (Math.random() - 0.5) * 20;
  particle.style.left = (x + offsetX) + 'px';
  particle.style.top = (y + offsetY) + 'px';

  const driftX = (Math.random() - 0.5) * 40;
  particle.style.setProperty('--drift', driftX + 'px');
  
  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 1000);
}