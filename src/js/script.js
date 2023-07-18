import displayImagesSection from "./displayImages";
import other from "./other";
import tiltingAnim from "./tiltingAnim";
import exchangeRate from "./exchangeRate";

// Pixabay API for display images section
displayImagesSection();

// Other stuff (anchor to section etc.)
other();

// Running tilting animation
tiltingAnim(".booking__option", 20);

// Currency Converter
exchangeRate();

