function other() {
  const bookingButton = document.querySelector(".booking-btn");
  const bookingSection = document.querySelector(".booking");
  const offersButton = document.querySelector(".offers-btn");
  const offersSection = document.querySelector(".offers");
  const ratingStars = document.querySelectorAll(".offers__rating img");
  const currencyBtn = document.querySelector(".currency-btn");
  const nav = document.querySelector(".nav");

  // Smooth scrolling to booking section
  function scrollToBooking() {
    bookingSection.scrollIntoView({ behavior: "smooth" });
  }
  bookingButton.addEventListener("click", scrollToBooking);

  // Smooth scrolling to offers section
  function scrollToOffers() {
    offersSection.scrollIntoView({ behavior: "smooth" });
  }
  offersButton.addEventListener("click", scrollToOffers);

  // Display nav for mobile view
  window.addEventListener("scroll", function () {

    // Get bottom border of the element
    const currencyBtnRect = currencyBtn.getBoundingClientRect();

    if (currencyBtnRect.bottom < 0) {
      nav.style.zIndex = "100";
      nav.style.opacity = "1";
    } else {
      nav.style.zIndex = "-100";
      nav.style.opacity = "0";
    }
  });
}

export default other;
