import axios from "axios";

const bookingButton = document.querySelector(".booking-btn");
const bookingSection = document.querySelector(".booking");
const imageRotateFix = document.querySelector(".display-images__rotate-fix");
const imageContainerBg = document.querySelector(
  ".display-images__background-image"
);
const imagesTextBg = document.querySelector(".display-images__text-background");
const imagesText = document.querySelector(".display-images__text");
const imageError = document.querySelector(".display-images__error");
const imageStopStart = document.querySelector(".display-images__stop-start");
const pixabayLink = document.querySelector(".display-images__pixabay a");
const imageAuthor = document.querySelector(".display-images__author")
const imageManageBox = document.querySelector(".display-images__manage-box")
const imageDelivered = document.querySelector(".display-images__delivered")

let previousText = null;
let previousImage = null;
let errorOccuredPixabay = false;
let isRunning = true;
let clickBlocked = false

// Check if interval exist to display Pixabay images
let intervalId = null;

// Smooth scrolling to booking section
function scrollToBooking() {
  bookingSection.scrollIntoView({ behavior: "smooth" });
}
bookingButton.addEventListener("click", scrollToBooking);

// Pixabay API to download random images for display image section
const getImages = async () => {
  const apiKey = "27929930-2f9fa1fa317d1e41006cd69e4";
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=turystyka&image_type=photo&per_page=50`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    
    // Getting random image
    const randomIndex = Math.floor(Math.random() * data.hits.length);
    
    // Getting author of the image
    const author = data.hits[randomIndex].user;

    // Link to the image page
    const linkToPage = data.hits[randomIndex].pageURL

    console.log(data.hits[randomIndex]);

    // Check if the randomly selected image is the same as the previous one
    while (data.hits[randomIndex].webformatURL === previousImage) {
      randomIndex = Math.floor(Math.random() * data.hits.length);
    }

    const imageUrl = data.hits[randomIndex].webformatURL;

    // Creating new image element
    const image = new Image();
    image.src = imageUrl;

    // Author of the image
    imageAuthor.textContent = author

    // Wait for images to load
    image.addEventListener("load", () => {
      loadImagesAnimation(imageUrl);
    });

    // Add link of the image to the button
    pixabayLink.addEventListener("click", () => {
      pixabayLink.href = linkToPage
      pixabayLink.target = "_blank";
    })

  } catch (error) {
    console.log("An error occurred while fetching the images:", error);
    pixabayCatchStyles();
    errorOccurredPixabay = true;
  }
};

// Styles for catch in Pixabay API function
const pixabayCatchStyles = () => {
  imagesTextBg.style.display = "none";
  imageManageBox.style.display = "none"
  imageDelivered.style.display = "none"
  imageError.style.display = "block";
  imageRotateFix.style.opacity = "1";
  imageContainerBg.style.backgroundImage = `url('https://i.imgflip.com/3kk9xq.png')`;
};

// Animation for Pixabay Images
function loadImagesAnimation(imageUrl) {
  // Apply transition effect to background images
  imageRotateFix.style.transition = "opacity 1s";
  imageContainerBg.style.transition = "opacity 1s";

  // Display images after loading with fading effect

  // Hide images when loading the new ones
  imageRotateFix.style.opacity = 0;
  imageContainerBg.style.opacity = 0;

  setTimeout(() => {
    // Set images as background
    imageRotateFix.style.backgroundImage = `url('${imageUrl}')`;
    imageContainerBg.style.backgroundImage = `url('${imageUrl}')`;
    imagesText.textContent = randomTextPixabay();

    setTimeout(() => {
      // Display images
      imageRotateFix.style.opacity = 1;
      imageContainerBg.style.opacity = 1;
    }, 100);
  }, 1000);
}

// Random sentences for Pixabay images
const randomTextPixabay = () => {
  const options = [
    "Explore the world",
    "Embrace adventure",
    "Discover more",
    "Wanderlust awaits",
    "Unleash wanderlust",
    "Journey to unknown",
    "Chase your dreams",
    "Thrill of travel",
    "Create memories",
    "Let the world guide",
  ];

  let randomTextIndex = Math.floor(Math.random() * options.length);

  // Check if the randomly selected text is the same as the previous one
  while (options[randomTextIndex] === previousText) {
    randomTextIndex = Math.floor(Math.random() * options.length);
  }

  const randomText = options[randomTextIndex];
  previousText = randomText;

  return randomText;
};

// Running Pixabay API only when the user sees the element (imageContainerBg)
const isVisiblePixabay = function () {
  const element = imageContainerBg;
  const elementHeight = element.offsetHeight;
  const elementTop = element.getBoundingClientRect().top;
  const elementBottom = elementTop + elementHeight;
  const windowHeight = window.innerHeight;

  // Checking if user sees the element
  if (elementTop < windowHeight && elementBottom > 0) {
    // Run interval if it doesn't exist
    if (!intervalId) {
      intervalId = setInterval(() => {
        if (!errorOccuredPixabay) getImages();
      }, 5000);
    }
  }

  // Checking if element is visible for user
  if (elementTop > windowHeight || elementBottom < 0) {
    // Stop interval if exist
    clearInterval(intervalId);
    intervalId = null; // Reset interval to null
  }
};

window.addEventListener("load", function () {
  // Display images after loading the page
  getImages();
  isVisiblePixabay();
});

window.addEventListener("scroll", () => {
  isVisiblePixabay();
});

// Scrolling to the top of the page after reload
// window.addEventListener("beforeunload", function () {
//   window.scrollTo(0, 0);
// });

// Stop or start displaying Pixabay images
const toggleGetImages = () => {
  if (clickBlocked) {
    return // Do not allow user to click button
  }

  if (isRunning) {
    clearInterval(intervalId); // Stop interval
    intervalId = null;
  } else {
    getImages()
    isVisiblePixabay()
  }
  isRunning = !isRunning; // Reverse flag

  // Change textContent of the button
  imageStopStart.textContent = isRunning ? "Stop changing" : "Start changing";

  // Block button from being clicked for one second
  clickBlocked = true;
  setTimeout(() => {
    clickBlocked = false;
  }, 1000);
};

imageStopStart.addEventListener("click", toggleGetImages);
