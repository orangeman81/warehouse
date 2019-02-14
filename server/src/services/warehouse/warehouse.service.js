// Initializes the `warehouse` service on path `/warehouse`
const createService = require('feathers-mongoose');
const createModel = require('../../models/warehouse.model');
const hooks = require('./warehouse.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/warehouse', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('warehouse');

  service.hooks(hooks);
};
