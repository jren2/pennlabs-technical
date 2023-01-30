import courses from "../data/courses.json"
import { connect } from "react-redux"
import { useEffect, useState } from "react"
import DescriptionRating from "./DescriptionRating"

/**
 * Description contains the code for the description of a selected course.
 * This contains the œuality and difficulty of the course along with sections of the course.
 */
const Description = (props : any) => {
  // These props contain all the important attributes of a course
  const [courseQuality, setCourseQuality] = useState(0)
  const [difficulty, setDifficulty] = useState(0)
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")
  const [ngss, setNgss] = useState([])
  const [sections, setSections] = useState([])

  const {selectedCourse} = props
  const courseQualityPercentage = (courseQuality / 4) * 100
  const difficultyPercentage = (difficulty / 4) * 100

  // When the user switches selected course, we recalculate the attributes
  useEffect(() => {
    if (selectedCourse.length !== 0) {
      // Get the description and title from the courses json for quicker access
      const foundCourse = courses.filter(course => course.number === Number(selectedCourse.split('-')[1]))
      setDescription(foundCourse[0].description)
      setTitle(foundCourse[0].title)

      // fetch the course's attribute data (note this is from 2022A spring semester only)
      fetch(`/api/base/2022A/courses/${selectedCourse}/`).then((res: any) => {
        res.json().then((data: any) => {
          setCourseQuality(data.course_quality)
          setDifficulty(data.difficulty)
          setNgss(data.pre_ngss_requirements)
          setSections(data.sections)
        })
      })
    }
  }, [selectedCourse])

  // Given the avg attribute value, return the color
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
    <div>
      <div className="text-lg mt-2 mb-1 ml-1 font-semibold">Course Description</div>
      <div className="rounded-sm bg-white overflow-auto h-[85vh]">
        <div className="px-6 grid grid-cols-12 w-full h-full shadow-sm text-ellipses">
          <div className="col-span-12">
            {/* No course selected display */}
            {selectedCourse.length === 0 && (
              <div>
                <div className="text-center text-xl font-semibold tracking-wide h-full pt-[25vh]"> No course selected! </div>
                <div className="text-center mt-2"> Click on a searched course to see its description</div>
              </div>
            )}
            {/* Display selected course features */}
            {selectedCourse.length > 0 && (
              <>
                <div className="pt-4 pb-1 text-center text-3xl font-bold tracking-wider">{selectedCourse}</div>
                <div className="font-semibold my-2 pb-2">{title}</div>
                <div className="overflow-auto h-[56vh]">
                  <div id="course-description" className="overflow-auto pr-4 mb-4">{description}</div>
                  {/* Display the sections of the course */}
                  <div id="sections">
                    {
                      sections !== undefined && 
                      sections.map((elem : any) => {
                        // For each section, display both the section id and the instructors that teach it
                        return (
                          <>
                            <div className="border-t-2 py-2  grid grid-cols-2">
                              <div className=" pl-4 py-1 font-medium tracking-wide">{elem.id} <span className="font-light text-base">{elem.activity}</span></div>
                              <div className="font-light text-base">
                                {
                                  elem.instructors !== undefined && elem.instructors.length !== 0 ? 
                                    elem.instructors.map((instructor : any) => (
                                      <div className="py-1">{instructor.name}</div>
                                    ))
                                    :
                                    <div> N/A</div>
                                }
                              </div>
                            </div>
                          </>
                        )
                      })
                    }
                    {
                      (sections === undefined || sections.length === 0) && (
                        <div className="text-center mt-20 font-semibold">No section information available</div>
                      )
                    }
                  </div>
                </div>
                {/* Display course quality and difficulty */}
                <div className="grid grid-cols-12 gap-4 my-2 mb-4 ">
                  <DescriptionRating attribute = {courseQuality} color = {calculateColor(courseQuality)} percentage={courseQualityPercentage}></DescriptionRating>
                  <DescriptionRating attribute = {difficulty} color = {calculateColor(difficulty)} percentage={difficultyPercentage}></DescriptionRating>
                </div>
                {/* If the requirements exist, display them */}
                {ngss &&
                  ngss.map((requirement: any) => {
                    return (
                      <span key={`${selectedCourse}-${requirement.id}`} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {requirement.id}
                      </span>
                    )
                  })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: { selectedReducer: any }) => ({ selectedCourse: state.selectedReducer })

export default connect(mapStateToProps, null)(Description)
