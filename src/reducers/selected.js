const default_state = ""
const SET_SELECTED = "SET_SELECTED"

// selectedReducer contains the state for the course you have selected for description
const selectedReducer = (state = default_state, action) => {
  switch (action.type) {
    case SET_SELECTED:
      return action.course
    default:
      return state
  }
}

export default selectedReducer
