import {
  optionReducer,
  sidebar,
  resetReducer
} from "./option";
import { authStateReducer, tokenReducer, idSet, DataUser,caseId } from "./data";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  option: optionReducer,
  sidebar: sidebar,
  authState: authStateReducer,
  token: tokenReducer,
  reset: resetReducer,
  idSet:idSet,
  dataUser: DataUser,
  caseId: caseId,

});

export default allReducers;
