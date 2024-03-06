//22-2-23 Update Push

let x = 0;
let curStep = 0;
let steps = $('[data-form="step"]'); // node elements with data-form="step" attribute (divs)
console.log(steps);
let progressbarClone = $('[data-form="progress-indicator"]').clone();
let progressbar;
let fill = false;
let inputFilled = true;
let selectFilled = true;
let radioFilled = true;
let checkboxFilled = true;
let emailFilled = true;
let textareaFilled = true;
let telFilled = true;
let dateFilled = true;
let fileFilled = true;
let answer = "";
let selections = [];
let selection = [];
let empReqInput = [];
let empReqSelect = [];
let empReqTextarea = [];
let empReqfile = [];
let empReqTel = [];
let empReqDate = [];
let reinitIX = $("[data-reinit]").data("reinit");
let textareaLength = 0;
let textInputLength = 0;
let emailInputLength = 0;
let selectInputLength = 0;
let checkboxInputLength = 0;
let filledInput = [];
let savedFilledInput = JSON.parse(localStorage.getItem("filledInput"));
let memory = $("[data-memory]").data("memory");
let quiz = $("[data-quiz]").data("quiz");
let progress = 0;
const urlFormly = new URL(window.location.href);
let params = $("[data-query-param]").data("query-param");
let skipTo = 0;
let next = false;
let selArr = [];
let selString = [];
let emptyInput = 0;
let searchQ = [];
let domainAllowed = true;
let dom = [];
let image_changed = false;
let is_boy = true;

// added new variables
let autocompleteAddress;
let currency = "eur";

let addressInputField = document.querySelector("#Address");
let countryInputField = document.querySelector("#Country");
let streetInputField = document.querySelector("#Street");
let cityInputField = document.querySelector("#City");
let zipCode = document.getElementById("ZipCode");
const priceSymbols = document.querySelectorAll(".price-symbol");
const priceLetters = document.querySelectorAll(".price-letters");
const environment = document.querySelector("#Environment");
const host = urlFormly.host;
const port = urlFormly.port; // if live server is used, then the port is not empty
const bookLang = document.getElementById("BookLanguage");
const dateInput = document.getElementById("HeroDOB");
const phoneInputField = document.querySelector("#Phone");

///////////////////////////////////////////////////////////

// var occasionCheckbox = document.getElementById("IsOccasion");
// var occasionInput = document.getElementById("occasion-input");
// var occasionSelect = document.getElementById("occasion");
// var themeCheckbox = document.getElementById("IsTheme");
// var themeInput = document.getElementById("theme-input");
// var themeSelect = document.getElementById("theme");
// var continueButton = document.querySelector(".next-button");

function checkInputs() {
  var occasionCheckbox = document.getElementById("IsOccasion");
  var occasionInput = document.getElementById("occasion-input");
  var occasionSelect = document.getElementById("occasion");
  var themeCheckbox = document.getElementById("IsTheme");
  var themeInput = document.getElementById("theme-input");
  var themeSelect = document.getElementById("theme");
  // var continueButton = document.querySelector(".next-button");
  var occasionEmpty =
    occasionCheckbox.checked &&
    occasionInput.value === "" &&
    occasionSelect.value === "";
  var themeEmpty =
    themeCheckbox.checked &&
    themeInput.value === "" &&
    themeSelect.value === "";

  if (
    (occasionCheckbox.checked && occasionEmpty) ||
    (themeCheckbox.checked && themeEmpty)
  ) {
    disableBtn();
  } else {
    enableBtn();
  }
}

document.getElementById("IsOccasion").addEventListener("change", checkInputs);
document
  .getElementById("occasion-input")
  .addEventListener("input", checkInputs);
document.getElementById("occasion").addEventListener("change", checkInputs);
document.getElementById("IsTheme").addEventListener("change", checkInputs);
document.getElementById("theme-input").addEventListener("input", checkInputs);
document.getElementById("theme").addEventListener("change", checkInputs);
document.getElementById("StyleRandom").addEventListener("change", checkInputs);

checkInputs();

///////////////////////////////////////////////////////////

fetch("https://ipapi.co/json/")
  .then((response) => response.json())
  .then((data) => {
    if (data.country_code === "GB") {
      priceSymbols.forEach((el) => (el.textContent = "£"));
      priceLetters.forEach((el) => (el.textContent = "GBP"));
    }
    const select = document.getElementById("Country");
    for (let i = 0; i < select.options.length; i++) {
      const option = select.options[i];
      if (option.value === data.country_code.toLowerCase()) {
        option.selected = true;
        initAutocomplete(option.value);
        break;
      }
    }
  })
  .catch((error) => console.error("Error fetching IP information:", error));

function toggleCheckbox(checkboxId, checkmarkId) {
  const checkboxField = document.getElementById(checkboxId);
  const checkmark = document.querySelector(checkmarkId);
  checkboxField.checked = !checkboxField.checked;
  checkmark.classList.toggle(
    "occasion-checkmark-checked",
    checkboxField.checked
  );
}
document
  .querySelector(".occasion-field-label")
  .addEventListener("click", function () {
    toggleCheckbox("IsOccasion", ".occasion-checkmark");
  });
document
  .querySelector(".theme-field-label")
  .addEventListener("click", function () {
    toggleCheckbox("IsTheme", ".theme-checkmark");
  });
document
  .querySelector(".style-checkbox")
  .addEventListener("click", function () {
    toggleCheckbox("StyleRandom", ".style-checkmark");
  });
function handleOccasionCheckboxChange() {
  const occasionCheckbox = document.getElementById("IsOccasion");
  const occasionCombobox = document.querySelector(".occasion-combobox");
  if (occasionCheckbox.checked) {
    occasionCombobox.classList.add("visible");
  } else {
    occasionCombobox.classList.remove("visible");
    document.getElementById("occasion").value = "";
    document.getElementById("occasion-input").value = "";
  }
}
function handleThemeCheckboxChange() {
  const themeCheckbox = document.getElementById("IsTheme");
  const themeCombobox = document.querySelector(".theme-combobox");
  if (themeCheckbox.checked) {
    themeCombobox.classList.add("visible");
  } else {
    themeCombobox.classList.remove("visible");
    document.getElementById("theme").value = "";
    document.getElementById("theme-input").value = "";
  }
}
document
  .getElementById("IsOccasion")
  .addEventListener("change", handleOccasionCheckboxChange);
document
  .getElementById("IsTheme")
  .addEventListener("change", handleThemeCheckboxChange);

function loadStoredValues() {
  document.addEventListener("DOMContentLoaded", function () {
    var storedOccasion = localStorage.getItem("occasion");
    var storedTheme = localStorage.getItem("theme");
    if (storedOccasion) {
      toggleCheckbox("IsOccasion", ".occasion-checkmark");
      handleOccasionCheckboxChange();
    }
    if (storedTheme) {
      toggleCheckbox("IsTheme", ".theme-checkmark");
      handleThemeCheckboxChange();
    }
    // Set stored values into input fields and selects
    if (storedOccasion) {
      document.getElementById("occasion").value = storedOccasion;
      document.getElementById("occasion-input").value = storedOccasion;
      var occasionSelect = document.getElementById("occasion");
      for (var i = 0; i < occasionSelect.options.length; i++) {
        if (occasionSelect.options[i].value === storedOccasion) {
          occasionSelect.selectedIndex = i;
          break;
        }
      }
    }
    if (storedTheme) {
      document.getElementById("theme").value = storedTheme;
      document.getElementById("theme-input").value = storedTheme;
      var themeSelect = document.getElementById("theme");
      for (var j = 0; j < themeSelect.options.length; j++) {
        if (themeSelect.options[j].value === storedTheme) {
          themeSelect.selectedIndex = j;
          break;
        }
      }
    }
    // Remove stored values after 5 seconds
    setTimeout(function () {
      localStorage.removeItem("occasion");
      localStorage.removeItem("theme");
    }, 5000);
  });
}
loadStoredValues();
let heroData = localStorage.getItem("formData");
if (heroData) {
  const formData = JSON.parse(heroData);
  const heroGenderRadioButton = document.querySelector(
    'input[name="HeroGender"][value="' + formData.HeroGender + '"]'
  );
  heroGenderRadioButton.checked = true;
  let sibling = heroGenderRadioButton.previousElementSibling;
  while (sibling) {
    if (sibling.classList.contains("radio-button")) {
      sibling.classList.add("w--redirected-checked");
      break;
    }
    sibling = sibling.previousElementSibling;
  }
  document.getElementById("HeroName").value = formData.HeroName;
  document.getElementById("HeroDOB").value = formData.HeroDOB;
  document.getElementById("BookLanguage").value = formData.BookLanguage;
  localStorage.removeItem("formData");
}

function stepVisible() {
  const formStepsItems = document.querySelectorAll('[data-form="step"]');
  if (formStepsItems.length >= 3) {
    const secondElement = formStepsItems[0].querySelectorAll(
      ".steps-form-element"
    )[1];
    const thirdElement = formStepsItems[1].querySelector(".steps-form-element");
    if (secondElement && thirdElement) {
      formStepsItems[0]
        .querySelector(".steps-right-col")
        .appendChild(thirdElement);
      formStepsItems[1]
        .querySelector(".steps-right-col")
        .appendChild(secondElement);
      secondElement.querySelector(".current-step").textContent = 2;
    }
  }
  const stepContainer = document.querySelector(".step-wrapper");
  const stepIndicators = document.querySelectorAll(".step-indicator");
  if (stepIndicators.length >= 2) {
    const firstElement = stepIndicators[0];
    const secondElement = stepIndicators[1];
    stepContainer.insertBefore(secondElement, firstElement);
  }
}
if (new URL(document.location).searchParams.get("redirect_from") === "themes") {
  stepVisible();
}

///////////////////////////////////////////////////////////

const freeDelSpan = document.querySelector(".free-delivery-span");
const paidDelSpan = document.querySelector(".fast-delivery-span");
function calculateDeliveryDate(deliveryType) {
  const orderDateTime = new Date();
  const orderDayOfWeek = orderDateTime.getDay();
  let deliveryDay = 5;
  let weeksToAdd = orderDayOfWeek >= 3 && orderDayOfWeek <= 6 ? 2 : 1;
  if (deliveryType === "free") {
    weeksToAdd += 2;
  }
  const deliveryDate = new Date(orderDateTime);
  deliveryDate.setDate(
    orderDateTime.getDate() +
      weeksToAdd * 7 +
      ((deliveryDay - orderDayOfWeek + 7) % 7)
  );
  return deliveryDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });
}
freeDelSpan.textContent =
  "Delivery by " +
  calculateDeliveryDate("paid") +
  " to " +
  calculateDeliveryDate("free");
paidDelSpan.textContent =
  "Delivery to door by " + calculateDeliveryDate("paid");

///////////////////////////////////////////////////////////

const refId = uuidv4();
const clientRefId = document.querySelector(".ClientReferenceId");
clientRefId.value = refId;

const checkboxes = document.querySelectorAll(
  "input[name=Audio], input[name=Painting], input[name=Card]"
);
document.getElementById("Book").setAttribute("disabled", "disabled");
const checkmarks = document.querySelectorAll(".check-mark");
const paintingQuantity = document.querySelector(".painting-quantity");
for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("change", () => {
    if (checkboxes[i].checked) {
      checkmarks[i + 1].style.background = "#f0623d";
      checkmarks[i + 1].style.border = "1px solid #f0623d";
      if (checkboxes[i].id === "Painting") {
        paintingQuantity.textContent = 1;
        document.querySelectorAll(".additions-checkbox")[1].style.border =
          "2px solid #f0623d";
      }
    } else {
      checkmarks[i + 1].style.background = "transparent";
      checkmarks[i + 1].style.border = "1px solid rgba(0,0,0,0.15)";
      if (checkboxes[i].id === "Painting") {
        paintingQuantity.textContent = 0;
        document.querySelectorAll(".additions-checkbox")[1].style.border =
          "1px solid rgba(0,0,0,0.15)";
        document.querySelector(".painting-price").textContent = 17.49;
      }
    }
  });
}

function incrementCounter(counterId) {
  const counterInput = document.querySelector(`.${counterId}`);
  const currentValue = parseInt(counterInput.textContent);
  counterInput.textContent = currentValue + 1;
  if (counterInput.className === "book-quantity") {
    if (currentValue + 1 > 1) {
      document.querySelector(".book-price").textContent = (
        49.0 +
        39.0 * 0.75 * currentValue
      ).toFixed(2);
    }
  }
  if (counterInput.className === "painting-quantity") {
    checkboxes[0].checked = true;
    document.querySelectorAll(".additions-checkbox")[1].style.border =
      "2px solid #f0623d";
    checkmarks[1].style.background = "#f0623d";
    checkmarks[1].style.border = "1px solid #f0623d";
    if (currentValue > 0) {
      document.querySelector(".painting-price").textContent = (
        17.49 *
        (currentValue + 1)
      ).toFixed(2);
    }
  }
}

function decrementCounter(counterId) {
  const counterInput = document.querySelector(`.${counterId}`);
  const currentValue = parseInt(counterInput.textContent);
  if (currentValue > 1 && counterInput.className === "book-quantity") {
    counterInput.textContent = currentValue - 1;
    if (currentValue - 1 > 1) {
      document.querySelector(".book-price").textContent = (
        49.0 +
        39.0 * 0.75 * (currentValue - 2)
      ).toFixed(2);
      console.log(currentValue - 1);
    }
    if (currentValue - 1 === 1) {
      document.querySelector(".book-price").textContent = (49.0).toFixed(2);
    }
  }
  if (currentValue > 0 && counterInput.className !== "book-quantity") {
    counterInput.textContent = currentValue - 1;
    if (currentValue === 1) {
      checkboxes[0].checked = false;
      document.querySelectorAll(".additions-checkbox")[1].style.border =
        "1px solid rgba(0,0,0,0.15)";
      checkmarks[1].style.background = "transparent";
      checkmarks[1].style.border = "1px solid rgba(0,0,0,0.15)";
    }
    if (currentValue > 0) {
      document.querySelector(".painting-price").textContent = (
        17.49 *
        (currentValue - 1)
      ).toFixed(2);
    }
    if (currentValue - 1 === 0) {
      document.querySelector(".painting-price").textContent = 17.49;
    }
  }
}

document
  .getElementById("book-decr-btn")
  .addEventListener("click", () => decrementCounter("book-quantity"));
document
  .getElementById("book-incr-btn")
  .addEventListener("click", () => incrementCounter("book-quantity"));
document
  .getElementById("paint-decr-btn")
  .addEventListener("click", () => decrementCounter("painting-quantity"));
document
  .getElementById("paint-incr-btn")
  .addEventListener("click", () => incrementCounter("painting-quantity"));

///////////////////////////////////////////////////////////

const detectBookLang = () => {
  const splittedHost = host.split(".");
  const detectedLanguage = splittedHost[0];
  for (let i = 0; i < bookLang.options.length; i++) {
    const languageOption = bookLang.options[i];
    if (languageOption.value === "en") {
      languageOption.selected = detectedLanguage === "www";
      // break;
    }
    if (languageOption.value === detectedLanguage) {
      console.log(languageOption.value);
      languageOption.selected = true;
      break;
    }
  }
};
detectBookLang();

function restrictAge() {
  const today = new Date();
  const minDate = new Date(today);
  minDate.setMonth(today.getMonth() - 10);
  dateInput.setAttribute("max", minDate.toISOString().split("T")[0]);
}

restrictAge();

const shippingBlock = document.querySelector(".form-radio-wrap");

async function getGeolocationPermission() {
  return new Promise((resolve) => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        resolve(permissionStatus.state);
      });
  });
}

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function getCountryFromCoordinates(latitude, longitude) {
  const response = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  );
  const data = await response.json();
  return data.countryCode.toLowerCase();
}

function handleMouseOver() {
  document.querySelector(".shipping-hint").style.display = "block";
}

function handleMouseOut() {
  document.querySelector(".shipping-hint").style.display = "none";
}

const freeShippingRadio = document.querySelector(".free-shipping-radio");

function customizeShipping(value) {
  if (value === "gb") {
    document.querySelector(".shipping-note").textContent =
      "The cost of shipping to the UK is 10 pounds.";
    document.getElementById("fast-shipping").checked = true;
    document.getElementById("free-shipping").disabled = true;
    document
      .querySelector(".free-shipping-radio")
      .classList.remove("w--redirected-checked");
    document.querySelector(".free-shipping-radio").style.backgroundColor =
      "#dddddd60";
    document.querySelector(".free-shipping-radio").style.borderColor =
      "#dddddd60";
    document.querySelector(".free-delivery-text").style.color = "#999999";
    document.querySelector(".free-delivery-span").style.color = "#999999";
    document
      .querySelector(".fast-shipping-radio")
      .classList.add("w--redirected-checked");
    currency = "gbp";
    priceSymbols.forEach((el) => (el.textContent = "£"));
    priceLetters.forEach((el) => (el.textContent = "GBP"));
    freeShippingRadio.addEventListener("mouseover", handleMouseOver);
    freeShippingRadio.addEventListener("mouseout", handleMouseOut);
  } else {
    document.querySelector(".shipping-note").textContent =
      "Free standard shipping to your door or nearest parcel machine. For quicker delivery, select our express option.";
    document.getElementById("free-shipping").disabled = false;
    document.getElementById("free-shipping").checked = true;
    priceSymbols.forEach((el) => (el.textContent = "€"));
    priceLetters.forEach((el) => (el.textContent = "EUR"));
    document.querySelector(".shipping-hint").style.display = "none";
    document.querySelector(".free-shipping-radio").removeAttribute("style"); // Remove inline styles
    document.querySelector(".free-delivery-text").removeAttribute("style"); // Remove inline styles
    document.querySelector(".free-delivery-span").removeAttribute("style"); // Remove inline styles
    document
      .querySelector(".fast-shipping-radio")
      .classList.remove("w--redirected-checked");
    document
      .querySelector(".free-shipping-radio")
      .classList.add("w--redirected-checked");
    freeShippingRadio.removeEventListener("mouseover", handleMouseOver);
    freeShippingRadio.removeEventListener("mouseout", handleMouseOut);
  }
}

async function autocompleteCountry() {
  try {
    const permissionStatus = await getGeolocationPermission();
    if (permissionStatus === "granted") {
      const position = await getCurrentPosition();
      const userCountry = await getCountryFromCoordinates(
        position.coords.latitude,
        position.coords.longitude
      );

      const select = document.getElementById("Country");
      for (let i = 0; i < select.options.length; i++) {
        const option = select.options[i];
        if (option.value === userCountry) {
          option.selected = true;
          initAutocomplete(option.value);
          if (option.value !== "lv" && option.value !== "") {
            shippingBlock.style.display = "block";
          }
          customizeShipping(option.value);
          break;
        }
      }
    } else {
      console.warn("Geolocation permission not granted.");
    }
  } catch (error) {
    console.error("Error during geolocation:", error);
  }
}

countryInputField.addEventListener("change", (e) => {
  initAutocomplete(e.target.value);
  autocompleteAddress.setComponentRestrictions({ country: e.target.value });
  if (e.target.value !== "lv" && e.target.value !== "") {
    shippingBlock.style.display = "block";
  } else {
    shippingBlock.style.display = "none";
  }
  customizeShipping(e.target.value);
  if (e.target.value !== "gb") {
    priceSymbols.forEach((el) => (el.textContent = "€"));
    priceLetters.forEach((el) => (el.textContent = "EUR"));
    currency = "eur";
  }
});

function initAutocomplete(selectedCountry = "lv") {
  autocompleteAddress = new google.maps.places.Autocomplete(addressInputField, {
    types: ["address"],
    // componentRestrictions: { country: selectedCountry },
  });
  autocompleteAddress.setComponentRestrictions({ country: selectedCountry });
  autocompleteAddress.addListener("place_changed", fillInAddress);
}

function findAddressData(data, place) {
  const dataObject = place.address_components.find((el) =>
    el.types.includes(data)
  );
  return dataObject ? dataObject.long_name : "";
}

function fillInAddress() {
  const place = autocompleteAddress.getPlace();
  if (!place.geometry) {
    addressInputField.placeholder = "Enter a valid address";
  } else {
    addressInputField.value = place.formatted_address;
    switch (countryInputField.value) {
      case "lv":
        cityInputField.value = findAddressData("locality", place)
          ? findAddressData("administrative_area_level_1", place)
            ? findAddressData("locality", place) +
              ", " +
              findAddressData("administrative_area_level_1", place)
            : findAddressData("locality", place)
          : findAddressData("administrative_area_level_2", place) +
            ", " +
            findAddressData("administrative_area_level_1", place);
        streetInputField.value = findAddressData("street_number", place)
          ? findAddressData("route", place) +
            ", " +
            findAddressData("street_number", place)
          : findAddressData("route", place)
          ? findAddressData("route", place)
          : findAddressData("premise", place) ||
            findAddressData("establishment", place);
        break;

      default:
        cityInputField.value =
          findAddressData("locality", place) ||
          findAddressData("postal_town", place);
        streetInputField.value =
          findAddressData("route", place) +
          ", " +
          findAddressData("street_number", place);
        break;
    }
    zipCode.value = findAddressData("postal_code", place);
  }
  validation();
  // if (validateInput($(':input[type="text"][required]:visible'))) {
  //   enableBtn();
  // } else {
  //   disableBtn();
  // }
}

autocompleteCountry();

// added dropdown list of countries to phone input
const phoneInput = window.intlTelInput(phoneInputField, {
  initialCountry: "auto",
  geoIpLookup: (callback) => {
    fetch("https://ipapi.co/json")
      .then((res) => res.json())
      .then((data) => callback(data.country_code))
      .catch(() => callback("us"));
  },
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

// added country code to phone input when input is changed
phoneInputField.addEventListener("change", (e) => {
  e.target.value = phoneInput.getNumber();
});

// added new field to form data object which shows if order made during staging or production
if (host.includes("blossomreads.webflow.io") || port !== "") {
  console.log("staging");
  environment.value = "staging";
} else {
  console.log("production");
  environment.value = "production";
}

$(progressbarClone).removeClass("current");
$('[data-form="progress"]').children().remove();
$('[data-text="total-steps"]').text(steps.length);
$('[data-form="submit-btn"]').hide();
curStep = curStep + 1;
$('[data-text="current-step"]').text(curStep);
steps.hide();

$('[data-form="next-btn"][type="submit"]').each(function () {
  $(this).attr("type", "button");
});

function changeImage() {
  if (image_changed == false) {
    console.log("Updating 3. step picture, uploading guide");

    // const imageElement1 = document.getElementsByClassName("image-5")[0];
    // const imageElement2 = document.getElementById(
    //   "w-node-_64c267de-1f7b-60c8-f08e-df7363cd287d-6f25ecf0"
    // );
    // const imageElement3 = document.getElementById(
    //   "w-node-_5ab35103-f747-f14b-648c-fa1ee52dda2c-6f25ecf0"
    // );
    // console.log(imageElement3);
    const imageElement4 = document.getElementById(
      "w-node-c8bf5738-30c7-c414-4e66-bf7f05839cfa-6f25ecf0"
    );
    console.log(imageElement4);
    const imageElement5 = document.getElementById(
      "w-node-_47f06dcd-89d6-8710-a41b-fa0d1a830a72-6f25ecf0"
    );
    console.log(imageElement5);
    const imageElement6 = document.getElementById(
      "w-node-ce4f6a12-c0fa-b8c4-ea5d-29324ea4ee96-6f25ecf0"
    );
    console.log(imageElement6);

    function updateImage(imageElement, image_name, extension) {
      url =
        "https://stastiem-public-assets.s3-accelerate.amazonaws.com/website/" +
        image_name +
        extension;
      console.log(
        "Updating image element: " + imageElement + " with url: " + url + ""
      );
      imageElement.src = url;
      // imageElement.srcset = url + " 500w, " +
      //                       url + " 800w, " +
      //                       url + " 1080w, " +
      //                       url + " 1600w, " +
      //                       url + " 2000w, ";
    }

    if (is_boy) {
      // updateImage(imageElement1, "boy1", ".png");
      // updateImage(imageElement2, "boy2", ".png");
      // updateImage(imageElement3, "boy3", ".png");
      updateImage(imageElement4, "boy4", ".png");
      updateImage(imageElement5, "boy5", ".png");
      updateImage(imageElement6, "boy6", ".png");
    } else {
      // updateImage(imageElement1, "girl1", ".png");
      // updateImage(imageElement2, "girl2", ".png");
      // updateImage(imageElement3, "girl3", ".png");
      updateImage(imageElement4, "girl4", ".png");
      updateImage(imageElement5, "girl5", ".png");
      updateImage(imageElement6, "girl6", ".png");
    }

    image_changed = true;
  }
}

function getParams() {
  urlFormly.searchParams.forEach(function (val, key) {
    searchQ.push({ val, key });
    console.log(searchQ);
  });
}
function getSafe(fn, defaultVal) {
  try {
    return fn();
  } catch (e) {
    return defaultVal;
  }
}

if (savedFilledInput && memory) {
  savedFilledInput.forEach((x) => {
    console.log("Pre-fill: ", x.inputName, x.value, x.type, x.inputType);

    if (
      $(`input[name="${x.inputName}"][value="${x.value}"]`).attr("type") ===
      "radio"
    ) {
      $(`input[name="${x.inputName}"][value="${x.value}"]`).click();
      $(`input[name="${x.inputName}"][value="${x.value}"]`)
        .siblings(".w-radio-input")
        .addClass("w--redirected-checked");
    } else if (x.value === "on") {
      $(`input[name="${x.inputName}"]`).click();
      $(`input[name="${x.inputName}"]`)
        .siblings(".w-checkbox-input")
        .addClass("w--redirected-checked");
    } else {
      $(`input[name="${x.inputName}"]`).val(x.value);
      $(`textarea[name="${x.inputName}"]`).val(x.value);
      $(`select[name="${x.inputName}"]`)
        .find(`option[value="${x.value}"]`)
        .prop("selected", true);
    }
  });
}

if (params) {
  getParams();
  searchQ.forEach((y) => {
    console.info("Query param: ", y.key, y.val);
    console.log(y, $(`input[value="${y.val}"]`).attr("type"));
    if (
      $(`input[name="${y.key}"][value="${y.val}"]`).attr("type") === "radio"
    ) {
      $(`input[name="${y.key}"][value="${y.val}"]`).click();
      $(`input[name="${y.key}"][value="${y.val}"]`)
        .siblings(".w-radio-input")
        .addClass("w--redirected-checked");
    } else if (y.val === "on") {
      $(`input[name="${y.key}"]`).click();
      $(`input[name="${y.key}"]`)
        .siblings(".w-checkbox-input")
        .addClass("w--redirected-checked");
    } else {
      $(`input[name="${y.key}"]`).val(y.val);
      $(`textarea[name="${y.key}"]`).val(y.val);
      $(`select[name="${y.key}"]`)
        .find(`option[value="${y.val}"]`)
        .prop("selected", true);
    }
  });
}

if (quiz) {
  steps.each(function () {
    $(this).children().attr("data-radio-skip", true);
    $(this).children().attr("data-radio-delay", 250);
  });
}

function disableBtn() {
  fill = false;
  //next button style
  $('[data-form="next-btn"]').css({
    opacity: "0.4",
    "pointer-events": "none",
  });
  $('[data-form="next-btn"]').addClass("disabled");
  //submit btn style
  $('[data-form="submit-btn"]').css({
    opacity: "0.4",
    "pointer-events": "none",
  });
  $('[data-form="submit-btn"]').addClass("disabled");
}

function enableBtn() {
  fill = true;
  //next button style
  $('[data-form="next-btn"]').css({
    "pointer-events": "auto",
    opacity: "1",
  });
  $('[data-form="next-btn"]').removeClass("disabled");
  //submit btn style
  $('[data-form="submit-btn"]').css({
    "pointer-events": "auto",
    opacity: "1",
  });
  $('[data-form="submit-btn"]').removeClass("disabled");
}

function saveFilledInput() {
  $('form[data-form="multistep"] :input')
    .not('[type="submit"]')
    .each(function () {
      if (
        $(this).attr("type") === "checkbox" ||
        $(this).attr("type") === "radio"
      ) {
        if ($(this).prop("checked")) {
          if (filledInput.some((e) => e.inputName === $(this).attr("name"))) {
            filledInput = filledInput.filter(
              (e) => e.inputName !== $(this).attr("name")
            );

            if ($(this).val() !== "") {
              filledInput.push({
                inputName: $(this).attr("name"),
                value: $(this).val(),
              });
            }
          } else {
            if ($(this).val() !== "") {
              filledInput.push({
                inputName: $(this).attr("name"),
                value: $(this).val(),
              });
            }
          }
        }
      } else {
        if (filledInput.some((e) => e.inputName === $(this).attr("name"))) {
          filledInput = filledInput.filter(
            (e) => e.inputName !== $(this).attr("name")
          );

          if ($(this).val() !== "") {
            filledInput.push({
              inputName: $(this).attr("name"),
              value: $(this).val(),
            });
          }
        } else {
          if ($(this).val() !== "") {
            filledInput.push({
              inputName: $(this).attr("name"),
              value: $(this).val(),
            });
          }
        }
      }
    });
  // console.log(filledInput);
  if (filledInput) {
    filledInput.forEach((x) => {
      //console.log(x)
      urlFormly.searchParams.delete(x.inputName);
      urlFormly.searchParams.set(x.inputName, x.value);
      window.history.replaceState(null, null, urlFormly); // or pushState
    });
  }

  localStorage.removeItem("filledInput");
  localStorage.setItem("filledInput", JSON.stringify(filledInput));
}

function scrollTop() {
  $("html, body").animate(
    {
      scrollTop: $('[data-form="multistep"]').offset().top - 300,
    },
    400
  );
}

function updateStep() {
  inputFilled = true;
  radioFilled = true;
  checkboxFilled = true;
  selectFilled = true;
  textareaFilled = true;
  emailFilled = true;
  emptyInput = 0;
  empReqInput = [];
  empReqSelect = [];
  empReqTextarea = [];
  //selections = []

  //custom clickable progress indicator
  if ($("[data-clickable]").data("clickable")) {
    console.log("clickable indicator");
    steps.find(":input[required]").each(function () {
      $(
        $('[data-form="custom-progress-indicator"]')[
          $(this).parents('[data-form="step"]').index()
        ]
      ).text(
        $(
          $('[data-form="custom-progress-indicator"]')[
            $(this).parents('[data-form="step"]').index()
          ]
        )
          .text()
          .replace("*", "")
      );
      if ($(this).val() === "") {
        emptyInput++;
        $(
          $('[data-form="custom-progress-indicator"]')[
            $(this).parents('[data-form="step"]').index()
          ]
        ).append("*");
      }
    });
    if (emptyInput > 0) {
      $('input[type="submit"]').addClass("disabled");
    } else {
      $('input[type="submit"]').removeClass("disabled");
    }
  }

  $('[data-form="custom-progress-indicator"]').removeClass("current");
  $($('[data-form="custom-progress-indicator"]')[x]).addClass("current");

  //conditional logic
  selection = selections.filter((y) => y.step === x - 1);

  if (next) {
    x = getSafe(() => selection[0]["skipTo"])
      ? parseInt(getSafe(() => selection[0]["skipTo"]))
      : x;
  }

  $("[data-answer]").hide();

  //hide unhide steps
  steps.hide();
  if (reinitIX === true) {
    window.Webflow.destroy();
  }

  $(progressbar).removeClass("current");

  for (let i = 0; i <= x; i++) {
    $(progressbar[i]).addClass("current");
  }
  if (reinitIX === true) {
    window.Webflow && window.Webflow.require("ix2").init();
    document.dispatchEvent(new Event("readystatechange"));
    $(steps[x]).show();
  } else {
    $(steps[x]).fadeIn("slow");
  }

  if (x === 0 && !$(steps[x]).data("card")) {
    console.log("First step");
    $(steps[x]).find(`[data-answer]`).show();
  }

  if (selection.length > 0) {
    console.log("Selection 1", selection[0].selected);
    $(steps[x]).find(`[data-answer="${selection[0].selected}"]`).show();
  } else {
    console.log("Selection 2", answer);
    $(steps[x]).find(`[data-answer="${answer}"]`).show();
  }

  //hide unhide button depanding on step
  if (x === 0) {
    $('[data-form="back-btn"]').hide();
    $('[data-form="next-btn"]').show();
  } else if (
    x === steps.length - 1 ||
    $(steps[x]).find('[data-form="submit"]:visible').length > 0
  ) {
    $('[data-form="next-btn"]').hide();
    $('[data-form="submit-btn"]').show();
    $('[data-form="back-btn"]').show();
  } else {
    $('[data-form="next-btn"]').show();
    $('[data-form="back-btn"]').show();
    $('[data-form="submit-btn"]').hide();
  }

  //focus first input in every step
  $($(steps[x]).find("input[autofocus]")[0]).focus();
  $($(steps[x]).find("textarea[autofocus]")[0]).focus();
  validation();

  for (idx = 0; idx <= progress; idx++) {
    $($('[data-form="custom-progress-indicator"]')[idx]).removeClass(
      "disabled"
    );
  }
}

function validateEmail(email, blockDomain) {
  let domainEntered = email.includes("@")
    ? email.split("@")[1].split(".")[0]
    : [];
  dom = [];
  if (blockDomain !== undefined) {
    blockDomain.split(",").forEach(function (x) {
      if (x.includes(domainEntered)) {
        dom.push(domainEntered);
      }
    });
  }

  if (dom.length > 0) {
    domainAllowed = false;
  } else {
    domainAllowed = true;
  }

  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,20})?$/;
  if (!emailReg.test(email)) {
    emailFilled = false;
  } else {
    emailFilled = true;
  }
}

// function validateEmail(email, blockDomain) {
//   const isValidEmailFormat = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,20})?$/.test(email);
//   const domainEntered = email.includes("@")
//     ? email.split("@")[1].split(".")[0]
//     : "";

//   let domainAllowed = true;
//   if (blockDomain !== undefined) {
//     const blockedDomains = blockDomain.split(",");
//     domainAllowed = !blockedDomains.some((x) => x.includes(domainEntered));
//   }

//   return isValidEmailFormat && domainAllowed;
// }

function validation() {
  //conditional logic
  console.log(steps[x]);
  if ($(steps[x]).data("card")) {
    enableBtn();
  }

  textareaLength = $(steps[x]).find("textarea[required]:visible").length;
  textInputLength = $(steps[x]).find(
    'input[type="text"][required]:visible'
  ).length;
  selectInputLength = $(steps[x]).find("select[required]:visible").length;
  emailInputLength = $(steps[x]).find('input[type="email"]:visible').length;
  checkboxInputLength = $(steps[x]).find(
    'input[type="checkbox"]:visible'
  ).length;
  // console.log($(steps[x]).find('input[type="text"][required]:visible'));
  if (textInputLength > 0 || selectInputLength > 0 || textareaLength > 0) {
    disableBtn();
  } else {
    enableBtn();
  }

  var checkCount = $(steps[x]).data("checkbox")
    ? $(steps[x]).data("checkbox")
    : 0;

  if (!$("[data-logic-extra]").data("logic-extra")) {
    if ($(steps[x]).find(":input").is('[type="checkbox"]')) {
      console.log("checkbox step val: " + checkCount);
      if (
        checkCount === "*" ||
        checkCount > $(steps[x]).find(':input[type="checkbox"]').length
      ) {
        $(steps[x])
          .find(':input[type="checkbox"]')
          .each(function () {
            if ($(this).is(":checked")) {
              if ($(steps[x]).find(":input[required]").length < 1) {
                checkboxFilled = true;
              }
            } else {
              checkboxFilled = false;
            }
          });
      } else {
        if (
          $(steps[x]).find(':input[type="checkbox"]:checked').length >=
          checkCount
        ) {
          checkboxFilled = true;
        } else {
          checkboxFilled = false;
        }
      }
    }

    if ($(steps[x]).find(":input[required]").is('[type="radio"]')) {
      if ($(steps[x]).find(':input[type="radio"]').is(":checked")) {
        radioFilled = true;
      } else {
        radioFilled = false;
      }
    }

    $(steps[x])
      .find(':input[type="text"][required]')
      .each(function (i) {
        console.log("Text input step val: " + $(this).val());
        if ($(this).val() !== "") {
          empReqInput = empReqInput.filter((y) => y.input !== i);
        } else {
          if (!empReqInput.find((y) => y.input === i)) {
            empReqInput.push({ input: i });
          }
        }

        if (empReqInput.length === 0) {
          inputFilled = true;
        } else {
          inputFilled = false;
        }
      });

    // const requiredTextInputFields = $(steps[x]).find(
    //   ':input[type="text"][required]'
    // );

    // requiredTextInputFields.each(function (i) {
    //   const inputValue = $(this).val();

    //   console.log(empReqInput);
    //   console.log("Text input step val: " + inputValue);

    //   const existingInputIndex = empReqInput.findIndex((y) => y.input === i);

    //   if (inputValue !== "") {
    //     if (existingInputIndex !== -1) {
    //       empReqInput.splice(existingInputIndex, 1);
    //     }
    //   } else {
    //     if (existingInputIndex === -1) {
    //       empReqInput.push({ input: i });
    //     }
    //   }

    //   inputFilled = empReqInput.length === 0;
    // });

    $(steps[x])
      .find(':input[type="tel"][required]')
      .each(function (i) {
        console.log("Tel input step val: " + $(this).val());

        if ($(this).val() !== "") {
          empReqTel = empReqTel.filter((y) => y.input !== i);
        } else {
          if (!empReqTel.find((y) => y.input === i)) {
            empReqTel.push({ input: i });
          }
        }

        if (empReqTel.length === 0) {
          telFilled = true;
        } else {
          telFilled = false;
        }
      });

    $(steps[x])
      .find(':input[type="date"][required]')
      .each(function (i) {
        console.log("Date input step val: " + $(this).val());

        if ($(this).val() !== "") {
          empReqDate = empReqDate.filter((y) => y.input !== i);
        } else {
          if (!empReqDate.find((y) => y.input === i)) {
            empReqDate.push({ input: i });
          }
        }

        if (empReqDate.length === 0) {
          dateFilled = true;
        } else {
          dateFilled = false;
        }
      });

    $(steps[x])
      .find(':input[type="file"][required]')
      .each(function (i) {
        console.log("File input step val: " + $(this).val());
        changeImage();

        let empReqFile = [];

        if ($(this).val() !== "") {
          empReqFile = empReqFile.filter((y) => y.input !== i);
        } else {
          if (!empReqFile.find((y) => y.input === i)) {
            empReqFile.push({ input: i });
          }
        }

        if (empReqFile.length === 0) {
          fileFilled = true;
        } else {
          fileFilled = false;
        }
      });

    // Happens when clicking the "remove" button on the file upload
    $(steps[x])
      .find(".w-icon-file-upload-remove")
      .on("click", function () {
        console.log("1. User removed a file " + $(this).val());
        disableBtn();
      });

    // Happens when clicking the "remove" button on the file upload
    $(steps[x])
      .find(".link-5.w-file-remove-link")
      .on("click", function () {
        console.log("2. User removed a file " + $(this).val());
        disableBtn();
      });

    $(steps[x])
      .find(".link-back.w-inline-block")
      .on("click", function () {
        console.log("User clicked back" + $(this).val());
        enableBtn();
        setAllChecksToTrue();
      });

    // $(steps[x])
    //   .find(".link-back-top.w-inline-block")
    //   .on("click", function () {
    //     console.log("User clicked back" + $(this).val());
    //     enableBtn();
    //     setAllChecksToTrue();
    //   });

    $(".div-block-10 .link-back-top.w-inline-block").on("click", function () {
      console.log("User clicked back" + $(this).val());
      enableBtn();
      setAllChecksToTrue();
    });

    $(steps[x])
      .find("select[required]")
      .each(function (i) {
        console.log("Select input step val: " + $(this).val());

        if ($(this).val() !== "") {
          empReqSelect = empReqSelect.filter((y) => y.input !== i);
        } else {
          if (!empReqSelect.find((y) => y.input === i)) {
            empReqSelect.push({ input: i });
          }
        }

        if (empReqSelect.length === 0) {
          selectFilled = true;
        } else {
          selectFilled = false;
        }
      });

    $(steps[x])
      .find("textarea[required]")
      .each(function (i) {
        console.log("Textarea input step val: " + $(this).val());
        if ($(this).val() !== "") {
          empReqTextarea = empReqTextarea.filter((y) => y.input !== i);
        } else {
          if (!empReqTextarea.find((y) => y.input === i)) {
            empReqTextarea.push({ input: i });
          }
        }

        if (empReqTextarea.length === 0) {
          textareaFilled = true;
        } else {
          textareaFilled = false;
        }
      });

    $(steps[x])
      .find(':input[type="email"][required]')
      .each(function () {
        console.log("Email input step val: " + $(this).val());
        if ($(this).val() !== "") {
          validateEmail($(this).val(), $(this).data("block-domain"));
        } else {
          emailFilled = false;
        }
      });
  } else {
    //////////////////////////////////logic extra validation//////////////////////////////////////////////////
    if ($(steps[x]).data("card")) {
      answer = $(steps[x]).find("[data-go-to]").data("go-to");
      selections = selections.filter((y) => y.step !== x);
      selections.push({ step: x, selected: answer });
      console.log(selections);
    }

    /////////////////////////////////checkbox validation//////////////////////////////////////
    // if (
    //   $(steps[x])
    //     .find("[data-answer]:visible")
    //     .find(":input")
    //     .is('[type="checkbox"]')
    // ) {
    //   if (
    //     checkCount === "*" ||
    //     checkCount > $(steps[x]).find(':input[type="checkbox"]').length
    //   ) {
    //     $(steps[x])
    //       .find(':input[type="checkbox"]')
    //       .each(function () {
    //         console.log("Checkbox input step val: " + $(this).val());
    //         if ($(this).is(":checked")) {
    //           if ($(steps[x]).find(":input[required]").length < 1) {
    //             if ($(this).parents("[data-go-to]").attr("data-go-to")) {
    //               answer = $(this).parents("[data-go-to]").attr("data-go-to");
    //               selections = selections.filter((y) => y.step !== x);
    //               selections.push({ step: x, selected: answer });
    //             }
    //             checkboxFilled = true;
    //           }
    //         } else {
    //           checkboxFilled = false;
    //         }
    //       });
    //   } else {
    //     if (
    //       $(steps[x])
    //         .find("[data-answer]:visible")
    //         .find(':input[type="checkbox"]:checked').length >= checkCount
    //     ) {
    //       console.log("Checkbox input step val: " + $(this).val());

    //       if (
    //         $(steps[x])
    //           .find("[data-answer]:visible")
    //           .find(':input[type="checkbox"]:checked')
    //           .parents("[data-go-to]")
    //           .attr("data-go-to")
    //       ) {
    //         answer = $(steps[x])
    //           .find("[data-answer]:visible")
    //           .find(':input[type="checkbox"]:checked')
    //           .parents("[data-go-to]")
    //           .attr("data-go-to");
    //         selections = selections.filter((y) => y.step !== x);
    //         selections.push({ step: x, selected: answer });
    //       }
    //       selections = selections.filter((y) => y.step !== x);
    //       selections.push({ step: x, selected: answer });
    //       checkboxFilled = true;
    //       //}
    //     } else {
    //       checkboxFilled = false;
    //     }
    //   }
    // }

    //////////////////////////////////radio input validation////////////////////////////////////////////
    // if (
    //   $(steps[x])
    //     .find("[data-answer]:visible")
    //     .find(":input[required]")
    //     .is('[type="radio"]')
    // ) {
    //   if (
    //     $(steps[x])
    //       .find("[data-answer]:visible")
    //       .find(':input[type="radio"][required]')
    //       .is(":checked")
    //   ) {
    //     console.log("Radio input step val: " + $(this).val());
    //     radioFilled = true;
    //   } else {
    //     radioFilled = false;
    //   }
    // } else {
    //   radioFilled = true;
    // }

    //////////////////////////text input validation/////////////////////////////////////
    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find(':input[type="text"][required]')
    //   .each(function (i) {
    //     console.log("Text input step val: " + $(this).val());
    //     if ($(this).val() !== "") {
    //       empReqInput = empReqInput.filter((y) => y.input !== i);
    //     } else {
    //       if (!empReqInput.find((y) => y.input === i)) {
    //         empReqInput.push({ input: i });
    //       }
    //     }
    //     console.log($(steps[x]).find("[data-answer]:visible"));
    //     if (empReqInput.length === 0) {
    //       inputFilled = true;
    //     } else {
    //       inputFilled = false;
    //     }
    //   });

    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find(':input[type="text"]')
    //   .each(function (i) {
    //     console.log("Text input step val: " + $(this).val());
    //     skipTo = undefined;
    //     if ($(this).parents("[data-skip-to]").data("skip-to") !== "") {
    //       skipTo = $(this).parents("[data-skip-to]").data("skip-to");
    //     }
    //     if ($(this).parents("[data-go-to]").attr("data-go-to")) {
    //       answer = $(this).parents("[data-go-to]").attr("data-go-to");
    //       selections = selections.filter((y) => y.step !== x);
    //       selections.push({ step: x, selected: answer });
    //       if (skipTo) {
    //         selections.push({ step: skipTo - 2, selected: answer });
    //         objIndex = selections.findIndex((obj) => obj.step === x);
    //         selections[objIndex].skipTo = parseInt(skipTo) - 1;
    //         selections[objIndex].backTo = x;
    //       }
    //     }
    //   });

    //////////////////////////phone input validation/////////////////////////////////////
    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find(':input[type="tel"][required]')
    //   .each(function (i) {
    //     console.log("Phone input step val: " + $(this).val());
    //     if ($(this).val() !== "") {
    //       empReqTel = empReqTel.filter((y) => y.input !== i);
    //     } else {
    //       if (!empReqTel.find((y) => y.input === i)) {
    //         empReqTel.push({ input: i });
    //       }
    //     }

    //     if (empReqTel.length === 0) {
    //       telFilled = true;
    //     } else {
    //       telFilled = false;
    //     }
    //   });

    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find(':input[type="tel"]')
    //   .each(function (i) {
    //     console.log("Phone input step val: " + $(this).val());
    //     skipTo = undefined;
    //     if ($(this).parents("[data-skip-to]").data("skip-to") !== "") {
    //       skipTo = $(this).parents("[data-skip-to]").data("skip-to");
    //     }
    //     if ($(this).parents("[data-go-to]").attr("data-go-to")) {
    //       answer = $(this).parents("[data-go-to]").attr("data-go-to");
    //       selections = selections.filter((y) => y.step !== x);
    //       selections.push({ step: x, selected: answer });
    //       if (skipTo) {
    //         selections.push({ step: skipTo - 2, selected: answer });
    //         objIndex = selections.findIndex((obj) => obj.step === x);
    //         selections[objIndex].skipTo = parseInt(skipTo) - 1;
    //         selections[objIndex].backTo = x;
    //       }
    //     }
    //   });

    //////////////////////////file input validation/////////////////////////////////////
    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find(':input[type="file"][required]')
    //   .each(function (i) {
    //     console.log("File input validation val: " + $(this).val());

    //     if ($(this).val() !== "") {
    //       empReqfile = empReqfile.filter((y) => y.input !== i);
    //     } else {
    //       if (!empReqfile.find((y) => y.input === i)) {
    //         empReqfile.push({ input: i });
    //       }
    //     }

    //     if (empReqfile.length === 0) {
    //       fileFilled = true;
    //     } else {
    //       fileFilled = false;
    //     }
    //   });

    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find(':input[type="file"]')
    //   .each(function (i) {
    //     console.log("File input validation val: " + $(this).val());

    //     skipTo = undefined;
    //     if ($(this).parents("[data-skip-to]").data("skip-to") !== "") {
    //       skipTo = $(this).parents("[data-skip-to]").data("skip-to");
    //     }
    //     if ($(this).parents("[data-go-to]").attr("data-go-to")) {
    //       answer = $(this).parents("[data-go-to]").attr("data-go-to");
    //       selections = selections.filter((y) => y.step !== x);
    //       selections.push({ step: x, selected: answer });
    //       if (skipTo) {
    //         selections.push({ step: skipTo - 2, selected: answer });
    //         objIndex = selections.findIndex((obj) => obj.step === x);
    //         selections[objIndex].skipTo = parseInt(skipTo) - 1;
    //         selections[objIndex].backTo = x;
    //       }
    //     }
    //   });

    //////////////////////////number input validation/////////////////////////////////////
    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find(':input[type="number"][required]')
    //   .each(function (i) {
    //     console.log("Number input step val: " + $(this).val());
    //     if ($(this).val() !== "") {
    //       empReqInput = empReqInput.filter((y) => y.input !== i);
    //     } else {
    //       if (!empReqInput.find((y) => y.input === i)) {
    //         empReqInput.push({ input: i });
    //       }
    //     }

    //     if (empReqInput.length === 0) {
    //       inputFilled = true;
    //     } else {
    //       inputFilled = false;
    //     }
    //   });

    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find(':input[type="number"]')
    //   .each(function (i) {
    //     console.log("Number input step val: " + $(this).val());
    //     skipTo = undefined;
    //     if ($(this).parents("[data-skip-to]").data("skip-to") !== "") {
    //       skipTo = $(this).parents("[data-skip-to]").data("skip-to");
    //     }
    //     if ($(this).parents("[data-go-to]").attr("data-go-to")) {
    //       answer = $(this).parents("[data-go-to]").attr("data-go-to");
    //       selections = selections.filter((y) => y.step !== x);
    //       selections.push({ step: x, selected: answer });
    //       if (skipTo) {
    //         selections.push({ step: skipTo - 2, selected: answer });
    //         objIndex = selections.findIndex((obj) => obj.step === x);
    //         selections[objIndex].skipTo = parseInt(skipTo) - 1;
    //         selections[objIndex].backTo = x;
    //       }
    //     }
    //   });

    //////////////////////////select input validation///////////////////////////////////
    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find("select[required]")
    //   .each(function (i) {
    //     console.log("Select input step val: " + $(this).val());
    //     if ($(this).val() !== "") {
    //       empReqSelect = empReqSelect.filter((y) => y.input !== i);
    //     } else {
    //       if (!empReqSelect.find((y) => y.input === i)) {
    //         empReqSelect.push({ input: i });
    //       }
    //     }

    //     if (empReqSelect.length === 0) {
    //       selectFilled = true;
    //     } else {
    //       selectFilled = false;
    //     }
    //   });

    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find("select")
    //   .each(function (i) {
    //     console.log("Select input step val: " + $(this).val());
    //     skipTo = undefined;
    //     if ($(this).parents("[data-skip-to]").data("skip-to") !== "") {
    //       skipTo = $(this).parents("[data-skip-to]").data("skip-to");
    //     }
    //     if ($(this).parents("[data-go-to]").attr("data-go-to")) {
    //       answer = $(this).parents("[data-go-to]").attr("data-go-to");
    //       selections = selections.filter((y) => y.step !== x);
    //       selections.push({ step: x, selected: answer });
    //       if (skipTo) {
    //         selections.push({ step: skipTo - 2, selected: answer });
    //         objIndex = selections.findIndex((obj) => obj.step === x);
    //         selections[objIndex].skipTo = parseInt(skipTo) - 1;
    //         selections[objIndex].backTo = x;
    //       }
    //     }
    //   });

    //////////////////////////textarea validation////////////////////////////////
    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find("textarea[required]")
    //   .each(function (i) {
    //     console.log("Textarea input step val: " + $(this).val());
    //     if ($(this).val() !== "") {
    //       empReqTextarea = empReqTextarea.filter((y) => y.input !== i);
    //     } else {
    //       if (!empReqTextarea.find((y) => y.input === i)) {
    //         empReqTextarea.push({ input: i });
    //       }
    //     }

    //     if (empReqTextarea.length === 0) {
    //       textareaFilled = true;
    //     } else {
    //       textareaFilled = false;
    //     }
    //   });

    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find("textarea")
    //   .each(function (i) {
    //     console.log("Textarea input step val: " + $(this).val());
    //     skipTo = undefined;
    //     if ($(this).parents("[data-skip-to]").data("skip-to") !== "") {
    //       skipTo = $(this).parents("[data-skip-to]").data("skip-to");
    //     }
    //     if ($(this).parents("[data-go-to]").attr("data-go-to")) {
    //       answer = $(this).parents("[data-go-to]").attr("data-go-to");
    //       selections = selections.filter((y) => y.step !== x);
    //       selections.push({ step: x, selected: answer });
    //       if (skipTo) {
    //         selections.push({ step: skipTo - 2, selected: answer });
    //         objIndex = selections.findIndex((obj) => obj.step === x);
    //         selections[objIndex].skipTo = parseInt(skipTo) - 1;
    //         selections[objIndex].backTo = x;
    //       }
    //     }
    //   });

    /////////////////////////email validation//////////////////////////////////////
    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find(':input[type="email"][required]')
    //   .each(function (m) {
    //     console.log("Email input step val: " + $(this).val());
    //     if ($(this).val() !== "") {
    //       validateEmail($(this).val(), $(this).data("block-domain"));
    //     } else {
    //       emailFilled = false;
    //     }
    //   });

    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find(':input[type="email"]')
    //   .each(function (m) {
    //     console.log("Email input step val: " + $(this).val());
    //     skipTo = undefined;
    //     if ($(this).parents("[data-skip-to]").data("skip-to") !== "") {
    //       skipTo = $(this).parents("[data-skip-to]").data("skip-to");
    //     }
    //     if ($(this).parents("[data-go-to]").attr("data-go-to")) {
    //       answer = $(this).parents("[data-go-to]").attr("data-go-to");
    //       selections = selections.filter((y) => y.step !== x);
    //       selections.push({ step: x, selected: answer });
    //       if (skipTo) {
    //         selections.push({ step: skipTo - 2, selected: answer });
    //         objIndex = selections.findIndex((obj) => obj.step === x);
    //         selections[objIndex].skipTo = parseInt(skipTo) - 1;
    //         selections[objIndex].backTo = x;
    //       }
    //     }
    //   });

    /////////////////////////date validation//////////////////////////////////////
    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find(':input[type="date"][required]')
    //   .each(function (m) {
    //     console.log("date", $(this).val());

    //     if ($(this).val() !== "") {
    //       empReqDate = empReqDate.filter((y) => y.input !== m);
    //     } else {
    //       if (!empReqDate.find((y) => y.input === m)) {
    //         empReqDate.push({ input: m });
    //       }
    //     }

    //     if (empReqDate.length === 0) {
    //       dateFilled = true;
    //     } else {
    //       dateFilled = false;
    //     }
    //   });

    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find(':input[type="date"]')
    //   .each(function (m) {
    //     console.log("date2", $(this).val());
    //     skipTo = undefined;
    //     if ($(this).parents("[data-skip-to]").data("skip-to") !== "") {
    //       skipTo = $(this).parents("[data-skip-to]").data("skip-to");
    //     }
    //     if ($(this).parents("[data-go-to]").attr("data-go-to")) {
    //       answer = $(this).parents("[data-go-to]").attr("data-go-to");
    //       selections = selections.filter((y) => y.step !== x);
    //       selections.push({ step: x, selected: answer });
    //       if (skipTo) {
    //         selections.push({ step: skipTo - 2, selected: answer });
    //         objIndex = selections.findIndex((obj) => obj.step === x);
    //         selections[objIndex].skipTo = parseInt(skipTo) - 1;
    //         selections[objIndex].backTo = x;
    //       }
    //     }
    //   });
  }

  function setAllChecksToTrue() {
    inputFilled = true;
    dateFilled = true;
    checkboxFilled = true;
    telFilled = true;
    radioFilled = true;
    emailFilled = true;
    domainAllowed = true;
    selectFilled = true;
    fileFilled = true;
    textareaFilled = true;
  }

  if (
    inputFilled &&
    dateFilled &&
    checkboxFilled &&
    telFilled &&
    radioFilled &&
    emailFilled &&
    domainAllowed &&
    selectFilled &&
    fileFilled &&
    textareaFilled
  ) {
    console.log(
      "ENABLING BOTTON BECAUSE inputFilled: " +
        inputFilled +
        " dateFilled: " +
        dateFilled +
        "checkboxFilled: " +
        checkboxFilled +
        " telFilled: " +
        telFilled +
        " radioFilled: " +
        radioFilled +
        " emailFilled: " +
        emailFilled +
        " domainAllowed: " +
        domainAllowed +
        " selectFilled: " +
        selectFilled +
        " fileFilled: " +
        fileFilled +
        " textareaFilled: " +
        textareaFilled
    );
    enableBtn();
  } else {
    console.log(
      "DISABLING BOTTON BECAUSE inputFilled: " +
        inputFilled +
        " dateFilled: " +
        dateFilled +
        "checkboxFilled: " +
        checkboxFilled +
        " telFilled: " +
        telFilled +
        " radioFilled: " +
        radioFilled +
        " emailFilled: " +
        emailFilled +
        " domainAllowed: " +
        domainAllowed +
        " selectFilled: " +
        selectFilled +
        " fileFilled: " +
        fileFilled +
        " textareaFilled: " +
        textareaFilled
    );
    disableBtn();
  }
}

function nextStep() {
  x++;
  console.log(memory);
  if (x > progress) {
    progress = x;
  }

  if (x <= steps.length - 1) {
    updateStep();
    if (memory) {
      saveFilledInput();
    }

    $('[data-text="current-step"]').text(
      $(steps[x]).data("card") ? (curStep = x + 0) : (curStep = x + 1)
    );
  }
  console.log(x);
  return x;
}

function backStep() {
  if (x > 0) {
    $(progressbar[x]).removeClass("current");
    selections.filter((sk) => sk.skipTo === x).length > 0
      ? (x = parseInt(
          getSafe(() => selections.filter((sk) => sk.skipTo === x)[0].backTo)
        ))
      : x--;

    updateStep();
  }
  $('[data-text="current-step"]').text((curStep = x + 1));
}

$("body").on("keypress", function (e) {
  if (e.keyCode === 13 && fill) {
    if ($("[data-enter]").data("enter")) {
      $('[data-form="next-btn"]')[0].click();
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      e.stopPropagation();
    }
  }
});

$("body").keydown(function (e) {
  if ((e.metaKey || e.ctrlKey) && e.keyCode == 13) {
    if (x >= steps.length - 1 && fill) {
      $('[data-form="submit-btn"]').click();
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
  }
});

function selectionQuiz() {
  if ($(this).find('[data-btn="check"]')) {
    $("[data-selection]").hide();
    if ($(`[data-selection="${selString}"]`).data("selection")) {
      $(`[data-selection="${selString}"]`).fadeIn();
    } else {
      $('[data-selection="other"]').fadeIn();
    }
  }
}

$('[data-form="next-btn"]').on("click", function () {
  console.log("Clicked to continue");
  scrollTop();
  next = true;
  let step_number = nextStep();
  console.log("Step number: ", step_number);
  selectionQuiz();
});

$('[data-form="back-btn"]').on("click", function () {
  scrollTop();
  next = false;
  backStep();
});

$(steps)
  .find(":input")
  .on("input", function (input) {
    validation();
  });

$(steps)
  .find(":radio")
  .on("click", function () {
    if ($(steps[x]).find(":input").is(":checked")) {
      skipTo = undefined;
      if ($(this).parents("[data-skip-to]").data("skip-to")) {
        skipTo = $(this).parents("[data-skip-to]").data("skip-to");
      } else if ($(this).data("skip-to")) {
        skipTo = $(this).data("skip-to");
      }

      selArr = [];
      $(steps)
        .find("[data-selected]:checked")
        .each(function (y, i) {
          selArr.push({ selected: $(this).data("selected") });
        });

      selString = [];
      selArr.forEach((sel) => selString.push(sel.selected));

      console.log("Radio button selected", $(this).val());
      if ($(this).val() === "Girl") {
        is_boy = false;
      } else {
        is_boy = true;
      }

      $(steps[x])
        .find("[data-answer]:visible")
        .find(":input[type='radio']:checked")
        .each(function () {
          if ($(this).data("go-to")) {
            answer = $(this).attr("data-go-to");
            selections = selections.filter((y) => y.step !== x);
            selections.push({ step: x, selected: answer });
            if (skipTo) {
              selections.push({ step: skipTo - 2, selected: answer });
              objIndex = selections.findIndex((obj) => obj.step === x);
              selections[objIndex].skipTo = parseInt(skipTo) - 1;
              selections[objIndex].backTo = x;
            }
          } else if ($(this).parents("[data-go-to]").data("go-to")) {
            answer = $(this).parents("[data-go-to]").data("go-to");
            selections = selections.filter((y) => y.step !== x);
            selections.push({ step: x, selected: answer });
            if (skipTo) {
              selections.push({ step: skipTo - 2, selected: answer });
              objIndex = selections.findIndex((obj) => obj.step === x);
              selections[objIndex].skipTo = parseInt(skipTo) - 1;
              selections[objIndex].backTo = x;
            }
          }
        });

      if (
        $(steps[x]).find("[data-radio-skip]:visible").data("radio-skip") ===
        true
      ) {
        if (
          textareaLength === 0 &&
          textInputLength === 0 &&
          emailInputLength === 0 &&
          checkboxInputLength === 0
        ) {
          setTimeout(function () {
            next = true;
            nextStep();
            selectionQuiz();
          }, $(steps[x]).find("[data-radio-delay]").data("radio-delay"));
        }
      }
    }
  });

////////////////////////////custom indicator nav
if ($("[data-clickable-all]").data("clickable-all")) {
  $('[data-form="custom-progress-indicator"]').removeClass("disabled");
} else {
  $('[data-form="custom-progress-indicator"]').addClass("disabled");
}
function clickableIndicator() {
  $('[data-form="progress-indicator"]').removeClass("current");
  if ($("[data-clickable]").data("clickable")) {
    if ($("[data-clickable]").data("clickable-all")) {
      x = $(this).index();
      updateStep();
    } else {
      if ($(this).index() <= progress) {
        x = $(this).index();
        updateStep();
      }
    }
  }
}
$('[data-form="custom-progress-indicator"]').on("click", clickableIndicator);
/////////////////////

/////debug mode//////////////////
if ($('[data-form="multistep"]').data("debug-mode")) {
  console.log("debug mode");
  //data go to attr
  $("[data-go-to]").each(function () {
    $(this).append("<br>Data Go To = ", $(this).data("go-to"));
  });
  //data answer attr
  $("[data-answer]").each(function () {
    $(this).append("<br>Data Answer = ", $(this).data("answer"));
  });
}
/////////////////////////////

$('[data-form="submit-btn"]').on("click", function (e) {
  console.log("clicked submit");

  e.preventDefault();
  e.stopPropagation();
  console.log("form is being submitted");

  if ($('[data-form="multistep"]').data("logic-extra")) {
    //if(x === $('[data-form="step"]:not([data-card="true"])').length || $(steps[x]).find('[data-form="submit"]:visible').length > 0){
    $(this).prop("novalidate", true);
    $(steps).find(":input").prop("required", false);
    console.log("nonvalidated");
  }

  //function to remove unanswered card
  if ($('[data-form="multistep"]').data("remove-unfilled")) {
    for (j = 1; j <= selections.length; j++) {
      $(steps[j])
        .find(
          `[data-answer]:not([data-answer="${selections[j - 1].selected}"])`
        )
        .remove();
    }
  }

  localStorage.removeItem("filledInput");
  if (fill) {
    if ($(this).data("wait")) {
      $(this).val($(this).data("wait"));
    } else {
      $(this).val("Please wait...");
      $(this).text("Please wait...");
    }
    $('[data-form="multistep"]').submit();
  }
});

steps.each(function () {
  $('[data-form="progress"]').append(progressbarClone.clone(true, true));
});
progressbar = $('[data-form="progress"]').children();
$('[data-form="progress-indicator"]').on("click", clickableIndicator);
updateStep();

var textareas = document.querySelectorAll("textarea");

// Iterate over each textarea element
textareas.forEach(function (textarea) {
  // Add event listener for keypress event
  textarea.addEventListener("keypress", function (event) {
    // Focus on the current textarea
    this.focus();

    // Prevent default behavior of Enter key
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Add a newline if Shift+Enter is pressed
    if (event.shiftKey && event.key === "Enter") {
      this.value += "\n";
    }
  });
});

////////////////////////////////////////////////

// if (new URL(window.location.href).searchParams.size > 0) {
//   document.querySelectorAll(".next-button")[0].click();
// }
