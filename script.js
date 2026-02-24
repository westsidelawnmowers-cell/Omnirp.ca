const quoteForm = document.getElementById("quote-form");
const quoteResult = document.getElementById("quote-result");

const materialRates = {
  pla: 1,
  petg: 1.15,
  abs: 1.25,
  nylon: 1.45,
};

const finishingRates = {
  standard: 1,
  premium: 1.35,
};

async function sendQuoteLead(payload) {
  const endpoint = "https://httpbin.org/post";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Integration request failed");
  }
}

quoteForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(quoteForm);
  const material = formData.get("material");
  const quantity = Number(formData.get("quantity"));
  const hours = Number(formData.get("hours"));
  const finishing = formData.get("finishing");

  const baseCost = quantity * hours * 12;
  const estimate = baseCost * materialRates[material] * finishingRates[finishing];

  quoteResult.textContent = "Calculating your quote...";

  try {
    await sendQuoteLead({ material, quantity, hours, finishing, estimate });
    quoteResult.textContent = `Estimated instant quote: $${estimate.toFixed(2)} CAD (submitted to quote integration).`;
  } catch (error) {
    quoteResult.textContent = `Estimated instant quote: $${estimate.toFixed(2)} CAD (offline estimate shown, integration unavailable).`;
  }
});
