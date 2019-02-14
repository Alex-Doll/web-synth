import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      console.log(`No action found for ${action.type}`);
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
    {
      pathName: 'challenge1',
      title: 'Challenge 1',
      isComplete: false,
    },
    {
      pathName: 'challenge2',
      title: 'Second Challenge',
      isComplete: false,
    },
    {
      pathName: 'challenge3',
      title: 'Challenge The Third',
      isComplete: false,
    },
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
