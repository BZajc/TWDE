import axios from "axios";

function exchangeRate() {
  const currencySelect = document.querySelector("#currencySelect"); // Get the currency select element
  const convertedAmountElements = document.querySelectorAll(`[data-type="price"]`); // Get all elements with data-type="price"
  const actualCurrencyOption = document.querySelector(".actual-currency-option"); // Get the element with the class "actual-currency-option"

  const API_KEY = "c08dafddce738313737daf36"; // Your API key
  const localStorageKey = "selectedCurrency"; // Key for localStorage to store selected currency

  async function getCurrency() {
    try {
      let selectedCurrency = currencySelect.value || localStorage.getItem(localStorageKey) || "EUR"; // Get the selected currency from select or localStorage, defaulting to "EUR"

      if (selectedCurrency === "Actual Currency" || currencySelect.selectedIndex === 0) {
        selectedCurrency = "EUR"; // If the selected currency is "Actual Currency" or the first option, set it to "EUR"
        currencySelect.value = selectedCurrency; // Set the value of the select element to the default currency
      }

      const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/PLN`); // Get the exchange rates data from the API
      const rates = response.data.conversion_rates; // Extract the conversion rates

      convertedAmountElements.forEach((el) => {
        const originalAmount = parseFloat(el.dataset.value);
        const convertedAmount = originalAmount * rates[selectedCurrency];

        el.textContent = `${convertedAmount.toFixed(2)} ${selectedCurrency}`; // Display the converted amount with the selected currency
      });

      actualCurrencyOption.textContent = `Actual Currency: ${selectedCurrency}`; // Display the selected currency in the element with the class "actual-currency-option"

      localStorage.setItem(localStorageKey, selectedCurrency); // Store the selected currency in localStorage
    } catch (err) {
      console.log("There was an error while converting currency:", err);
    }
  }

  currencySelect.addEventListener("change", getCurrency); // Listen for change event on currency select
  getCurrency(); // Call the getCurrency function initially
}

export default exchangeRate;