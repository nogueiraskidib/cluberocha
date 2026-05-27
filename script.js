/* 
========================================================================
   JCR — JUDÔ CLUBE ROCHA | ACTIVE PREMIUM ACTIONS & INTERACTIVITY
   Created by Antigravity AI — High-Ticket Sports UX
========================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. INITIALIZE LUCIDE ICONS
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. DYNAMIC HEADER & ACTIVE LINK ON SCROLL
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  const handleScroll = () => {
    // Add scrolled class to header
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    let currentSectionId = 'hero';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 160;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger immediately to set correct states

  // 3. MOBILE MENU HAMBURGER TOGGLE
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking any link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside of nav
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // 4. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before entry
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if observer not supported
    revealElements.forEach(el => el.classList.add('reveal-active'));
  }

  // 5. CLASS CATEGORIES TABS (TURMAS)
  const tabBtns = document.querySelectorAll('.tab-btn');
  const turmaContents = document.querySelectorAll('.turma-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update active tab buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update active class contents
      turmaContents.forEach(content => {
        content.classList.remove('active');
        if (content.getAttribute('id') === targetTab) {
          content.classList.add('active');
        }
      });
    });
  });

  // 6. GALLERY FILTERS & LIGHTBOX
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galeriaItems = document.querySelectorAll('.galeria-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter grid
      galeriaItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filterValue === 'all' || cat === filterValue) {
          item.classList.remove('hidden');
          // Trigger slight fade-in animation
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.opacity = '1';
          }, 50);
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // Lightbox functionality
  galeriaItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop page scroll
      }
    });
  });

  if (lightboxClose && lightbox) {
    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto'; // Restore page scroll
    };

    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close on clicking overlay backdrop
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // 7. TESTIMONIALS SLIDER / CAROUSEL
  const track = document.getElementById('slider-track');
  const slides = Array.from(document.querySelectorAll('.depoimento-slide'));
  const nextBtn = document.getElementById('slider-next');
  const prevBtn = document.getElementById('slider-prev');
  const dotsContainer = document.getElementById('slider-dots');
  
  if (track && slides.length > 0) {
    const dots = Array.from(dotsContainer.querySelectorAll('.slider-dot'));
    let currentIndex = 0;
    let autoSlideInterval;

    const updateSlider = (index) => {
      currentIndex = index;
      const amountToMove = -100 * currentIndex;
      track.style.transform = `translateX(${amountToMove}%)`;
      
      // Update dots
      dots.forEach(dot => dot.classList.remove('active'));
      dots[currentIndex].classList.add('active');
    };

    const nextSlide = () => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= slides.length) nextIndex = 0;
      updateSlider(nextIndex);
    };

    const prevSlide = () => {
      let prevIndex = currentIndex - 1;
      if (prevIndex < 0) prevIndex = slides.length - 1;
      updateSlider(prevIndex);
    };

    // Button controls
    if (nextBtn) nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoPlay();
    });
    if (prevBtn) prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoPlay();
    });

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        updateSlider(index);
        resetAutoPlay();
      });
    });

    // Auto Play
    const startAutoPlay = () => {
      autoSlideInterval = setInterval(nextSlide, 6000);
    };

    const resetAutoPlay = () => {
      clearInterval(autoSlideInterval);
      startAutoPlay();
    };

    startAutoPlay();

    // Pause on hover
    const sliderContainer = document.querySelector('.depoimentos-slider');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
      sliderContainer.addEventListener('mouseleave', startAutoPlay);
    }
  }

  // 8. DYNAMIC DUST PARTICLES (CANVAS SYSTEM)
  // Generates floating cinematic yellow particles in the background of Hero and CTA sections
  class ParticleSystem {
    constructor(containerId, color, count = 28) {
      this.container = document.getElementById(containerId);
      if (!this.container) return;

      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.color = color;
      this.maxParticles = count;
      this.particles = [];

      this.init();
    }

    init() {
      // Style and position canvas behind content inside the section
      this.canvas.style.position = 'absolute';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.width = '100%';
      this.canvas.style.height = '100%';
      this.canvas.style.pointerEvents = 'none';
      this.canvas.style.zIndex = '3';
      
      this.container.appendChild(this.canvas);
      this.resize();

      // Create initial particles
      for (let i = 0; i < this.maxParticles; i++) {
        this.particles.push(this.createParticle(true));
      }

      window.addEventListener('resize', () => this.resize());
      this.animate();
    }

    resize() {
      this.width = this.container.offsetWidth;
      this.height = this.container.offsetHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }

    createParticle(randomY = false) {
      return {
        x: Math.random() * this.width,
        y: randomY ? Math.random() * this.height : this.height + 10,
        size: Math.random() * 2 + 0.8,
        speedY: -(Math.random() * 0.4 + 0.1),
        speedX: (Math.random() * 0.2 - 0.1),
        opacity: Math.random() * 0.5 + 0.1,
        fadeSpeed: Math.random() * 0.005 + 0.002,
        growing: true
      };
    }

    animate() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      this.particles.forEach((p, index) => {
        p.y += p.speedY;
        p.x += p.speedX;

        // Subtle opacity pulsing / glowing
        if (p.growing) {
          p.opacity += p.fadeSpeed;
          if (p.opacity >= 0.75) p.growing = false;
        } else {
          p.opacity -= p.fadeSpeed;
          if (p.opacity <= 0.05) p.growing = true;
        }

        // Wrap particles or recreate when they go offscreen
        if (p.y < -10 || p.x < -10 || p.x > this.width + 10) {
          this.particles[index] = this.createParticle(false);
        }

        // Draw particle (glowing golden soft dots)
        this.ctx.beginPath();
        const grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        grad.addColorStop(0, `rgba(${this.color}, ${p.opacity})`);
        grad.addColorStop(1, `rgba(${this.color}, 0)`);
        this.ctx.fillStyle = grad;
        this.ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        this.ctx.fill();
      });

      requestAnimationFrame(() => this.animate());
    }
  }

  // Active yellow/gold dust system on Hero section (color: HSL 50, 100%, 50% => RGB: 255, 215, 0)
  new ParticleSystem('hero', '255, 215, 0', 35);
  
  // Active golden dust system on CTA section
  new ParticleSystem('contato', '255, 215, 0', 20);

  // Set current copyright year
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
