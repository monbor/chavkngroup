/* ==========================================================================
   KUMBA ARCHITECTS — main.js
   Navigation, menu mobile, comportement au scroll
   ========================================================================== */

(function () {
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const backToTop = document.querySelector('.back-to-top');
  const slider = document.querySelector('.hero-slider');
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  const dots = Array.from(document.querySelectorAll('.hero-dot'));
  let activeIndex = 0;
  let autoplayTimer = null;

  /* Nav: fond opaque au scroll -------------------------------------------- */
  function handleScroll() {
    if (!nav) return;
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    if (backToTop) {
      if (window.scrollY > 800) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* Menu hamburger plein écran ---------------------------------------------*/
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    mobileMenu.querySelectorAll('.mobile-submenu-toggle').forEach((button) => {
      button.addEventListener('click', () => {
        const submenu = button.closest('.mobile-submenu');
        const isOpen = submenu.classList.toggle('is-open');
        button.setAttribute('aria-expanded', String(isOpen));
      });
    });
  }

  /* Menus déroulants : synchronisation ARIA et navigation clavier. */
  document.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
    const trigger = dropdown.querySelector('[aria-haspopup]');
    const items = Array.from(dropdown.querySelectorAll('[role="menuitem"]'));
    let closeTimer = null;
    const setOpen = (open) => {
      if (closeTimer) {
        window.clearTimeout(closeTimer);
        closeTimer = null;
      }
      dropdown.classList.toggle('is-open', open);
      trigger.setAttribute('aria-expanded', String(open));
    };
    const scheduleClose = () => {
      closeTimer = window.setTimeout(() => setOpen(false), 400);
    };
    dropdown.addEventListener('mouseenter', () => setOpen(true));
    dropdown.addEventListener('mouseleave', scheduleClose);
    trigger.addEventListener('focus', () => setOpen(true));
    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); items[0]?.focus(); }
      if (event.key === 'Escape') { setOpen(false); trigger.focus(); }
    });
    dropdown.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') { setOpen(false); trigger.focus(); }
    });
    dropdown.addEventListener('focusout', () => {
      window.setTimeout(() => { if (!dropdown.contains(document.activeElement)) scheduleClose(); }, 0);
    });
  });

  /* Retour en haut de page ---------------------------------------------------*/
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* Slider hero -------------------------------------------------------------*/
  if (slider && slides.length && dots.length) {
    function showSlide(index) {
      activeIndex = (index + slides.length) % slides.length;

      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('is-active', slideIndex === activeIndex);
      });

      dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === activeIndex;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-current', isActive ? 'true' : 'false');
      });
    }

    function startAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
      }

      autoplayTimer = window.setInterval(() => {
        showSlide(activeIndex + 1);
      }, 6000);
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        startAutoplay();
      });
    });

    showSlide(0);
    startAutoplay();
  }

  /* Marque le lien de navigation actif ----------------------------------------*/
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach((link) => {
    const href = link.getAttribute('href').split('#')[0];
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* Textes repliables ------------------------------------------------------*/
  document.querySelectorAll('.text-collapsible').forEach((collapsible, index) => {
    const toggle = collapsible.querySelector('.text-collapsible__toggle');
    const more = collapsible.querySelector('.text-collapsible__more');
    if (!toggle || !more) return;

    if (!more.id) more.id = `collapsible-content-${index + 1}`;
    toggle.setAttribute('aria-controls', more.id);
    toggle.setAttribute('aria-expanded', 'false');

    toggle.addEventListener('click', () => {
      const isExpanded = collapsible.classList.toggle('is-expanded');
      toggle.setAttribute('aria-expanded', String(isExpanded));
      toggle.textContent = isExpanded ? 'Réduire' : 'Continuer à lire';
    });
  });

  /* Les longues descriptions de la culture deviennent repliables. --------*/
  document.querySelectorAll('#culture .culture-band__body').forEach((body, index) => {
    const paragraph = body.querySelector(':scope > p');
    if (!paragraph || body.querySelector('.text-collapsible')) return;

    const fullText = paragraph.textContent.trim();
    const sentenceEnd = fullText.search(/(?<=[.!?])\s+/);
    if (sentenceEnd < 0) return;

    const intro = fullText.slice(0, sentenceEnd + 1);
    const remainder = fullText.slice(sentenceEnd + 1).trim();
    const contentId = `culture-more-${index + 1}`;
    const collapsible = document.createElement('div');
    collapsible.className = 'text-collapsible';
    collapsible.innerHTML = `
      <p>${intro}</p>
      <button class="text-collapsible__toggle" type="button" aria-expanded="false" aria-controls="${contentId}">Continuer à lire</button>
      <div class="text-collapsible__more" id="${contentId}"><div class="text-collapsible__more-inner"><p>${remainder}</p></div></div>`;
    paragraph.replaceWith(collapsible);

    const toggle = collapsible.querySelector('.text-collapsible__toggle');
    toggle.addEventListener('click', () => {
      const isExpanded = collapsible.classList.toggle('is-expanded');
      toggle.setAttribute('aria-expanded', String(isExpanded));
      toggle.textContent = isExpanded ? 'Réduire' : 'Continuer à lire';
    });
  });

  /* Détecte les médias ajoutés aux zones image de la culture. -------------*/
  document.querySelectorAll('#culture .culture-band__media').forEach((media) => {
    const image = media.querySelector('img');
    if (image && image.getAttribute('src')?.trim()) {
      media.append(image);
      media.classList.add('has-image');
    }
  });
})();
