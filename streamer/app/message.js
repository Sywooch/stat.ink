/*! Copyright (C) 2016 AIZAWA Hina | MIT License */

"use strict";

const clsUser = require('./models/user');
const clsBattle = require('./models/battle');

const getCounts = conn => new Promise(resolve => {
  Promise.all([
    (new clsUser(conn)).getRoughCount(),
    (new clsBattle(conn)).getRoughCount(),
  ])
  .then(counts => {
    resolve({
      'users': counts[0],
      'battles': counts[1],
    });
  });
});

module.exports = {
  'getCounts': getCounts,
};
