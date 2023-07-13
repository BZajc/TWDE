import axios from "axios";

function exchangeRate() {
  // Getting selector value
  const currencySelect = document.querySelector("#currencySelect")
  const convertedAmountElements = document.querySelectorAll(".convertedAmount");
  const actualCurrencyOption = document.querySelector(".actual-currency-option")

  const API_KEY = "ef229196c2a6811a5f5836c1"

  async function getCurrency() {
    try {
      const selectedCurrency = currencySelect.value
      const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/PLN`)
      const rates = response.data.conversion_rates

      // Converting currency
      convertedAmountElements.forEach((el) => {
        const originalAmount = parseFloat(el.innerText)
        // Getting new amount after conversion
        const convertedAmount = originalAmount * rates[selectedCurrency]

        // Setting the value of data attribute to be the same as the text
        el.setAttribute('data-value', originalAmount);

        el.innerText = `${originalAmount} PLN = ${convertedAmount.toFixed(2)} ${selectedCurrency}`

        // Changing first option of the select menu to actual currency
        actualCurrencyOption.textContent = `Actual Currency: ${currencySelect.value}`
      })
    } catch(err) {
      console.log("There was an error while converting currency:", err);
    }
  }

  currencySelect.addEventListener("change", getCurrency)
  getCurrency()
}

export default exchangeRate;
