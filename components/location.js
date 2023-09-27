import { disableBtn } from "./disableBtn.js";
import { enableBtn } from "./enableBtn.js";
import { validateInput } from "./validation.js";

let autocompleteCity;
let autocompleteStr;
let countryInputField = document.querySelector("#Country");
let streetInputField = document.querySelector("#Street");
let cityInputField = document.querySelector("#City");
let zipCode = document.getElementById("ZipCode");

countryInputField.addEventListener("change", (e) => {
  initCityAutocomplete(e.target.value);
  autocompleteStr.setComponentRestrictions({
    country: countryInputField.value,
  });
});

function initCityAutocomplete(selectedCountry = "lv") {
  autocompleteCity = new google.maps.places.Autocomplete(cityInputField, {
    types: ["(regions)"],
  });
  autocompleteCity.setComponentRestrictions({ country: selectedCountry });
  autocompleteCity.addListener("place_changed", fillInCity);
}

function findAddressData(data, place) {
  const dataObject = place.address_components.find((el) =>
    el.types.includes(data)
  );
  return dataObject ? dataObject.long_name : "";
}

function fillInCity() {
  const place = autocompleteCity.getPlace();
  if (!place.geometry) {
    cityInputField.placeholder = "Enter a place";
  } else {
    // different address fields for different countries
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
        break;

      case "gb":
        cityInputField.value =
          findAddressData("locality", place) +
          ", " +
          findAddressData("administrative_area_level_2", place);
        break;

      case "de":
        cityInputField.value =
          findAddressData("locality", place) +
          ", " +
          findAddressData("administrative_area_level_1", place);
        break;
      default:
        break;
    }
    zipCode.value = findAddressData("postal_code", place);
  }
  // rectric autocomplete to city
  function setCityBias(cityName) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: cityName }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const cityLocation = results[0].geometry.location;
        const circle = new google.maps.Circle({
          center: cityLocation,
          radius: 10000, // Adjust the radius as needed
        });

        autocompleteStr.setBounds(circle.getBounds());
      }
    });
  }
  setCityBias(document.getElementById("City").value);
}

// google maps autocomplete for street
autocompleteStr = new google.maps.places.Autocomplete(
  document.getElementById("Street"),
  {
    types: ["address"],
  }
);
autocompleteStr.addListener("place_changed", fillInAddress);

function fillInAddress() {
  const address = autocompleteStr.getPlace();

  if (!address.geometry) {
    streetInputField.placeholder = "Enter a place";
  } else {
    // different address fields for different countries
    switch (countryInputField.value) {
      case "lv":
        streetInputField.value = findAddressData("street_number", address)
          ? findAddressData("route", address) +
            ", " +
            findAddressData("street_number", address)
          : findAddressData("route", address)
          ? findAddressData("route", address)
          : findAddressData("premise", address) ||
            findAddressData("establishment", address);
        break;

      case "gb":
        streetInputField.value =
          findAddressData("route", address) +
          ", " +
          findAddressData("street_number", address);
        break;

      case "de":
        streetInputField.value =
          findAddressData("route", address) +
          ", " +
          findAddressData("street_number", address);
        break;
      default:
        break;
    }
    zipCode.value = findAddressData("postal_code", address);
  }
  if (validateInput($(':input[type="text"][required]:visible'))) {
    enableBtn();
  } else {
    disableBtn();
  }
}
