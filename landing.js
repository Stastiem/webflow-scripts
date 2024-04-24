/**
 * Sets up event listeners on document load to track clicks on elements with `data-tracker` attributes.
 * The `data-tracker` attribute must be in the format 'action|label'. Only well-formed data triggers
 * an event logging via Mixpanel.
 *
 * Details:
 * - ParseTagData: Parses the 'action|label' format and returns an object or null if invalid.
 * - Track: Sends events to Mixpanel with formatted event types and includes both action and label.
 */
document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("click", function (e) {
    if (e.target.dataset.tracker) {
      var trackData = e.target.dataset.tracker;
      var tagData = ParseTagData.tagData(trackData);
      if (!tagData || !tagData.action || !tagData.label) {
        return;
      }
      Track.trackEvent("click", tagData);
    }
  });

  var ParseTagData = {
    tagData: function (data) {
    var tmpData = data.split("|");
      if (tmpData.length !== 2) {
        return null; // Return null instead of an empty string for better error handling.
      }
      return { action: tmpData[0], label: tmpData[1] };
    },
  };

  var Track = {
    trackEvent: function (eventType, data) {
      // Capitalize the first letter of the eventType
      var capitalizedEventType = eventType.charAt(0).toUpperCase() + eventType.slice(1);
      // Include eventType and label in the data payload.
      mixpanel.track(capitalizedEventType, { action: data.action, label: data.label });
    },
  };
});

function handleDeviceId() {
  var timeoutDuration = 3000; // Timeout after 2000 milliseconds (3 seconds)
  var intervalDuration = 100; // Check every 100 milliseconds
  var elapsed = 0;

  // Function to check if Mixpanel is ready and get the distinct_id
  function checkMixpanelReady() {
    if (typeof mixpanel !== 'undefined' && mixpanel.get_distinct_id && mixpanel.get_distinct_id()) {
      var mixpanelId = mixpanel.get_distinct_id();
      setDeviceIdCookie(mixpanelId);
      console.log('Mixpanel ID used:', mixpanelId);
    } else if (elapsed < timeoutDuration) {
      setTimeout(checkMixpanelReady, intervalDuration);
      elapsed += intervalDuration;
    } else {
      // Timeout case: Mixpanel isn't ready, use or generate a custom device ID
      var deviceId = getCookie('DEVICE_ID');
      if (!deviceId) {
        deviceId = generateDeviceId();
        setDeviceIdCookie(deviceId);
      }
      console.log('Custom device ID used:', deviceId);
    }
  }
  checkMixpanelReady();
}

// Function to generate a new unique device ID
function generateDeviceId() {
  return '$device:' + crypto.randomUUID();
}

// Function to set the device ID cookie
function setDeviceIdCookie(deviceId) {
  var daysToExpire = 365;  // Set cookie to expire in one year
  var expiryDate = new Date();
  expiryDate.setTime(expiryDate.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
  document.cookie = 'DEVICE_ID=' + deviceId + ';expires=' + expiryDate.toUTCString() + ';path=/;secure';
}

// Function to get a cookie by name
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
    else return null;
}

// Initialize the device ID handling when the page is fully loaded
document.addEventListener('DOMContentLoaded', handleDeviceId);