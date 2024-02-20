// Scripts for the landing page (staging)
// Updated 07.02.2024

const domain = window.location.hostname;
const prevArrow = document.getElementById("prev-btn");
const nextArrow = document.getElementById("next-btn");
const slider = document.querySelector(".slider-desktop");
const firstFormStepLP = document.getElementById("first-step-form");
const priceSymbols = document.querySelectorAll(".price-symbol");
const priceLetters = document.querySelectorAll(".price-letters");
const heroGender = document.querySelector('input[name="HeroGender"]:checked');
const heroName = document.getElementById("HeroName");
const heroDOB = document.getElementById("HeroDOB");
const bookLanguage = document.getElementById("BookLanguage");
const featuresHero = document.querySelector(".features-wrapper-hero");
const featuresSeparated = document.querySelector(".features-metrics");
const heroLinkDown = document.querySelector(".scroll-link-hero");
const featuresLinkDown = document.querySelector(".scroll-link-features");

const websiteDataEn = [
  document.querySelector(".sn-list-en"),
  document.querySelector(".reviews-list-en"),
  document.querySelector(".bg-image-en"),
];
const websiteDataLv = [
  document.querySelector(".sn-list-lv"),
  document.querySelector(".reviews-list-lv"),
  document.querySelector(".bg-image-lv"),
];

// Show/hide content according to the current domain ///////////////////////////////////////////////////////////////
function showHideContent() {
  const currentLanguage = detectLanguage();
  currentLanguage === "en" ? showTextBlock() : showTextBlock(currentLanguage);
  if (currentLanguage === "lv") {
    websiteDataEn.forEach((el) => (el.style.display = "none"));
    websiteDataLv.forEach((el) => (el.style.display = "flex"));
  } else {
    websiteDataEn.forEach((el) => (el.style.display = "flex"));
    websiteDataLv.forEach((el) => (el.style.display = "none"));
  }
}
showHideContent();

// Function that detects current domain //////////////////////////////////////////////////////////////////////////
function detectLanguage() {
  const domain = window.location.hostname;
  switch (domain) {
    case "lv.blossomreads.com":
      return "lv";
    case "de.blossomreads.com":
      return "de";
    case "uk.blossomreads.com":
      return "uk";
    case "ru.blossomreads.com":
      return "ru";
    default:
      return "en";
  }
}

// Change book language according to the domain //////////////////////////////////////////////////////////////////
const detectBookLang = () => {
  const currentLanguage = detectLanguage();
  for (let i = 0; i < bookLanguage.options.length; i++) {
    if (bookLanguage.options[i].value === currentLanguage) {
      bookLanguage.options[i].selected = true;
    }
  }
  document.getElementById("langInputOccasion").value = currentLanguage;
  document.getElementById("langInputHero").value = currentLanguage;
};
detectBookLang();

// Fetch function to detect user's country ////////////////////////////////////////////////////////////////////
fetch("https://ipapi.co/json/")
  .then((response) => response.json())
  .then((data) => {
    if (data.country_code === "GB") {
      priceSymbols.forEach((el) => (el.textContent = "£"));
      priceLetters.forEach((el) => (el.textContent = "GBP"));
    }
  })
  .catch((error) => console.error("Error fetching IP information:", error));

// Age restriction ///////////////////////////////////////////////////////////////////////////////////////////
function restrictAge() {
  const today = new Date();
  const minDate = new Date(today);
  minDate.setMonth(today.getMonth() - 10);
  document
    .getElementById("HeroDOB")
    .setAttribute("max", minDate.toISOString().split("T")[0]);
}
restrictAge();

// Mobile swiper settings ////////////////////////////////////////////////////////////////////////////////////
const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

// Added new buttons to the desktop slider //////////////////////////////////////////////////////////////////////
nextArrow.addEventListener("click", function () {
  var nextButton = slider.querySelector(".w-slider-arrow-right");
  nextButton.click();
});
prevArrow.addEventListener("click", function () {
  var prevButton = slider.querySelector(".w-slider-arrow-left");
  prevButton.click();
});

// Display text on slides corresponding to the chosen language /////////////////////////////////////////////////
function showTextBlock(language) {
  const textBlocks = document.querySelectorAll(
    ".slide-text-block, .slide-text-block-lv, .slide-text-block-de, .slide-text-block-ru, .slide-text-block-uk"
  );
  const mobTextBlocks = document.querySelectorAll(
    ".slide-text-block-mob, .slide-text-block-mob-lv, .slide-text-block-mob-de, .slide-text-block-mob-ru, .slide-text-block-mob-uk"
  );

  const applyLanguageStyles = (blocks, blockSuffix) => {
    blocks.forEach((block) => {
      switch (language) {
        case "lv":
          block.style.display = block.classList.contains(
            `slide-text-${blockSuffix}-lv`
          )
            ? "block"
            : "none";
          break;
        case "de":
          block.style.display = block.classList.contains(
            `slide-text-${blockSuffix}-de`
          )
            ? "block"
            : "none";
          break;
        case "ru":
          block.style.display = block.classList.contains(
            `slide-text-${blockSuffix}-ru`
          )
            ? "block"
            : "none";
          break;
        case "uk":
          block.style.display = block.classList.contains(
            `slide-text-${blockSuffix}-uk`
          )
            ? "block"
            : "none";
          break;
        default:
          if (
            !block.classList.contains(`slide-text-${blockSuffix}-lv`) &&
            !block.classList.contains(`slide-text-${blockSuffix}-de`) &&
            !block.classList.contains(`slide-text-${blockSuffix}-ru`) &&
            !block.classList.contains(`slide-text-${blockSuffix}-uk`) &&
            block.classList.contains(`slide-text-${blockSuffix}`)
          ) {
            block.style.display = "block";
          } else {
            block.style.display = "none";
          }
      }
    });
  };
  applyLanguageStyles(textBlocks, "block");
  applyLanguageStyles(mobTextBlocks, "block-mob");
}

// Function that stores data in local storage ///////////////////////////////////////////////////////////////
function storeData(value, name) {
  if (value) {
    localStorage.setItem(name, value);
  } else {
    localStorage.removeItem(name);
  }
}

// Function that converts select value to the image id /////////////////////////////////////////////////////
function convertToClassName(str) {
  const convertedString = str.toLowerCase().replace(/\s+/g, "-");
  return convertedString + "-img";
}

// Function that saves OCCASION SELECT value in local storage, changes submit btn text content and changes active image
function changeOccasionImage(selectElement) {
  var selectedOption = selectElement.value;
  var allImages = document.querySelectorAll(".image-container");
  allImages.forEach(function (image) {
    image.classList.remove("active");
  });
  if (selectedOption === "") {
    document.getElementById("type-your-own-img").classList.add("active");
  } else {
    document
      .getElementById(convertToClassName(selectedOption))
      .classList.add("active");
  }
  selectElement.nextElementSibling.value = selectedOption;
  storeData(selectedOption, "occasion");
  updateButtonText();
}

// Function that saves OCCASION INPUT value in local storage, changes submit btn text content and changes active image
function changeOccasionImageFromInput(e) {
  var inputValue = event.target.value;
  var allImages = document.querySelectorAll(".image-container");
  allImages.forEach(function (image) {
    image.classList.remove("active");
  });
  document.getElementById("type-your-own-img").classList.add("active");
  storeData(inputValue, "occasion");
  updateButtonText();
}

// Function that saves THEME SELECT value in local storage ///////////////////////////////////////////////////
function changeThemeFromSelect(select) {
  var selectedTheme = select.value;
  select.nextElementSibling.value = selectedTheme;
  storeData(selectedTheme, "theme");
  updateButtonText();
}

// Function that saves THEME INPUT value in local storage ///////////////////////////////////////////////////
function changeThemeFromInput(e) {
  var inputThemeValue = event.target.value;
  storeData(inputThemeValue, "theme");
  updateButtonText();
}

// Function that updates submit btn value according to selected values //////////////////////////////////////////
function updateButtonText() {
  var occasion = document.getElementById("occasion-input").value;
  var theme = document.getElementById("theme-input").value;
  var buttonText = "ORDER";
  if (occasion) {
    buttonText += " for " + occasion;
    if (theme) {
      buttonText += " with " + theme;
    }
  }
  if (theme && !occasion) {
    buttonText = "book with " + theme;
  }
  document.getElementById("occasion-submit-btn").textContent = buttonText;
}

// Function that saves first step data in local storage ///////////////////////////////////////////////////
firstFormStepLP.addEventListener("submit", function (event) {
  const formData = {
    HeroGender: heroGender.value,
    HeroName: heroName.value,
    HeroDOB: heroDOB.value,
    BookLanguage: document.getElementById("BookLanguage").value,
  };
  localStorage.setItem("formData", JSON.stringify(formData));
});

// Show/hide features section depending on the view height ///////////////////////////////////////////////////
function handleWindowResize() {
  const newHeight = window.innerHeight;
  const newWidth = window.innerWidth;
  const heroSection = document.querySelector(".hero-heading-left");
  if (newHeight < 1000) {
    heroSection.style.height = "auto";
    // featuresHero.style.display = "none";
    // featuresSeparated.style.display = "block";
    // heroLinkDown.style.display = "none";
    // featuresLinkDown.style.display = "block";
  } else {
    heroSection.style.height = "100vh";
    // featuresHero.style.display = "flex";
    // featuresSeparated.style.display = "none";
    // heroLinkDown.style.display = "block";
  }
}
window.addEventListener("load", handleWindowResize);
window.addEventListener("resize", handleWindowResize);

// Randomize slides /////////////////////////////////////////////////////////////////////////////////////////
const mask = document.querySelector(".mask");
const children = Array.from(mask.children);
children.sort(() => Math.random() - 0.5);
children.forEach((child) => {
  mask.appendChild(child);
});
