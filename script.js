document.documentElement.classList.add('js-enabled');

const copyButtons = document.querySelectorAll('[data-copy-target]');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'fixed';
  textArea.style.top = '-999px';
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  textArea.remove();
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  fallbackCopy(text);
}

copyButtons.forEach((button) => {
  const originalLabel = button.textContent;
  const targetId = button.getAttribute('data-copy-target');
  const target = targetId ? document.getElementById(targetId) : null;

  if (!target) {
    button.disabled = true;
    return;
  }

  button.addEventListener('click', async () => {
    await copyText(target.textContent.trim());
    button.textContent = 'Copied';
    button.setAttribute('aria-live', 'polite');

    window.setTimeout(() => {
      button.textContent = originalLabel;
      button.removeAttribute('aria-live');
    }, 1600);
  });
});

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const sections = Array.from(document.querySelectorAll('main section[id]'));
const linkById = new Map(
  Array.from(navLinks).map((link) => [link.getAttribute('href').slice(1), link])
);

if ('IntersectionObserver' in window && sections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) {
        return;
      }

      navLinks.forEach((link) => link.classList.remove('active'));
      const activeLink = linkById.get(visible.target.id);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    },
    {
      rootMargin: '-20% 0px -65% 0px',
      threshold: [0.1, 0.25, 0.5],
    }
  );

  sections.forEach((section) => observer.observe(section));
}
