/*! Copyright (C) 2016 AIZAWA Hina | MIT License */
"use strict";
($ => {
  const $btn = $('#private-note-show');
  const $txt = $('#private-note');
  const $i = $('.fa', $btn);
  $btn.hover(
    () => {
      $i.removeClass('fa-lock').addClass('fa-unlock-alt');
    },
    () => {
      $i.removeClass('fa-unlock-alt').addClass('fa-lock');
    }
  ).click(() => {
    $btn.hide();
    $txt.show();
  });
})(jQuery);
