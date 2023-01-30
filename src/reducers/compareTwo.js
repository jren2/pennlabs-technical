const default_state = "CIS-120"
const SET_COMPARE_TWO = "SET_COMPARE_TWO"

// compareTwoReducer holds the state for the second compare course slot
const compareTwoReducer = (state = default_state, action) => {
  switch (action.type) {
    case SET_COMPARE_TWO:
      return action.course
    default:
      return state
  }
}

export default compareTwoReducer
