/**
 * Assignee.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: { type: 'string', required: true },
    surname: { type: 'string', required: true },
    email: { type: 'string', required: true },
    phone: { type: 'string', required: true },
    role: { type: 'string', required: true },
    products: { type: 'json', columnType: 'array', required: false }
  },

};

