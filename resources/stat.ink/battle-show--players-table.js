/*! Copyright (C) 2016 AIZAWA Hina | MIT License */
"use strict";
(($, exports) => {
  const teamCss = color => {
    const css = {
      'background': color,
      'color': '#fff',
      'text-shadow': '1px 1px 0 rgba(0,0,0,.8)',
    };
    return $.map(css, (v, k) => `${k}:${v};`).join('');
  };

  const makeStyle = (myTeamColor, hisTeamColor) => 
    '#players .bg-my{' + teamCss(myTeamColor) + '}' +
    '#players .bg-his{' + teamCss(hisTeamColor) + '}' +
    '#players .its-me{background:#ffc}';

  const decorate = (myTeamColor, hisTeamColor) => {
    $(() => {
      $('head').append($('<style>').text(makeStyle(myTeamColor, hisTeamColor)));
    });
  };

  exports.decoratePlayersTable = decorate;
})(jQuery, window);
