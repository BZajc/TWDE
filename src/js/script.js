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

let previousText = null;
let previousImage = null;
let errorOccuredPixabay = false;

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
    let randomIndex = Math.floor(Math.random() * data.hits.length);

    // Check if the randomly selected image is the same as the previous one
    while (data.hits[randomIndex].largeImageURL === previousImage) {
      randomIndex = Math.floor(Math.random() * data.hits.length);
    }

    const imageUrl = data.hits[randomIndex].largeImageURL;

    // Creating new image element
    const image = new Image();
    image.src = imageUrl;

    // Wait for images to load
    image.addEventListener("load", () => {
      loadImagesAnimation(imageUrl);
    });
  } catch (error) {
    console.log("An error occurred while fetching the images:", error);
    pixabayCatchStyles();
    errorOccurredPixabay = true;
  }
};

// Styles for catch in Pixabay API function
const pixabayCatchStyles = () => {
  imagesTextBg.style.display = "none";
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
  setTimeout(() => {
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

window.addEventListener("load", function () {
  // Display images after loading the page
  getImages();

  // Change images every 5 seconds
  setInterval(() => {
    if (!errorOccuredPixabay) getImages();
  }, 5000);
});
