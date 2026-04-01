const QUOTE_EMAIL = "hello@omnirp.ca";
const QUOTE_ENDPOINT = `https://formsubmit.co/ajax/${QUOTE_EMAIL}`;

const quoteForm = document.getElementById("quote-form");
const quoteResult = document.getElementById("quote-result");

quoteForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(quoteForm);

  quoteResult.textContent = "Sending your request...";

  try {
    const response = await fetch(QUOTE_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    quoteResult.textContent = "Thanks! Your quote request was sent. Check your email for a copy.";
    quoteForm.reset();
  } catch (_error) {
    quoteResult.textContent = "We couldn't send your request right now. Please email hello@omnirp.ca directly.";
  }
});

const navQuote = document.getElementById("nav-quote");
navQuote?.addEventListener("click", () => {
  setTimeout(() => quoteForm?.querySelector("input")?.focus(), 350);
});
