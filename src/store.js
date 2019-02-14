import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { challenges } from './challenges';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const SET_CHALLENGE_IS_COMPLETE = 'SET_CHALLENGE_IS_COMPLETE';

export const setChallengeIsComplete = (isComplete, index) => ({
  type: SET_CHALLENGE_IS_COMPLETE,
  payload: {
    isComplete,
    index,
  },
});

const challengeReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CHALLENGE_IS_COMPLETE:
      let updatedState = [...state];
      updatedState[action.payload.index].isComplete = action.payload.isComplete;
      return updatedState;
    default:
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
  challenges,
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
