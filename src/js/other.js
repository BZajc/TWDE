function other() {
  const bookingButton = document.querySelectorAll(".booking-btn");
  const bookingSection = document.querySelector(".booking");
  const offersButton = document.querySelectorAll(".offers-btn");
  const offersSection = document.querySelector(".offers");
  const currencyBtn = document.querySelectorAll(".currency-btn");
  const headerCurrency = document.querySelector(".header-currency");
  const nav = document.querySelector(".nav");
  const currencyPrompt = document.querySelector(".currency-prompt");

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

  // Show change currency form on click
  currencyBtn.forEach((el) => {
    el.addEventListener("click", () => {
      currencyPrompt.classList.toggle("show-currency-prompt");
      currencyPrompt.classList.contains("show-currency-prompt")
        ? nav.classList.add("nav-display-form")
        : nav.classList.remove("nav-display-form");
  
      // Adding ID URL after showing currency form
      const newURL = "#currency-form"; // ID URL
      history.pushState(null, "", newURL);
    });
  });
  
  // Handling hashchange to hide currency form instead of leaving the page
  window.addEventListener("hashchange", () => {
    if (currencyPrompt.classList.contains("show-currency-prompt")) {
      currencyPrompt.classList.remove("show-currency-prompt");
    }
  });

  // Change info in contact section
  window.addEventListener('DOMContentLoaded', () => {
    const dots = document.querySelectorAll('.contact__dot');
    const infos = document.querySelectorAll('.contact__info');
    let currentIndex = 0;
    let intervalId = null; // Variable to store the interval ID
    let isAutoRotateEnabled = true; // Flag to track if auto rotate is enabled
  
    const setActiveAndVisible = (index) => {
      // Remove the 'visible' class from all contact__info elements except the current index
      infos.forEach((info, i) => {
        if (i !== index) {
          info.classList.remove('visible');
        }
      });
  
      // Remove the 'active' class from all contact__dot elements
      dots.forEach((dot) => {
        dot.classList.remove('active');
      });
  
      // Add the 'visible' class to the corresponding contact__info element
      infos[index].classList.add('visible');
  
      // Add the 'active' class to the corresponding contact__dot element
      dots[index].classList.add('active');
    };
  
    const autoRotate = () => {
      if (!isAutoRotateEnabled) {
        return; // Exit if auto rotate is disabled
      }
      currentIndex = (currentIndex + 1) % infos.length;
      setActiveAndVisible(currentIndex);
    };
  
    const startAutoRotate = () => {
      // Start auto rotation every 3 seconds
      intervalId = setInterval(autoRotate, 3000);
    };
  
    const stopAutoRotate = () => {
      // Stop auto rotation
      clearInterval(intervalId);
    };
  
    const handleScroll = () => {
      const contactElement = document.querySelector('.contact');
      const rect = contactElement.getBoundingClientRect();
      const isContactVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
  
      if (!isAutoRotateEnabled && isContactVisible) {
        isAutoRotateEnabled = true;
        startAutoRotate();
      } else if (isAutoRotateEnabled && !isContactVisible) {
        isAutoRotateEnabled = false;
        stopAutoRotate();
      }
    };
  
    // Call setActiveAndVisible once on page load
    setActiveAndVisible(currentIndex);
  
    // Assign click event handling to contact__dot elements
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        stopAutoRotate(); // Stop auto rotation on click
        currentIndex = Array.from(dots).indexOf(dot);
        setActiveAndVisible(currentIndex); // Manually set the selected element as visible
      });
    });
  
    // Start auto rotation on page load
    startAutoRotate();
  
    // Add scroll event listener to check visibility of the contact element
    window.addEventListener('scroll', handleScroll);
  });
  
  


}


export default other;
