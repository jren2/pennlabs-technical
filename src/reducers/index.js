import coursesReducer from "./courses"
import { combineReducers } from "redux"
import selectedReducer from "./selected"
import compareOneReducer from "./compareOne"
import compareTwoReducer from "./compareTwo"

const rootReducer = combineReducers({
  coursesReducer,
  selectedReducer,
  compareOneReducer,
  compareTwoReducer
})

export default rootReducer
