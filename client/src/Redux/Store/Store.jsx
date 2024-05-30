import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import AuthReducer from '../Reducer';
import { AuthSocial } from '../Actions/Auth';
import { setSession } from '../Actions/Auth';

const rootReducer = combineReducers({
  AuthSocial: AuthSocial,
  Auth: AuthReducer,
  Session: setSession,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
