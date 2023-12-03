import { combineReducers } from "redux";
/* Reducer */
import userReducer from "./userReducer";
import cinemaReducer from "./cinemaReducer";

const rootReducer = combineReducers({
  userReducer,
  cinemaReducer,
});

export default rootReducer;
