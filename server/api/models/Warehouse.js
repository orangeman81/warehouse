/**
 * Warehouse.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: { type: 'string', required: true },
    serial: { type: 'string', required: true },
    type: { type: 'string', required: true },
    note: { type: 'string', required: false },
    assignee: { type: 'string', required: false },
    conditions: { type: 'string', required: false },
    assigned: { type: 'boolean', required: false },
    deleted: { type: 'boolean', required: false }
  }

};

