document.getElementById('year').textContent = new Date().getFullYear();

const form = document.querySelector('.quote-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const button = form.querySelector('button');
  const originalLabel = button.textContent;
  button.textContent = 'Request Sent ✓';
  button.disabled = true;

  setTimeout(() => {
    button.textContent = originalLabel;
    button.disabled = false;
    form.reset();
  }, 2200);
});
