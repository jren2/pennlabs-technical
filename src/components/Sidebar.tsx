import { useState, useEffect } from "react";
import { connect} from "react-redux";
import { Link } from "react-router-dom"
import CartBar from "../icons/CartBar";
import EmptyCart from "../icons/EmptyCart";
import Rating from "./Rating";

/**
 * Sidebar contains both the navbar cart component and the sidebar containing the course cart.
 * From the sidebar, we also display the average attributes of the course cart and give the option to checkout.
 */
const Sidebar = (props : any) => {
  const [showSidebar, setShowSidebar] = useState(false);
  // These attributes will represent the cumulative attributes of the cart
  const [courseQuality, setCourseQuality] = useState(0)
  const [difficulty, setDifficulty] = useState(0)
  const [workRequired, setWorkRequired] = useState(0)
  const [instructorQuality, setInstructorQuality] = useState(0)
  // A contributing course is defined as a course that has fetchable attributes
  const [contributingCourses, setContributingCourses] = useState(0)
  const {courses} = props

  // Percentages for progress bars representing avg attribute divided by 4 and scaled
  const courseQualityPercentage = ((courseQuality / (courses.length - contributingCourses) / 4) * 100).toFixed(2)
  const difficultyPercentage = ((difficulty / (courses.length - contributingCourses) / 4) * 100).toFixed(2)
  const workRequiredPercentage = ((workRequired / (courses.length - contributingCourses) / 4) * 100).toFixed(2)
  const instructorQualityPercentage = ((instructorQuality / (courses.length - contributingCourses) / 4) * 100).toFixed(2)

  // This function calculates the avg attributes of the cart
  const calculateAvgAttribute = (value : number) : number => {
    return value / (courses.length - contributingCourses)
  }

  // When the course cart changes, recalculate attributes
  useEffect(() => {
    let course_quality = 0
    let avg_difficulty = 0
    let work_required = 0
    let instructor_quality = 0
    let contributing = 0

    courses.forEach((elem : any) => {
      if (elem.course_quality !== undefined) {
        course_quality += elem.course_quality
      } else {
        contributing += 1
      }
      if (elem.difficulty !== undefined) {
        avg_difficulty += elem.difficulty
      }
      if (elem.work_required !== undefined) {
        work_required += elem.work_required
      }
      if (elem.instructor_quality !== undefined) {
        instructor_quality += elem.instructor_quality
      }
    })

    // We define our props to be the cumulative attribute values
    setCourseQuality(course_quality)
    setDifficulty(avg_difficulty)
    setWorkRequired(work_required)
    setInstructorQuality(instructor_quality)
    setContributingCourses(contributing)
  }, [courses])

  // Based on attribute value, return the color of the progress bar
  const calculateColor = (value : number) : string => {
    if (value > 3.0) {
      return "#55c193"
    } else if (value > 2.0) {
      return "#4f46e5"
    } else if (value > 1.0) {
      return "#facc15"
    } else {
      return "#dc2626"
    }
  }
  
  return (
    <>
      {/* Sidebar open icon */}
      {showSidebar ? (
        <button
          className="flex text-4xl text-white items-center cursor-pointer fixed right-6 top-1 z-50"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          x
        </button>
      ) : (
        <div className="cursor-pointer" onClick={() => setShowSidebar(!showSidebar)}>
          <CartBar></CartBar>
          <div className="-mt-[2.6rem] ml-[0.75rem] text-lg font-semibold">{courses.length}</div>
        </div>
      )}

      {/* Sidebar cart */}
      <div
        className={`top-0 right-0 w-[25vw] bg-zinc-800 pt-10 px-4 text-white fixed h-full z-40 ease-in-out duration-300 ${
          showSidebar ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <div className="h-[85vh] rounded-sm">
          {courses.length === 0 ? (
            <div className="pt-[20vh]">
              <EmptyCart></EmptyCart>
              <p className="text-xl font-semibold text-center"> No courses in your cart!</p>
              <p className="text-base font-normal text-center"> Click on the + next to a course to add it to your cart.</p>
            </div>
          ) : (
            <>
              <h1 className="text-center text-2xl tracking-wide font-semibold mb-4">Your Cart ({courses.length})</h1>
              <div id="items" className="justify-center text-white flex flex-wrap">
                {courses.map((course : any) => {
                  return (
                      <div
                        key={`${course.id} ${course.title}`}
                        className="w-full px-2 overflow-hidden my-1 rounded-sm"
                      >
                        <div className="text-lg font-medium tracking-wide">{course.id}</div>
                        <div className="font-light text-base truncate">{course.title}</div>
                      </div>
                  )}
                )}
              </div>
              {/* Change progress bar color based on quality */}
              <div className="grid grid-cols-2 py-4">
                <Rating 
                  widthPercentage = {courseQualityPercentage} 
                  cartPercentage = {calculateAvgAttribute(courseQuality)} 
                  backgroundColor = {calculateColor(calculateAvgAttribute(courseQuality))} 
                  attribute = {"Course Quality"} 
                />
                <Rating 
                  widthPercentage = {difficultyPercentage} 
                  cartPercentage = {calculateAvgAttribute(difficulty)} 
                  backgroundColor = {calculateColor(calculateAvgAttribute(difficulty))} 
                  attribute = {"Difficulty"} 
                />
                <Rating 
                  widthPercentage = {workRequiredPercentage} 
                  cartPercentage = {calculateAvgAttribute(workRequired)} 
                  backgroundColor = {calculateColor(calculateAvgAttribute(workRequired))} 
                  attribute = {"Work Required"} 
                />
                <Rating 
                  widthPercentage = {instructorQualityPercentage} 
                  cartPercentage = {calculateAvgAttribute(instructorQuality)} 
                  backgroundColor = {calculateColor(calculateAvgAttribute(instructorQuality))} 
                  attribute = {"Instructor"} 
                />
              </div>
              <div className="mx-auto w-full text-center">
                <Link 
                  to="/checkout" 
                  state={{ courses }} 
                  className="bg-transparent w-1/2  duration-300 hover:bg-[#f1efe6] hover:text-black text-[#f1efe6] 
                    font-semibold py-2 px-4 border border-[#f1efe6] hover:border-transparent rounded"
                >
                  Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: { coursesReducer: any }) => ({ courses: state.coursesReducer })

export default connect(mapStateToProps, null)(Sidebar)