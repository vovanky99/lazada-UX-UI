import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import AuthReducer from '../Reducer';
import { Login, SignUp, AuthSocial } from '../Actions/Auth';

const rootReducer = combineReducers({
  Login: Login,
  AuthSocial: AuthSocial,
  SignUp: SignUp,
  Auth: AuthReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
