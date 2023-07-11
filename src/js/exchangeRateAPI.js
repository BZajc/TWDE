import axios from 'axios';

const exchangeRateAPI = async () => {
    const apiKey = 'ef229196c2a6811a5f5836c1';
    const baseCurrency = 'PLN';
    const defaultCurrency = 'PLN';
    let selectedCurrency = defaultCurrency;
    let baseRate = 1;
  
    const currencySelect = document.getElementById('currencySelect');
    currencySelect.addEventListener('change', () => {
      selectedCurrency = currencySelect.value;
      updatePrices();
    });
  
    async function updatePrices() {
      try {
        if (selectedCurrency !== baseCurrency) {
          const response = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${baseCurrency}/${selectedCurrency}`);
          baseRate = response.data.conversion_rate;
        }
  
        const priceElements = document.querySelectorAll('.price');
  
        priceElements.forEach(async element => {
          const priceInBaseCurrency = parseFloat(element.getAttribute('data-price'));
          const currency = element.getAttribute('data-currency');
  
          let priceInSelectedCurrency;
          if (currency === selectedCurrency) {
            priceInSelectedCurrency = priceInBaseCurrency;
          } else if (currency === baseCurrency) {
            priceInSelectedCurrency = Math.round(priceInBaseCurrency * baseRate);
          } else {
            const currencyRateResponse = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${currency}/${selectedCurrency}`);
            const currencyRate = currencyRateResponse.data.conversion_rate;
            priceInSelectedCurrency = Math.round(priceInBaseCurrency * currencyRate);
          }
  
          element.setAttribute('data-currency', selectedCurrency);
          element.setAttribute('data-price', priceInSelectedCurrency);
  
          const spanElement = element.querySelector('span');
          if (spanElement) {
            spanElement.textContent = selectedCurrency;
          }
  
          element.textContent = formatPrice(priceInSelectedCurrency) + ' ' + selectedCurrency;
        });
      } catch (error) {
        console.log('Wystąpił błąd:', error);
      }
    }
  
    function formatPrice(price) {
      const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      return formattedPrice;
    }
  
    await updatePrices();
}

export default exchangeRateAPI