import axios from "axios";

function exchangeRate() {
  const currencySelect = document.querySelector("#currencySelect");
  const convertedAmountElements = document.querySelectorAll(`[data-type="price"]`);
  const actualCurrencyOption = document.querySelector(".actual-currency-option");

  const API_KEY = "c08dafddce738313737daf36";
  const localStorageKey = "selectedCurrency";

  async function getCurrency() {
    try {
      const selectedCurrency = currencySelect.value || localStorage.getItem(localStorageKey) || "EUR";
      const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/PLN`);
      const rates = response.data.conversion_rates;

      convertedAmountElements.forEach((el) => {
        const originalAmount = parseFloat(el.dataset.value);
        const convertedAmount = originalAmount * rates[selectedCurrency];

        el.textContent = `${convertedAmount.toFixed(2)} ${selectedCurrency}`;
      });

      actualCurrencyOption.textContent = `Actual Currency: ${selectedCurrency}`;

      localStorage.setItem(localStorageKey, selectedCurrency);
    } catch (err) {
      console.log("There was an error while converting currency:", err);
    }
  }

  currencySelect.addEventListener("change", getCurrency);
  getCurrency();
}

export default exchangeRate;
