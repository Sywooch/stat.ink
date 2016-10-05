/*! Copyright (C) 2016 AIZAWA Hina | MIT License */

"use strict";

const fs = require('fs');
const path = require('path');
const configPath = path.resolve(__dirname, '..', 'config', 'server.json');

const loadConfigFile = () => new Promise((resolve, reject) => {
  let json = '';
  const stream = fs.createReadStream(configPath);
  stream.on('error', err => {
    reject(err);
  });
  stream.on('data', chunk => {
    json = json.concat(chunk);
  });
  stream.on('end', () => {
    try {
      resolve(JSON.parse(json));
    } catch (e) {
      reject(e);
    }
  });
});


module.exports = {
  'load': loadConfigFile,
};
