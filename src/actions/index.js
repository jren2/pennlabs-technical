export const ADD_COURSE = "ADD_COURSE"
export const REMOVE_COURSE = "REMOVE_COURSE"
export const SET_SELECTED = "SET_SELECTED"
export const SET_COURSES = "SET_COURSES"
export const SET_COMPARE_ONE = "SET_COMPARE_ONE"
export const SET_COMPARE_TWO = "SET_COMPARE_TWO"

// Add course to cart
export const addCourse = (course) => ({
  type: ADD_COURSE,
  course,
})

// Remove course to cart
export const removeCourse = (course) => ({
  type: REMOVE_COURSE,
  course,
})

// Set entire course cart
export const setCourses = (coursesSet) => ({
  type: SET_COURSES,
  coursesSet,
})

// Set your selected course for description
export const setSelected = (course) => ({
  type: SET_SELECTED,
  course,
})

// Set course one for comparison
export const setCompareOne = (course) => ({
  type: SET_COMPARE_ONE,
  course,
})

// Set course two for comparison
export const setCompareTwo = (course) => ({
  type: SET_COMPARE_TWO,
  course,
})
