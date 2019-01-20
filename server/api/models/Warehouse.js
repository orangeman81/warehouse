/**
 * Warehouse.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    assigneeId: { type: 'string', required: false },
    name: { type: 'string', required: true },
    producer: { type: 'string', required: true },
    serial: { type: 'string', required: true },
    type: { type: 'string', required: true },
    note: { type: 'string', required: false },
    assignmentDate: { type: 'number', required: false },
    conditions: { type: 'string', required: false },
    deleted: { type: 'boolean', required: false }
  }

};

