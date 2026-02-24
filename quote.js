const QUOTE_ENDPOINT = "https://hook.us1.make.com/replace-with-your-live-webhook";

const materialMultipliers = {
  pla: 1,
  abs: 1.25,
  resin: 1.45,
  nylon: 1.6
};

const quoteForm = document.getElementById("quote-form");
const quoteResult = document.getElementById("quote-result");

const estimateFallback = (material, quantity, hours) => {
  const baseRate = 18;
  const multiplier = materialMultipliers[material] || 1;
  return Math.round(baseRate * multiplier * quantity * hours);
};

quoteForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(quoteForm);
  const payload = {
    material: String(formData.get("material") || "pla"),
    quantity: Number(formData.get("quantity") || 1),
    hours: Number(formData.get("hours") || 1),
    email: String(formData.get("email") || "")
  };

  quoteResult.textContent = "Getting instant quote...";

  try {
    const response = await fetch(QUOTE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Quote integration unavailable");
    }

    const data = await response.json();
    const quoteValue = data.quote ?? data.amount;

    if (!quoteValue) {
      throw new Error("No quote returned");
    }

    quoteResult.textContent = `Estimated instant quote: $${quoteValue}`;
  } catch (_error) {
    const fallback = estimateFallback(payload.material, payload.quantity, payload.hours);
    quoteResult.textContent = `Live integration is not configured yet. Fallback estimate: $${fallback}. Connect your Make/Zapier webhook in quote.js.`;
  }
});

const navQuote = document.getElementById("nav-quote");
navQuote?.addEventListener("click", () => {
  setTimeout(() => quoteForm?.querySelector("select")?.focus(), 350);
});
