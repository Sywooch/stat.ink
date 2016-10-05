/*! Copyright (C) 2016 AIZAWA Hina | MIT License */

const db = require('./app/db');
const config_ = require('./app/config');
const message_ = require('./app/message');

let appConfig;
let dbConn;

Promise.all([
    config_.load(),
    db.getConnection(),
  ])
  .then(_ => {
    appConfig = _[0];
    dbConn = _[1];
  })
  .then(() => {
    console.log(appConfig);
  });


/*
db.getConnection()
  .then(dbConn => new Promise(exit_ => {
    let intervalTimer;

    const exit = code => {
      console.log("Exiting...");
      if (intervalTimer) {
        clearInterval(intervalTimer);
      }
      db.destroyConnection()
        .then(
          () => { exit_(code) },
          () => { process.exit(code) }
        );
    };

    // 終了ハンドラ
    process.on('SIGINT', () => {exit(0)});
    process.on('SIGTERM', () => {exit(0)});

    // PHPからの通知シグナル
    process.on('SIGUSR2', () => {
      // ぶろーどきゃすとすべし
    });

    intervalTimer = setInterval(() => {
      message_.getCounts(dbConn)
        .then((msg) => { console.log(msg); });
    }, 1000);
  }));
*/

  // .then(conn => message_.getCounts(conn))
  // .then(msg => {console.log(msg)})
  // .then(() => db.destroyConnection());
