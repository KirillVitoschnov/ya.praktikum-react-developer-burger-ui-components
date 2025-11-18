import rootReducer from './rootReducer';

describe('rootReducer', () => {
  it('should not mutate state for unknown action', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    const newState = rootReducer(initialState, { type: 'UNKNOWN_ACTION' });
    expect(newState).toEqual(initialState);
  });
});

