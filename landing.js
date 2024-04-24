import { handleDeviceId } from "./utils/handleDeviceId.js";

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
      let trackData = e.target.dataset.tracker;
      let tagData = ParseTagData.tagData(trackData);
      if (!tagData || !tagData.action || !tagData.label) {
        return;
      }
      Track.trackEvent("click", tagData);
    }
  });

  let ParseTagData = {
    tagData: function (data) {
      let tmpData = data.split("|");
      if (tmpData.length !== 2) {
        return null; // Return null instead of an empty string for better error handling.
      }
      return { action: tmpData[0], label: tmpData[1] };
    },
  };

  let Track = {
    trackEvent: function (eventType, data) {
      // Capitalize the first letter of the eventType
      let capitalizedEventType = eventType.charAt(0).toUpperCase() + eventType.slice(1);
      // Include eventType and label in the data payload.
      mixpanel.track(capitalizedEventType, { action: data.action, label: data.label });
    },
  };
});

// Initialize the device ID handling when the page is fully loaded
document.addEventListener('DOMContentLoaded', handleDeviceId(mixpanel));
