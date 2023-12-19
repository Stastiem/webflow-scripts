const phoneInputField = document.querySelector("#Phone");

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
