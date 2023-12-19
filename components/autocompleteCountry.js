// export async function autocompleteCountry() {
//   try {
//     const response = await fetch(
//       "https://api.ipstack.com/check?access_key=f1ae51206259317fd67b5c88fcdfe7d8"
//     );
//     const data = await response.json();
//     console.log(data);
//     const userCountry = data.country_code.toLowerCase();
//     console.log(userCountry);
//     const select = document.getElementById("Country");

//     for (let i = 0; i < select.options.length; i++) {
//       const option = select.options[i];
//       if (option.value === userCountry) {
//         option.selected = true;
//         break;
//       }
//     }
//   } catch (error) {
//     console.error("Error fetching country information:", error);
//   }
// }
// export async function autocompleteCountry() {
//   try {
//     const position = await getCurrentPosition();
//     const userCountry = await getCountryFromCoordinates(
//       position.coords.latitude,
//       position.coords.longitude
//     );
//     const select = document.getElementById("Country");

//     for (let i = 0; i < select.options.length; i++) {
//       const option = select.options[i];
//       if (option.value === userCountry) {
//         option.selected = true;
//         break;
//       }
//     }
//   } catch (error) {
//     console.error("Error fetching country information:", error);
//   }
// }

// function getCurrentPosition() {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// }

// async function getCountryFromCoordinates(latitude, longitude) {
//   const response = await fetch(
//     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
//   );
//   const data = await response.json();
//   return data.countryCode.toLowerCase();
// }
