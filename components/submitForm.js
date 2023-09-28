let isTesting = false;
const urlFormly = new URL(window.location.href);
const environment = document.querySelector("#Environment");
const host = urlFormly.host;
const port = urlFormly.port;
const checkboxes = document.querySelectorAll(
  "input[name=Audio], input[name=Painting], input[name=Card]"
);
const checkmarks = document.querySelectorAll(".check-mark");
const refId = uuidv4();
const clientRefId = document.querySelector(".ClientReferenceId");
const additions = document.querySelectorAll(
  "input[name=Audio], input[name=Painting], input[name=Card]"
);

// added new field to form data object which shows if order made during staging or production
if (host.includes("stastiem.webflow.io") || port !== "") {
  console.log("staging");
  environment.value = "staging";
  isTesting = true;
} else {
  console.log("production");
  environment.value = "production";
}

// Added logic for changing the checkmark style if the checkbox is checked.
for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("change", () => {
    if (checkboxes[i].checked) {
      checkmarks[i].style.background = "#f0623d";
      checkmarks[i].style.border = "1px solid #f0623d";
    } else {
      checkmarks[i].style.background = "transparent";
      checkmarks[i].style.border = "1px solid rgba(0,0,0,0.15)";
    }
  });
}

clientRefId.value = refId;

var Webflow = Webflow || [];
Webflow.push(function () {
  $("form").on("submit", function (event) {
    window.dataLayer.push({ event: "OrderFilled" });
    event.preventDefault();
    const fetchWithTimeout = (url, options, timeout = 6000) => {
      return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), timeout)
        ),
      ]);
    };

    const fetchWithRetry = async (url, options, retries = 3, delay = 1000) => {
      let lastError;
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetchWithTimeout(url, options);
          if (response.ok) {
            return await response.json();
          }
        } catch (error) {
          lastError = error;
          const randomFactor = Math.random() * 0.5 + 0.5;
          await new Promise((res) =>
            setTimeout(res, delay * Math.pow(2, i) * randomFactor)
          );
        }
      }
      throw lastError;
    };
    const apiUrl = "https://stastiem.herokuapp.com/stripe/stripe-payment-url";
    const website_url = "https://buy.stripe.com/4gw3ewb2C7PaaKQbII";

    const headers = {
      accept: "application/json",
      "Content-Type": "application/json",
    };
    const bodyObject = {
      products: ["book"],
      customer_email: $("#Email").val(),
      client_reference_id: $("#ClientReferenceId").val(),
      language: $("#BookLanguage").val(),
      testing: isTesting,
    };

    additions.forEach(
      (el) => el.checked && bodyObject.products.push(el.id.toLowerCase())
    );

    fetchWithRetry(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(bodyObject),
    })
      .then((data) => (location.href = data.payment_url))
      .catch((error) => {
        console.log("Error:", error);
        setTimeout(function () {
          location.href =
            website_url +
            "?prefilled_email=" +
            $("#Email").val() +
            "&client_reference_id=" +
            $("#ClientReferenceId").val() +
            "&locale=" +
            $("#BookLanguage").val();
        }, 100);
      });
  });
});
