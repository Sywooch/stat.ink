/*! Copyright (C) 2016 AIZAWA Hina | MIT License */
"use strict";
($ => {
  $(() => {
    const events = window.battleEvents;
    const hasObjectiveEvents = events.filter(v => v.type === "objective").length > 0;
    const hasSplatZoneEvents = events.filter(v => v.type === "splatzone").length > 0;
    if (!hasObjectiveEvents && !hasSplatZoneEvents) {
      return;
    }

    $('#enable-smoothing')
      .prop('disabled', false)
      .prop('checked', hasSplatZoneEvents ? true : false)
      .change(ev => {
        $('#timeline').attr(
          'data-object-smoothing',
          $(ev.target).prop('checked') ? "enable" : "disable"
        );
        $(window).resize(); // trigger redraw
      })
      .change();
  });
})(jQuery);
