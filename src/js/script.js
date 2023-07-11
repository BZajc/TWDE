import displayImagesSection from "./displayImages";
import other from "./other";
import tiltingAnim from "./tiltingAnim";
import exchangeRateAPI from "./exchangeRateAPI";

// Running Pixabay API for display images section
displayImagesSection();

// Other stuff (anchor to section etc.)
other();

// TEST
exchangeRateAPI()

// Running tilting animation
tiltingAnim('.booking__option', 20);
tiltingAnim('.offers__offer', 10);