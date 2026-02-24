const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const quoteForm = document.querySelector('.quote-form');
const formNote = document.querySelector('.form-note');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });
}

if (quoteForm && formNote) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formNote.textContent = 'Thanks! Your quote request has been captured. OmniRP will contact you shortly.';
    quoteForm.reset();
  });
}
