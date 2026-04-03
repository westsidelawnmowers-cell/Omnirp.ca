const QUOTE_NOTIFICATION_EMAIL = "hello@omnirp.ca";

const materialMultipliers = {
  pla: 1,
  abs: 1.25,
  resin: 1.45,
  nylon: 1.6
};

const quoteForm = document.getElementById("quote-form");
const quoteResult = document.getElementById("quote-result");

const buildMailtoLink = (payload, estimate) => {
  const subject = encodeURIComponent("New Quote Request");
  const body = encodeURIComponent(
    [
      `Customer Email: ${payload.email}`,
      `Material: ${payload.material.toUpperCase()}`,
      `Quantity: ${payload.quantity}`,
      `Estimated Print Hours: ${payload.hours}`,
      `Fallback Estimate: $${estimate}`
    ].join("\n")
  );
  return `mailto:${QUOTE_NOTIFICATION_EMAIL}?subject=${subject}&body=${body}`;
};

const estimateFallback = (material, quantity, hours) => {
  const baseRate = 18;
  const multiplier = materialMultipliers[material] || 1;
  return Math.round(baseRate * multiplier * quantity * hours);
};

quoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(quoteForm);
  const payload = {
    material: String(formData.get("material") || "pla"),
    quantity: Number(formData.get("quantity") || 1),
    hours: Number(formData.get("hours") || 1),
    email: String(formData.get("email") || "")
  };

  const estimate = estimateFallback(payload.material, payload.quantity, payload.hours);
  const mailtoLink = buildMailtoLink(payload, estimate);

  quoteResult.innerHTML = `Estimated quote: $${estimate}. Opening your email app to send this request to ${QUOTE_NOTIFICATION_EMAIL}... If it does not open, <a href="${mailtoLink}">click here</a>.`;
  window.location.href = mailtoLink;
});

const navQuote = document.getElementById("nav-quote");
navQuote?.addEventListener("click", () => {
  setTimeout(() => quoteForm?.querySelector("select")?.focus(), 350);
});
