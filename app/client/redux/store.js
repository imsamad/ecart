import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
let store;

function initStore(initialState = initState) {
  // console.log('3 initStore run with initialState', initialState);
  // console.log('three one');
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}

export const initializeStore = (preloadedState) => {
  // console.log('two one');
  let _store = store ?? initStore(preloadedState);
  if (preloadedState && store) {
    // console.log('two two');
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }

  if (typeof window === 'undefined') {
    // console.log('two three');
    return _store;
  }
  if (!store) {
    // console.log('two four');
    store = _store;
  }
  // console.log('two five');

  return _store;
};

export function useStore(initialState) {
  // console.log('One ', initialState);
  const store = useMemo(() => {
    // console.log('One two');
    return initializeStore(initialState);
  }, [initialState]);
  return store;
}
