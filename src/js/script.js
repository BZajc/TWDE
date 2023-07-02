import axios from "axios";

const bookingButton = document.querySelector(".booking-btn");
const bookingSection = document.querySelector(".booking");

// Smooth scrolling to booking section
function scrollToBooking() {
  bookingSection.scrollIntoView({ behavior: "smooth" });
}
bookingButton.addEventListener("click", scrollToBooking);

// Pixabay API to download random images for display image section
const getImages = async () => {
  const imageContainer = document.querySelector(".display-images__rotate-fix");
  const imageContainerBg = document.querySelector(
    ".display-images__background-image"
  );
  const apiKey = "27929930-2f9fa1fa317d1e41006cd69e4";
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=turystyka&image_type=photo&per_page=50`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Getting random image
    const randomIndex = Math.floor(Math.random() * data.hits.length);
    const imageUrl = data.hits[randomIndex].largeImageURL;

    // Creating new image element
    const image = new Image();
    image.src = imageUrl;

    image.addEventListener('load', () => {
      imageContainer.style.backgroundImage = `url('${imageUrl}')`;
      imageContainerBg.style.backgroundImage = `url('${imageUrl}')`;

      imageContainer.classList.add('lazy-loading');
    });

    // Applying image as a background
    imageContainer.style.backgroundImage = `url('${imageUrl}')`;
    imageContainerBg.style.backgroundImage = `url('${imageUrl}')`;
    console.log(data);
  } catch (error) {
    console.log("An error occurred while fetching the images:", error);
  }
};

window.addEventListener("load", function () {
  getImages();
});
