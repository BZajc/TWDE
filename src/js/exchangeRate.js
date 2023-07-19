import axios from "axios";

function exchangeRate() {
  const currencyDivs = document.querySelectorAll(".currency-prompt__new-currency"); // Get all elements with class "currency-prompt__new-currency"
  const convertedAmountElements = document.querySelectorAll(`[data-type="price"]`); // Get all elements with data-type="price"

  const API_KEY = "20a827b13e43a9809098b896"; // Your API key
  const localStorageKey = "selectedCurrency"; // Key for localStorage to store selected currency

  async function getCurrency() {
    try {
      let selectedCurrency = localStorage.getItem(localStorageKey) || "EUR"; // Get the selected currency from localStorage, defaulting to "EUR"

      currencyDivs.forEach((div) => {
        if (div.classList.contains("selected")) {
          selectedCurrency = div.getAttribute("value"); // Get the selected currency from the div with class "selected"
        }
      });

      const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/PLN`); // Get the exchange rates data from the API
      const rates = response.data.conversion_rates; // Extract the conversion rates

      convertedAmountElements.forEach((el) => {
        const originalAmount = parseFloat(el.dataset.value);
        const convertedAmount = originalAmount * rates[selectedCurrency];

        el.textContent = `${convertedAmount.toFixed(2)} ${selectedCurrency}`; // Display the converted amount with the selected currency
      });

      localStorage.setItem(localStorageKey, selectedCurrency); // Store the selected currency in localStorage

      // Remove the "show-currency-prompt" class from the "currency-prompt" element
      const currencyPrompt = document.querySelector(".currency-prompt");
      currencyPrompt.classList.remove("show-currency-prompt");
    } catch (err) {
      console.log("There was an error while converting currency:", err);
    }
  }

  currencyDivs.forEach((div) => {
    div.addEventListener("click", () => {
      currencyDivs.forEach((div) => div.classList.remove("selected"));
      div.classList.add("selected");
      getCurrency(); // Call the getCurrency function when a currency div is clicked
    });
  });

  getCurrency(); // Call the getCurrency function initially
}

export default exchangeRate;