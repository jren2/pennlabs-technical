import toast from "react-hot-toast"
import { SET_COURSES } from "../actions"

const default_state = []
const ADD_COURSE = "ADD_COURSE"
const REMOVE_COURSE = "REMOVE_COURSE"

/*
coursesReducer holds the state for the courses you have in your cart
We can either ADD_COURSE or REMOVE_COURSE
*/
const coursesReducer = (state = default_state, action) => {
  switch (action.type) {
    case ADD_COURSE:
      if (state.length < 7) {
        // If there are less than 7 courses then we can add another
        toast.success("Added " + String(action.course.id) + "!", {
          duration: 1500,
          position: "top-center",
        })
        return [...state, action.course]
      } else {
        // If there are 7 courses then we have reached the limit
        toast.error("Course Limit Reached", {
          duration: 1500,
          position: "top-center",
        })
        return state
      }
    case REMOVE_COURSE:
      // Remove a course by filtering out the id
      toast.success("Removed " + String(action.course) + "!", {
        duration: 1500,
        position: "top-center",
      })
      return state.filter((elem) => {
        return elem.id !== action.course
      })
    case SET_COURSES:
      return action.courses
    default:
      return state
  }
}

export default coursesReducer
