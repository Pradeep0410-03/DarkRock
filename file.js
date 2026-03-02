const API_URL = "https://api.exchangerate.host/latest";
const CURRENCIES = [
  "USD", "EUR", "GBP", "INR", "JPY", "AUD", "CAD", "CHF", "CNY", "NZD"
];

const form = document.querySelector("#converter-form");
const amountInput = document.querySelector("#amount");
const fromCurrencySelect = document.querySelector("#from-currency");
const toCurrencySelect = document.querySelector("#to-currency");
const resultEl = document.querySelector("#result");
const swapBtn = document.querySelector("#swap-btn");

function populateCurrencyOptions() {
  CURRENCIES.forEach((currency) => {
    const fromOption = document.createElement("option");
    fromOption.value = currency;
    fromOption.textContent = currency;

    const toOption = fromOption.cloneNode(true);

    fromCurrencySelect.appendChild(fromOption);
    toCurrencySelect.appendChild(toOption);
  });

  fromCurrencySelect.value = "USD";
  toCurrencySelect.value = "INR";
}

async function fetchRate(base, target) {
  const response = await fetch(`${API_URL}?base=${base}&symbols=${target}`);

  if (!response.ok) {
    throw new Error("Failed to fetch exchange rates.");
  }

  const data = await response.json();
  const rate = data?.rates?.[target];

  if (!rate) {
    throw new Error("Exchange rate not available for selected currencies.");
  }

  return rate;
}

function formatCurrency(value, currencyCode) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 2
  }).format(value);
}

async function convertCurrency(event) {
  event.preventDefault();

  const amount = Number(amountInput.value);
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;

  if (!Number.isFinite(amount) || amount < 0) {
    resultEl.classList.add("error");
    resultEl.textContent = "Please enter a valid amount (0 or greater).";
    return;
  }

  resultEl.classList.remove("error");
  resultEl.textContent = "Fetching live rate...";

  try {
    const rate = await fetchRate(fromCurrency, toCurrency);
    const convertedAmount = amount * rate;

    resultEl.innerHTML = `
      <strong>${formatCurrency(amount, fromCurrency)}</strong> =
      <strong>${formatCurrency(convertedAmount, toCurrency)}</strong><br>
      1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}
    `;
  } catch (error) {
    resultEl.classList.add("error");
    resultEl.textContent = error.message;
  }
}

function swapCurrencies() {
  const currentFrom = fromCurrencySelect.value;
  fromCurrencySelect.value = toCurrencySelect.value;
  toCurrencySelect.value = currentFrom;
}

populateCurrencyOptions();
form.addEventListener("submit", convertCurrency);
swapBtn.addEventListener("click", swapCurrencies);
