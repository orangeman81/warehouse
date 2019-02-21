const assert = require('assert');
const app = require('../../src/app');

describe('\'movements\' service', () => {
  it('registered the service', () => {
    const service = app.service('movements');

    assert.ok(service, 'Registered the service');
  });
});
