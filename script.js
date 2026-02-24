const materialRates = {
  PLA: 0.32,
  PETG: 0.38,
  ABS: 0.42,
  Nylon: 0.58,
  Resin: 0.54,
};

const form = document.getElementById('quote-form');
const material = document.getElementById('material');
const volume = document.getElementById('volume');
const quantity = document.getElementById('quantity');
const rush = document.getElementById('rush');
const quoteTotal = document.getElementById('quote-total');
const quoteStatus = document.getElementById('quote-status');

const QUOTE_API_ENDPOINT = 'https://httpbin.org/post';

function calculateQuote() {
  const selectedMaterial = materialRates[material.value] ?? materialRates.PLA;
  const volumeValue = Number(volume.value) || 0;
  const qtyValue = Number(quantity.value) || 0;

  const setupFee = 15;
  const materialCost = volumeValue * selectedMaterial;
  const subtotal = (setupFee + materialCost) * qtyValue;
  const rushMultiplier = rush.checked ? 1.35 : 1;
  const total = subtotal * rushMultiplier;

  quoteTotal.textContent = `$${total.toFixed(2)}`;
  return total;
}

[material, volume, quantity, rush].forEach((element) => {
  element.addEventListener('input', calculateQuote);
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const total = calculateQuote();

  quoteStatus.textContent = 'Sending quote to integration...';

  const payload = {
    material: material.value,
    volumeCm3: Number(volume.value),
    quantity: Number(quantity.value),
    rush: rush.checked,
    estimate: total,
    source: 'omnirp-landing-page',
  };

  try {
    const response = await fetch(QUOTE_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Quote integration error');
    }

    quoteStatus.textContent = 'Quote sent. We will follow up with finalized specs.';
  } catch (error) {
    quoteStatus.textContent = 'Integration unavailable. Your instant estimate is still shown above.';
  }
});

calculateQuote();
