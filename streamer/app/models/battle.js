/*! Copyright (C) 2016 AIZAWA Hina | MIT License */

"use strict";

class Battle { 
  constructor(knex) {
    this._knex = knex;
  }

  getRoughCount() {
    return new Promise(resolve => {
      this._knex
        .queryBuilder()
        .select('last_value')
        .table('battle_id_seq')
        .then(rows => {
          resolve(parseInt(rows[0].last_value, 10))
        })
    });
  }
}

module.exports = Battle;
