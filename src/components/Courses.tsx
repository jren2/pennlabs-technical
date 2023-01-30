import courses from "../data/courses.json"
import CartAdd from "../icons/CartAdd"
import CartRemove from "../icons/CartRemove"
import { connect } from "react-redux"
import { addCourse, removeCourse, setSelected } from "../actions"
import { useState } from "react"

/**
 * Courses contains the component to display the search bar and filter courses.
 * This component also allows the user to add courses to their cart.
 */
const Courses = ({dispatchSetSelected, dispatchAddCourse, dispatchRemoveCourse, courseCart} : any) => {
  const [filter, setFilter] = useState("")

  // When adding to cart, we want to check fall then spring semesters
  const addToCart = (course: any) => {
    // Fetch for fall
    fetch(`/api/base/2022A/courses/${course.id}/`).then((res: any) => {
      res.json().then((data: any) => {
        // If the data didn't exist, fetch for fall
        if (data.detail || !data.title) {
          fetch(`/api/base/2021C/courses/${course.id}/`).then((resp: any) => {
            resp.json().then((dataC: any) => {
              if (data.detail || !data.title) {
                dispatchAddCourse(course)
              } else {
                dispatchAddCourse(data)
              }
            })
          })
        } else {
          dispatchAddCourse(data)
        }
      })
    })
  }

  const handleChange = (e: any) => {
    setFilter(e.target.value)
  }

  return (
    <>
      <div className="text-lg mt-2 mb-1 ml-1 font-semibold">Course Search</div>
      <div className="rounded-sm bg-white h-full">
        {/* Search Bar */}
        <div id = "course-search-bar" className="px-6 pt-4 pb-2">
          <div className="relative">
            {/* Input field */}
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            {/* onChange, we want to filter the courses */}
            <input
              onChange={(e) => handleChange(e)}
              className="block outline outline-1 outline-gray-50 focus:outline-gray-200 
                duration-150 p-4 pl-10 w-full text-sm text-gray-900 bg-[#f9fcff] rounded-sm focus:outline-1"
              placeholder="Filter courses by id, name or description"
              required
            />
          </div>
        </div>
        <div className="px-6 overflow-auto h-[74vh]">
          {/* Filter the courses based on either description, course id, or title */}
          {courses
            .filter(({ dept, number, title, description }) => {
              const course1 = `${dept}-${number}`
              const course2 = `${dept} ${number}`
              return (
                description.toLowerCase().includes(filter.toLowerCase()) ||
                course2.toLowerCase().includes(filter.toLowerCase()) ||
                course1.toLowerCase().includes(filter.toLowerCase()) ||
                title.toLowerCase().includes(filter.toLowerCase())
              )
            })
            .map(({ dept, number, title, description }) => {
              const course = `${dept}-${number}`
              return (
                <div 
                  key={course} 
                  onClick={() => dispatchSetSelected(course)} 
                  className="cursor-pointer hover:bg-[#f5f7fa] duration-300 pl-4 pr-2 grid grid-cols-12 
                    mt-2 w-full shadow-sm bg-[#f9fcff] rounded-sm  text-ellipses"
                >
                  <div className="col-span-11">
                    <div className="py-2">
                      <div className="font-medium tracking-wide text-lg">
                        {dept} {number}
                      </div>
                      <div className="truncate whitespace-nowrap text-gray-700 font-light text-base pr-4">{title}</div>
                    </div>
                  </div>
                  {/* If the course is not in the cart, display a + cart depending on the size of the cart */}
                  {!courseCart.some((e : any) => e.id === course) && (
                    <button
                      onClick={() => addToCart({ id: course, title })}
                      type="button"
                      className="col-span-1 text-black max-h-10 w-10 h-10 my-auto hover:text-gray-600 duration-150 
                        font-medium rounded-full text-sm text-center inline-flex items-center"
                    >
                      <CartAdd length={courseCart.length}></CartAdd>
                    </button>
                  )}
                  {/* Display an already added to cart display */}
                  {courseCart.some((e : any) => e.id === course) && (
                    <button
                      onClick={() => dispatchRemoveCourse(course)}
                      type="button"
                      className="col-span-1 text-green max-h-10 w-10 h-10 my-auto hover:text-gray-600 duration-150 
                      font-medium rounded-full text-sm text-center inline-flex items-center"
                    >
                      <CartRemove></CartRemove>
                    </button>
                  )}
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state: { coursesReducer: any }) => ({ courseCart: state.coursesReducer })

const mapDispatchToProps = (dispatch: (arg0: { type: String; course: any }) => any) => ({
  dispatchSetSelected: (course: any) => dispatch(setSelected(course)),
  dispatchAddCourse: (course: any) => dispatch(addCourse(course)),
  dispatchRemoveCourse: (course: any) => dispatch(removeCourse(course)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Courses)
