function handleDeviceId() {
  const timeoutDuration = 3000; // Timeout after 3000 milliseconds (3 seconds)
  const intervalDuration = 50; // Check every 50 milliseconds
  let elapsed = 0;

  // Function to check if Mixpanel is ready and get the distinct_id
  function checkMixpanelReady() {
    if (typeof mixpanel !== 'undefined' && mixpanel.get_distinct_id && mixpanel.get_distinct_id()) {
      const mixpanelId = mixpanel.get_distinct_id();
      setDeviceIdCookie(mixpanelId);
      console.log('Mixpanel ID used:', mixpanelId);
    } else if (elapsed < timeoutDuration) {
      setTimeout(checkMixpanelReady, intervalDuration);
      elapsed += intervalDuration;
    } else {
      // Timeout case: Mixpanel isn't ready, use or generate a custom device ID
      let deviceId = getCookie('DEVICE_ID');
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
  const daysToExpire = 365;  // Set cookie to expire in one year
  const expiryDate = new Date();
  expiryDate.setTime(expiryDate.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
  document.cookie = 'DEVICE_ID=' + deviceId + ';expires=' + expiryDate.toUTCString() + ';path=/;secure';
}

// Function to get a cookie by name
function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
  else return null;
}


export { handleDeviceId };
