import { whReducer, initialState } from './warehouse.reducer';

describe('Warehouse Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = whReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
