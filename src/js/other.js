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

  // Animation for rating stars
  function jumpingStarsAnim() {
    const animationDuration = 500; // Animation last time

    function startAnimation() {
      ratingStars.forEach((star, index) => {
        const delay = index * 200;
        setTimeout(() => {
          star.classList.add("jump");

          setTimeout(() => {
            star.classList.remove("jump");
          }, animationDuration);
        }, delay);
      });
    }

    function startInterval() {
      startAnimation(); // Running animation on start

      setInterval(() => {
        startAnimation(); // Running animation every 5 seconds
      }, 5000);
    }

    function startCycle() {
      startInterval();

      setInterval(() => {
        startInterval(); // Running interval every 5 seconds
      }, 10000);
    }

    startCycle(); // Running animation cycle on start
  }

  jumpingStarsAnim();

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
