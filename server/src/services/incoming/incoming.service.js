// Initializes the `incoming` service on path `/incoming`
const createService = require('feathers-mongoose');
const createModel = require('../../models/incoming.model');
const hooks = require('./incoming.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/incoming', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('incoming');

  service.hooks(hooks);
};
