import {
  compose,
  applyMiddleware,
  createStore as createReduxStore,
} from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import * as actions from './actions';
import { reducer } from './reducer';

export function createStore() {
  const store = createReduxStore(
    reducer,
    undefined,
    compose(applyMiddleware(thunk, logger))
  );

  persistStore(store);

  let interval: number | null = null;
  store.subscribe(() => {
    const state = store.getState();

    if (!state) {
      return;
    }

    if (interval && Object.keys(state.config).length === 0) {
      window.clearInterval(interval);
      interval = null;
      return;
    }

    if (
      !interval &&
      state.validGithubToken &&
      Object.keys(state.config).length > 0
    ) {
      interval = window.setInterval(
        () => store.dispatch(actions.fetchPullRequests()),
        5000
      );
      store.dispatch(actions.fetchPullRequests());
      return;
    }
  });

  return store;
}
