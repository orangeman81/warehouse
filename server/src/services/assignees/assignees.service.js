// Initializes the `assignees` service on path `/assignees`
const createService = require('feathers-mongoose');
const createModel = require('../../models/assignees.model');
const hooks = require('./assignees.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/assignees', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('assignees');

  service.hooks(hooks);
};
