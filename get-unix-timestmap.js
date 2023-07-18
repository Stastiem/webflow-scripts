function getUnixTimestampFromAPI() {
    return new Promise((resolve, reject) => {
      fetch('https://worldtimeapi.org/api/timezone/Europe/Riga')
        .then((response) => response.json())
        .then((data) => {
          const timestamp = data.unixtime;
          resolve(timestamp);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

Webflow.push(function() {
    $('form').submit(function(event) {
     window.dataLayer.push({'event': 'OrderFilled'});
      event.preventDefault();

      getUnixTimestampFromAPI()
        .then((timestamp) => {
          const website_url = "https://buy.stripe.com/4gw3ewb2C7PaaKQbII"
          const ref_id = $("#Email").val().replace(/@/g, '___').replace(/\./g, '__').toLowerCase() + "_" + timestamp;
          setTimeout(function() {
            location.href = website_url + "?prefilled_email=" + $("#Email").val()
                                        + "&client_reference_id=" + ref_id
                                        + "&locale=" + $("#BookLanguage").val();
          }, 100);
        })
        .catch((error) => {
          console.error('Error fetching the timestamp:', error);
        });
    });
  });
