import { whReducer, initialWhState } from './warehouse.reducer';

describe('Warehouse Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = whReducer(initialWhState, action);

      expect(result).toBe(initialWhState);
    });
  });
});
