import { asReducer, initialAsState } from './assignee.reducer';

describe('Assignee Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = asReducer(initialAsState, action);

      expect(result).toBe(initialAsState);
    });
  });
});
