const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');


module.exports = function (app) {
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local());

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    after: {
      create: [
        context => {
          context.result.user = context.params.user;

          // Don't expose sensitive information.
          delete context.result.user.password;
        }
      ]
    },
    before: {
      create: [
        authentication.hooks.authenticate(config.strategies),

        context => {
          // make sure params.payload exists
          context.params.payload = context.params.payload || {}
          // merge in a `test` property
          const user = context.params.user;
          delete user._id;
          delete user.password;
          Object.assign(context.params.payload, {userInfo: user})
        }
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    }
  });
};
