import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { challenges } from './challenges/index';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const SET_CHALLENGE_IS_COMPLETE = 'SET_CHALLENGE_IS_COMPLETE';

export const setChallengeIsComplete = (isComplete, group, index) => ({
  type: SET_CHALLENGE_IS_COMPLETE,
  payload: {
    isComplete,
    group,
    index,
  },
});

const challengeReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CHALLENGE_IS_COMPLETE:
      let updatedGroup = [...state[action.payload.group]];
      updatedGroup[action.payload.index].isComplete = action.payload.isComplete;
      return {
        ...state,
        [action.payload.group]: updatedGroup,
      };
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
