function other() {
  const bookingButton = document.querySelector(".booking-btn");
  const bookingSection = document.querySelector(".booking");

  // Smooth scrolling to booking section
  function scrollToBooking() {
    bookingSection.scrollIntoView({ behavior: "smooth" });
  }
  bookingButton.addEventListener("click", scrollToBooking);
}

export default other