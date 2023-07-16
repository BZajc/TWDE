function other() {
  const bookingButton = document.querySelectorAll(".booking-btn");
  const bookingSection = document.querySelector(".booking");
  const offersButton = document.querySelectorAll(".offers-btn");
  const offersSection = document.querySelector(".offers");
  const currencyBtn = document.querySelectorAll(".currency-btn");
  const headerCurrency = document.querySelector(".header-currency");
  const nav = document.querySelector(".nav");
  const currencyForm = document.querySelector(".currency-form");

  // Smooth scrolling to booking section
  function scrollToBooking() {
    bookingSection.scrollIntoView({ behavior: "smooth" });
  }
  bookingButton.forEach((el) => {
    el.addEventListener("click", scrollToBooking);
  });

  // Smooth scrolling to offers section
  function scrollToOffers() {
    offersSection.scrollIntoView({ behavior: "smooth" });
  }
  offersButton.forEach((el) => {
    el.addEventListener("click", scrollToOffers);
  });

  // Display nav for mobile view
  window.addEventListener("scroll", function () {
    // Get bottom border of the element
    const headerCurrencyRect = headerCurrency.getBoundingClientRect();

    if (headerCurrencyRect.bottom < 0) {
      nav.style.zIndex = "100";
      nav.style.opacity = "1";
    } else {
      nav.style.zIndex = "-100";
      nav.style.opacity = "0";
    }
  });

  currencyBtn.forEach((el) => {
    el.addEventListener("click", () => {
      currencyForm.classList.toggle("show-currency-form");
      currencyForm.classList.contains("show-currency-form")
        ? nav.classList.add("nav-display-form")
        : nav.classList.remove("nav-display-form");
    });
  });

}

export default other;
