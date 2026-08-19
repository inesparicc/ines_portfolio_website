// ===== Case study navigation highlighting on scroll =====
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

// ===== MAIN INIT =====
document.addEventListener("DOMContentLoaded", () => {
  // --- Scroll-in animation for .fade-in-up elements ---
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

  // --- Dynamic background color transition on scroll (for Case Studies) ---
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

  // --- Photo slider (About page) ---
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
      currentIndex =
        (currentIndex - 1 + gallerySlides.length) % gallerySlides.length;
      updateSlides();
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % gallerySlides.length;
      updateSlides();
    });

    updateSlides();
  }

  // --- "Open to opportunities" popup ---
  const popup = document.getElementById("interestPopup");
  const closePopupBtn = document.getElementById("closePopupBtn");

  if (popup && closePopupBtn) {
    const hasSeen = localStorage.getItem("ines_popup_seen");

    if (!hasSeen) {
      setTimeout(() => {
        popup.style.display = "block";
      }, 2000);
    }

    closePopupBtn.addEventListener("click", () => {
      popup.style.display = "none";
      localStorage.setItem("ines_popup_seen", "true");
    });
  }

  // --- Hero scroll button (Homepage) ---
  const scrollCue = document.querySelector(".scroll-cue");
  const workSection = document.querySelector("#work");

  if (scrollCue && workSection) {
    scrollCue.addEventListener("click", (e) => {
      e.preventDefault();
      workSection.scrollIntoView({ behavior: "smooth" });
    });
  }
});