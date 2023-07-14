function renderOffers() {
const offersListElement = document.querySelector(".offers__list");

const offerRatingElement = document.createElement("div");
offerRatingElement.classList.add("offers__rating");

const ratingStarImage = document.createElement("img");
ratingStarImage.src = "./src/img/offers/rating-star.svg";
ratingStarImage.alt = "rating star";

offerRatingElement.appendChild(ratingStarImage);

const offerTemplate = `
  <div class="offers__offer">
    <div class="offers__image"></div>
    <div class="offers__main-info">
      <div class="offers__destination">Vienna, Austria</div>
      <div class="offers__rating">
        ${offerRatingElement.innerHTML}
      </div>
    </div>
    <div class="offers__additional-info">
      <div class="offers__additional-info-small-container">
        <div class="offers__average">
          <p>8.9</p>
        </div>
        <div class="offers__rate-place">
          <p>Rate place</p>
        </div>
      </div>
      <div class="offers__reviews-n-price">
        <div class="offers__reviews">
          <p>115 reviews</p>
        </div>
        <div class="offers__price">
          <p>from</p>
          <p data-type="price" data-value="230">230</p>
        </div>
      </div>
    </div>
    <div class="offers__bottom-svg">
      <img src="./src/img/offers/offers-bottom.svg" alt="" />
    </div>
  </div>
`;

  for (let i = 0; i < 4; i++) {
    const offerElement = document.createElement("div");
    offerElement.innerHTML = offerTemplate.trim();

    const ratingStars = offerElement.querySelectorAll(".offers__rating img");
    ratingStars.forEach((star) => {
      star.src = "./src/img/offers/rating-star.svg";
    });

    offersListElement.appendChild(offerElement.firstChild);
  }
}

export default renderOffers;
