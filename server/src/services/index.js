const users = require('./users/users.service.js');
const warehouse = require('./warehouse/warehouse.service.js');
const assignees = require('./assignees/assignees.service.js');
const incoming = require('./incoming/incoming.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(warehouse);
  app.configure(assignees);
  app.configure(incoming);
};
