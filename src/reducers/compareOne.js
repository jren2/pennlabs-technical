const default_state = "CIS-110"
const SET_COMPARE_ONE = "SET_COMPARE_ONE"

// compareOneReducer holds the state for the first compare course slot
const compareOneReducer = (state = default_state, action) => {
  switch (action.type) {
    case SET_COMPARE_ONE:
      return action.course
    default:
      return state
  }
}

export default compareOneReducer
