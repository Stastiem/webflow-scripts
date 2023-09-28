$(document).ready(function() {
    $(document).on('click', '[data-tracker]', function(e) {

      var trackData = $(this).data('tracker');
      if (!trackData) { return; }

      var tagData = ParseTagData.tagData(trackData);
      if (!tagData.action || !tagData.label ) { return; }

      Track.trackEvent('click', { action: tagData.action , label:  tagData.label });
      });

    var ParseTagData = { tagData : function ( data ) {
      var tmpData = data.split("|");
      if (tmpData.length !=2 ) { return ""; }
      return { "action": tmpData[0] ,"label": tmpData[1] };
      }
    };

    var Track= { trackEvent: function (eventType, data) {
      mixpanel.track( data.action );
      }
    };
});
