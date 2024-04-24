function handleDeviceId(mixpanel) {
  const timeoutDuration = 3000;
  const intervalDuration = 50;
  let timerId;

  function checkMixpanelReady() {
    if (typeof mixpanel !== 'undefined' && mixpanel.get_distinct_id && mixpanel.get_distinct_id()) {
      const mixpanelId = mixpanel.get_distinct_id();
      setDeviceIdCookie(mixpanelId);
      console.log('Mixpanel ID used:', mixpanelId);
      clearTimeout(timerId);
    } else {
      timerId = setTimeout(checkMixpanelReady, intervalDuration);
    }
  }

  timerId = setTimeout(checkMixpanelReady, intervalDuration);
  setTimeout(() => {
    if (!timerId) return; // Already cleared
    clearTimeout(timerId);
    let deviceId = getCookie('DEVICE_ID');
    if (!deviceId) {
      deviceId = generateDeviceId();
      setDeviceIdCookie(deviceId);
    }
    console.log('Custom device ID used:', deviceId);
  }, timeoutDuration);
}

// Function to generate a new unique device ID
function generateDeviceId() {
  return '$device:' + crypto.randomUUID();
}

// Function to set the device ID cookie
function setDeviceIdCookie(deviceId) {
  let daysToExpire = 365;  // Set cookie to expire in one year
  let expiryDate = new Date();
  expiryDate.setTime(expiryDate.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
  document.cookie = 'DEVICE_ID=' + deviceId + ';expires=' + expiryDate.toUTCString() + ';path=/;secure';
}

// Function to get a cookie by name
function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
    else return null;
}

export { handleDeviceId };
