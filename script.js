(() => {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      nav.classList.toggle('open');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        nav.classList.remove('open');
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const slider = document.getElementById('reviewsSlider');
  if (slider) {
    const cards = Array.from(slider.children);
    const showReviews = document.getElementById('showReviews');
    let active = 0;
    let showAll = false;
    const update = () => {
      cards.forEach((card, index) => {
        card.style.display = window.innerWidth <= 780 && !showAll && index !== active ? 'none' : 'flex';
      });
    };

    document.querySelectorAll('[data-slider]').forEach((button) => {
      button.addEventListener('click', () => {
        showAll = false;
        active = button.dataset.slider === 'next'
          ? (active + 1) % cards.length
          : (active - 1 + cards.length) % cards.length;
        update();
      });
    });

    if (showReviews) {
      showReviews.addEventListener('click', () => {
        showAll = true;
        update();
        showReviews.textContent = 'ВСЕ ОТЗЫВЫ ПОКАЗАНЫ';
        setTimeout(() => {
          showReviews.textContent = 'ПОКАЗАТЬ ВСЕ';
        }, 1800);
      });
    }

    window.addEventListener('resize', update);
    update();
  }

  document.querySelectorAll('[data-certs]').forEach((button) => {
    button.addEventListener('click', () => {
      const certs = document.getElementById('certsImage');
      if (!certs) return;
      certs.animate([
        { transform: 'translateX(0)' },
        { transform: `translateX(${button.dataset.certs === 'next' ? '-' : ''}18px)` },
        { transform: 'translateX(0)' }
      ], { duration: 260 });
    });
  });

  document.querySelectorAll('[data-notice]').forEach((link) => {
    link.addEventListener('click', () => {
      link.textContent = link.dataset.notice;
      setTimeout(() => {
        link.textContent = 'ПОКАЗАТЬ ВСЕ';
      }, 1800);
    });
  });

  const form = document.getElementById('contactForm');
  const message = document.getElementById('formMessage');
  if (form && message) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      message.textContent = 'Заявка отправлена. Мы скоро свяжемся с вами.';
      form.reset();
    });
  }

  const searchForm = document.getElementById('searchForm');
  const searchMessage = document.getElementById('searchMessage');
  if (searchForm && searchMessage) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = searchForm.elements.search;
      const value = input.value.trim().toLowerCase();
      if (!value) {
        searchMessage.textContent = 'Введите запрос для поиска';
        return;
      }

      const sections = Array.from(document.querySelectorAll('main section[id]'));
      const match = sections.find((section) => section.textContent.toLowerCase().includes(value));
      if (match) {
        searchMessage.textContent = 'Раздел найден';
        match.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        searchMessage.textContent = 'Ничего не найдено';
      }
    });
  }
})();
