const assert = require('assert');
const app = require('../../src/app');

describe('\'assignees\' service', () => {
  it('registered the service', () => {
    const service = app.service('assignees');

    assert.ok(service, 'Registered the service');
  });
});
