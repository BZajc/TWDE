import displayImagesSection from "./displayImages";
import other from "./other";
import tiltingAnim from "./tiltingAnim";
import exchangeRate from "./exchangeRate";
import renderOffers from "./renderOffers";

// Pixabay API for display images section
displayImagesSection();

// Other stuff (anchor to section etc.)
other();

// Running tilting animation
tiltingAnim(".booking__option", 20);

// Render cards in offers section
renderOffers();

// Currency Converter
exchangeRate();