const lightbox = document.getElementById('imageLightbox');
const lightboxImage = document.getElementById('imageLightboxImage');
const lightboxTitle = document.getElementById('imageLightboxTitle');
const lightboxOriginal = document.getElementById('imageLightboxOriginal');
const lightboxClose = document.getElementById('imageLightboxClose');

if (
  lightbox instanceof HTMLDialogElement
  && lightboxImage instanceof HTMLImageElement
  && lightboxTitle
  && lightboxOriginal instanceof HTMLAnchorElement
  && lightboxClose instanceof HTMLButtonElement
) {
  document.querySelectorAll('[data-lightbox-title]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (!(link instanceof HTMLAnchorElement) || typeof lightbox.showModal !== 'function') {
        return;
      }

      event.preventDefault();
      lightboxImage.src = link.href;
      lightboxImage.alt = link.dataset.lightboxAlt || '';
      lightboxTitle.textContent = link.dataset.lightboxTitle || 'Visualization';
      lightboxOriginal.href = link.href;
      document.body.classList.add('lightbox-open');
      lightbox.showModal();
      lightboxClose.focus();
    });
  });

  lightboxClose.addEventListener('click', () => lightbox.close());

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      lightbox.close();
    }
  });

  lightbox.addEventListener('close', () => {
    document.body.classList.remove('lightbox-open');
    lightboxImage.removeAttribute('src');
  });
}
