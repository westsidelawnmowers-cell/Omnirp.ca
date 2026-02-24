document.getElementById('year').textContent = new Date().getFullYear();

const quoteForm = document.querySelector('.quote-form');
if (quoteForm) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = quoteForm.querySelector('button');
    const previousText = button.textContent;
    button.textContent = 'Submitted ✓';
    button.disabled = true;
    setTimeout(() => {
      button.textContent = previousText;
      button.disabled = false;
      quoteForm.reset();
    }, 1800);
  });
}
