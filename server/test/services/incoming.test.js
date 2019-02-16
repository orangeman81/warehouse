const assert = require('assert');
const app = require('../../src/app');

describe('\'incoming\' service', () => {
  it('registered the service', () => {
    const service = app.service('incoming');

    assert.ok(service, 'Registered the service');
  });
});
