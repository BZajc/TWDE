function other() {
  const bookingButton = document.querySelector(".booking-btn");
  const bookingSection = document.querySelector(".booking");
  const offersButton = document.querySelector(".offers-btn");
  const offersSection = document.querySelector(".offers");
  const ratingStarsBox = document.querySelector(".offers__rating");
  const ratingStars = document.querySelectorAll(".offers__rating img");

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
}

export default other;
