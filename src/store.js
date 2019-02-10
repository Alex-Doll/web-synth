import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      console.log(`No action found for ${action.type}`);
      return state;
  }
};

const challengeReducer = (state = [], action) => {
  switch (action.type) {
    default:
      console.log(`No action found for ${action.type}`);
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  challenges: challengeReducer,
});

const initialState = {
  user: {
    name: 'Alex',
  },
  challenges: [
    'challenge1',
    'challenge2',
    'challenge3',
  ],
};

const middleware = [];

export const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);
