
// RJM Digital Solutions website interactions
(function () {
  const page = document.body.getAttribute('data-page');
  document.querySelectorAll('[data-nav]').forEach((link) => {
    if (link.dataset.nav === page) link.classList.add('is-active');
  });

  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Auto gallery slider — advances every 5 seconds
  document.querySelectorAll('[data-slider]').forEach((slider) => {
    const slides = Array.from(slider.querySelectorAll('.slide'));
    const nextBtn = slider.querySelector('[data-next]');
    const prevBtn = slider.querySelector('[data-prev]');
    let index = 0;
    let timer;

    const show = (nextIndex) => {
      slides[index].classList.remove('is-active');
      index = (nextIndex + slides.length) % slides.length;
      slides[index].classList.add('is-active');
    };

    const start = () => {
      timer = setInterval(() => show(index + 1), 5000);
    };

    const restart = () => {
      clearInterval(timer);
      start();
    };

    if (nextBtn) nextBtn.addEventListener('click', () => { show(index + 1); restart(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { show(index - 1); restart(); });
    start();
  });

  // Lightbox for gallery and slider images
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lightboxImage = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('[data-lightbox]').forEach((img) => {
      img.addEventListener('click', () => {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt || 'Expanded image';
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });

    const close = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImage.src = '';
    };

    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) close();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && lightbox.classList.contains('is-open')) close();
    });
  }

  // Free static contact form using mailto
  const form = document.getElementById('quote-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent('New service request from RJM website');
      const body = encodeURIComponent(
        `Company: ${data.get('company') || ''}\n` +
        `Contact Name: ${data.get('name') || ''}\n` +
        `Phone: ${data.get('phone') || ''}\n` +
        `Email: ${data.get('email') || ''}\n` +
        `Service Required: ${data.get('service') || ''}\n\n` +
        `Project Details:\n${data.get('details') || ''}`
      );
      window.location.href = `mailto:info@rjmdigital.ca?subject=${subject}&body=${body}`;
    });
  }
})();
