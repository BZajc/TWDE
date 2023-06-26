const bookingButton = document.querySelector(".booking-btn");
const bookingSection = document.querySelector(".booking");

function scrollToBooking() {
    bookingSection.scrollIntoView({ behavior: "smooth" });
}

bookingButton.addEventListener("click", scrollToBooking);