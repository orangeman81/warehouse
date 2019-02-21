// Initializes the `movements` service on path `/movements`
const createService = require('feathers-mongoose');
const createModel = require('../../models/movements.model');
const hooks = require('./movements.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/movements', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('movements');

  service.hooks(hooks);
};
