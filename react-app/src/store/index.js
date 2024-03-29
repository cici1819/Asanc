import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import projectReducer from './projectReducer';
import sectionReducer from './sectionReducer';
import taskReducer from './taskReducer';
import sideBarReducer from './sideBarProjectReducer';
import commentReducer from './commentReducer';
import attachmentReducer from './attachmentReducer';

const rootReducer = combineReducers({
  session,
  projects: projectReducer,
  section: sectionReducer,
  tasks: taskReducer,
  sideBar: sideBarReducer,
  comments: commentReducer,
  attachments:attachmentReducer

});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
