const QUOTE_WEBHOOK_URL = "";

const pricing = {
  service: {
    parts: 25,
    prototype: 120,
    manufacturing: 300,
  },
  material: {
    pla: 1,
    petg: 1.25,
    resin: 1.5,
  },
  turnaround: {
    standard: 1,
    rush: 1.6,
  },
};

const quoteForm = document.querySelector("#quote-form");
const quoteResult = document.querySelector("#quote-result");

function calculateQuote(data) {
  const base = pricing.service[data.service] || 0;
  const materialFactor = pricing.material[data.material] || 1;
  const turnaroundFactor = pricing.turnaround[data.turnaround] || 1;
  const quantity = Math.max(1, Number(data.quantity) || 1);
  const subtotal = base * materialFactor * quantity;
  const setupFee = quantity > 10 ? 40 : 20;
  const total = (subtotal + setupFee) * turnaroundFactor;
  return Math.round(total * 100) / 100;
}

async function sendToWebhook(payload) {
  if (!QUOTE_WEBHOOK_URL) return;

  try {
    await fetch(QUOTE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.warn("Quote webhook submission failed", error);
  }
}

quoteForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(quoteForm);
  const payload = Object.fromEntries(formData.entries());
  const amount = calculateQuote(payload);

  quoteResult.textContent = `Estimated instant quote: CAD $${amount.toFixed(2)}.`;
  await sendToWebhook({ ...payload, estimate: amount, currency: "CAD" });
});
