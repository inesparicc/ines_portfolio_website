// ===== Case study step highlighting on scroll =====
const sections = document.querySelectorAll(".case-section");
const steps = document.querySelectorAll(".step");

if (sections.length && steps.length) {
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    steps.forEach((s) => {
      s.classList.remove("active");
      if (s.getAttribute("href") === `#${current}`) {
        s.classList.add("active");
      }
    });
  });
}

// ===== MAIN INIT =====
document.addEventListener("DOMContentLoaded", () => {
  // --- Scroll-in animation for any .fade-in-up elements ---
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

  // --- Simple photo slider on About page ---
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

    // show first slide initially
    updateSlides();
  }

  // --- Small "open to internships" popup ---
  const popup = document.getElementById("interestPopup");
  const closePopupBtn = document.getElementById("closePopupBtn");

  if (popup && closePopupBtn) {
    const hasSeen = localStorage.getItem("ines_popup_seen");

    if (!hasSeen) {
      setTimeout(() => {
        popup.style.display = "block";
      }, 2000); // show after 2 seconds
    }

    closePopupBtn.addEventListener("click", () => {
      popup.style.display = "none";
      localStorage.setItem("ines_popup_seen", "true");
    });
  }

  // --- Hero bubble: pop to scroll to projects ---
  const blobBtn = document.querySelector(".scroll-blob-btn");
  const projectsSection = document.querySelector("#projects");

  if (blobBtn && projectsSection) {
    blobBtn.addEventListener("click", () => {
      projectsSection.scrollIntoView({ behavior: "smooth" });
      // Optional: add "popped" class for a quick visual burst
      blobBtn.classList.add("popped");
      setTimeout(() => blobBtn.classList.remove("popped"), 400);
    });
  }
});
