import { useState } from "react"
import { Reorder } from "framer-motion"
import { motion } from "framer-motion"
import { useLocation, Link } from 'react-router-dom'
import Sort from "../icons/Sort"
import Receipt from "./Receipt"

/**
 * Checkout contains the component for the checkout page
 * Note that instead of using URL query params, we use Link props for security and URL succinctness
 */
const Checkout = () => {
  const location = useLocation()
  const courses = location.state.courses
  const [courseArray, setCourseArray] = useState(courses)
  let i = 0

  const attributes = [
    {id: "difficulty", name: "Difficulty"},
    {id: "course_quality", name: "Course Quality"},
    {id: "instructor_quality", name: "Instructor Quality"},
    {id: "work_required", name: "Work Required"},
  ]

  // Sort Courses sorts courses based on their desirable attribute while accounting for undefined courses
  const sortCourses = (field : string) => {
    const sorted = [...courseArray]
    if (field === "difficulty") {
      sorted.sort((a, b) => (a.difficulty === undefined ? 1 : (b.difficulty === undefined ? -1 : (a.difficulty > b.difficulty) ? 1 : -1)))
    } else if (field === "instructor_quality") {
      sorted.sort((a, b) => (a.instructor_quality === undefined ? 1 : (b.instructor_quality === undefined ? -1 : (a.instructor_quality < b.instructor_quality) ? 1 : -1)))
    } else if (field === "course_quality") {
      sorted.sort((a, b) => (a.course_quality === undefined ? 1 : (b.course_quality === undefined ? -1 : (a.course_quality < b.course_quality) ? 1 : -1)))
    } else if (field === "work_required") {
      sorted.sort((a, b) => (a.work_required === undefined ? 1 : (b.work_required === undefined ? -1 : (a.work_required > b.work_required) ? 1 : -1)))
    }
    setCourseArray(sorted)
  }

  return (
    <div className="bg-[#f9fcff] max-h-screen h-screen">
      {courseArray.length === 0 ? (
        <div className="px-56">
          <div className=" py-8 w-full text-center text-3xl font-bold">Course cart empty! No courses were checked out</div>
          <a href="/">Return to homepage</a>
        </div>
      ) : (
        <div className="mx-40">
          <div className="pt-8 pb-4 w-full text-center text-3xl font-bold">Your Checked Out Cart: </div>
          <p className="text-center mb-8">Rank your courses by preferences by dragging and dropping or sorting by feature!</p>
          {/* Header for the attributes inside of the course cart */}
          <div className="relative">
            <div className="flex justify-evenly shadow-md py-4 px-0 bg-white rounded-sm w-[54vw] m-auto">
              <div className="ml-4 mr-10">
                Course #
              </div>
              {
                attributes.map((attribute) => (
                  <div className="mx-2 flex">
                    {attribute.name}
                    <div className="mx-2 mt-1 cursor-pointer" onClick={() => sortCourses(attribute.id)}>
                      <Sort></Sort>
                    </div>
                  </div>
                ))
              }
             </div>
          </div>
          {/* Ranking numbers and attributes */}
          <div className="relative overflow-x-auto">
            <div className="fixed rounded-sm shadow-md bg-white left-[16.5rem] mt-4">
              {
                courseArray.map(() => {
                  i++;
                  return (
                    <div className={`w-10 text-center h-8 my-4 ${i === courseArray.length ? "mb-1" : ""} ${i === 1 ? "mt-2" : ""}`}>
                      {i}.
                    </div>
                  )
                })
              }
            </div>
            {/* We use framer motion here for a reorder group */}
            <Reorder.Group  className="mb-10 mt-4" axis="y" values={courseArray} onReorder={setCourseArray}>
              {courseArray.map((course: any) => {
                return (
                    // Each item is a reorder with all four course attributes
                    <Reorder.Item key={course.id} value={course}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 1.02 }}
                        onHoverStart={e => {}}
                        onHoverEnd={e => {}}
                        >
                        <div className="flex shadow-md py-2 px-0 mb-2 bg-white rounded-sm w-[54vw] m-auto">
                          <div className="w-[8vw] ml-[2vw]">
                            {course.id}
                          </div>
                          {
                            attributes.map((attribute) => (
                              <div className={`w-[8vw] ${attribute.id === "instructor_quality" || attribute.id === "work_required" ? "ml-[4vw]" : "ml-[2vw]"}`}>
                                {Math.round(course[attribute.id] * 100) / 100}
                              </div>
                            ))
                          }
                        </div>
                      </motion.div>
                    </Reorder.Item>
                )
              })}
            </Reorder.Group>
          </div>
          {/* Return to homepage button - this maintains state due to react router dom */}
          <div className="flex w-full items-center">
              <Link
                to="/" 
                className="ml-auto mr-4 rounded-md bg-[#dc2625] px-4 duration-200 py-2 text-sm 
                  font-medium text-white hover:bg-opacity-80 focus:outline-none 
                  focus-visible:ring-2 focus-visible:ring-white"
              >
                Back
              </Link>
              <div className="mr-auto ml-4">
                <Receipt courses={courseArray}></Receipt>
              </div>
          </div>
        </div> 
      )}
    </div>
  )
}

export default Checkout
