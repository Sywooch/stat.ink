/*! Copyright (C) 2016 AIZAWA Hina | MIT License */
"use strict";

let connection = null;

const getConfig = () => new Promise((resolve, reject) => {
  console.log('Loading db configuration.');
  const path = require('path');
  const exec = require('child_process').exec;
  const yii = path.resolve(__dirname, '..', '..', 'yii');
  exec(yii + ' streamer/config', (err, stdout, stderr) => {
    if (err) {
      reject(err);
      return;
    }
    try {
      const json = JSON.parse(stdout);
      console.log('JSON parse ok.');
      resolve(json);
    } catch (e) {
      reject(e);
    }
  });
});

const getConnection = () => new Promise(resolve => {
  if (connection) {
    resolve(connection);
    return;
  }

  console.log('Creating new db connection');
  getConfig()
    .then(config => {
      console.log('Config loaded');
      const knex = require('knex');
      connection = knex({
        'client': 'pg',
        'connection': config,
        'searchPath': 'public',
      });
      console.log('Querying first query to connect to the db.');
      return connection.raw('SELECT VERSION() AS v');
    })
    .then(version => {
      console.log('Query done. Version=' + version.rows[0].v);
      console.log('Connected to the db.');
      resolve(connection);
    });
});

const destroyConnection = () => new Promise(resolve => {
  if (!connection) {
    resolve();
    return;
  }
  console.log('Closing db connection');
  connection.client.destroy()
    .then(() => {
      console.log('Closed');
      resolve();
    });
});

module.exports = {
  'getConnection': getConnection,
  'destroyConnection': destroyConnection,
};
