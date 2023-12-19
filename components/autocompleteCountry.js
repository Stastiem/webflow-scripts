export async function autocompleteCountry() {
  try {
    const response = await fetch(
      "https://api.ipstack.com/check?access_key=f1ae51206259317fd67b5c88fcdfe7d8"
    );
    const data = await response.json();
    const userCountry = data.country_code.toLowerCase();
    const select = document.getElementById("Country");

    for (let i = 0; i < select.options.length; i++) {
      const option = select.options[i];
      if (option.value === userCountry) {
        option.selected = true;
        break;
      }
    }
  } catch (error) {
    console.error("Error fetching country information:", error);
  }
}
