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

// ===== FAIRY DUST MOUSE TRAIL EFFECT =====
let lastX = 0;
let lastY = 0;

document.addEventListener('mousemove', function(e) {
  // Calculate distance from last particle spawned
  const deltaX = e.pageX - lastX;
  const deltaY = e.pageY - lastY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  // Spawn a new sparkle every 10 pixels moved
  if (distance > 10) {
    // Spawn 1 or 2 sparkles for a denser dust effect
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
  
  // Randomize the size of each sparkle (between 2px and 6px)
  const size = Math.random() * 4 + 2;
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';

  // Scatter them randomly around the cursor tip
  const offsetX = (Math.random() - 0.5) * 20;
  const offsetY = (Math.random() - 0.5) * 20;
  particle.style.left = (x + offsetX) + 'px';
  particle.style.top = (y + offsetY) + 'px';

  // Give each sparkle a random horizontal drift direction
  const driftX = (Math.random() - 0.5) * 40;
  particle.style.setProperty('--drift', driftX + 'px');
  
  document.body.appendChild(particle);

  // Clean up after 1 second (1000ms)
  setTimeout(() => {
    particle.remove();
  }, 1000);
}