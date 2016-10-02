/*! Copyright (C) 2016 AIZAWA Hina | MIT License */

"use strict";

class User {
  constructor(knex) {
    this._knex = knex;
  }

  getRoughCount() {
    return new Promise(resolve => {
      this._knex
        .queryBuilder()
        .select('last_value')
        .table('user_id_seq')
        .then(rows => {
          resolve(parseInt(rows[0].last_value, 10))
        })
    });
  }
}

module.exports = User;
