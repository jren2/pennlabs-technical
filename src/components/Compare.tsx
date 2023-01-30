import 'react-circular-progressbar/dist/styles.css';
import courses from '../data/courses.json'
import CompareSearch from "./CompareSearch"
import { connect } from "react-redux"
import { useState, useEffect } from "react"
import { setCompareOne, setCompareTwo } from "../actions"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const course =  {
  id: "",
  description: "",
  title: "",
  course_quality: 0,
  instructor_quality: 0,
  difficulty: 0,
  work_required: 0,

}

/**
 * Compare contains the logic for the course compare section.
 */
const Compare = ({compareOne, compareTwo, dispatchSetCompareOne, dispatchSetCompareTwo} : any) => {
  const [oneInfo, setOneInfo] = useState(course)
  const [twoInfo, setTwoInfo] = useState(course)
  const [oneTitle, setOneTitle] = useState("")
  const [twoTitle, setTwoTitle] = useState("")

  // every time one of the two courses change, recalculate course stats
  useEffect(() => {
    const oneCourse = courses.filter(course => course.number === Number(compareOne.split('-')[1]))
    const twoCourse = courses.filter(course => course.number === Number(compareTwo.split('-')[1]))
    setOneTitle(oneCourse[0].title)
    setTwoTitle(twoCourse[0].title)

    // Fetch the first course
    fetch(`/api/base/2022A/courses/${compareOne}/`).then((res: any) => {
      res.json().then((data: any) => {
        setOneInfo(data)
      })
    })

    // Fetch the second course
    fetch(`/api/base/2022A/courses/${compareTwo}/`).then((res: any) => {
      res.json().then((data: any) => {
        setTwoInfo(data)
      })
    })
  },[compareOne, compareTwo])

  return (
    <div className="h-full">
      <div className="text-lg mt-2 mb-1 ml-1 font-semibold">Course Compare</div>
      <div className="bg-white h-[85vh] pt-6 rounded-sm flex">
        <div className="w-1/2">
          {/* Compare for the first course */}
          <div className="px-4 text-3xl">
            <CompareSearch 
              selected = {compareOne} 
              setCompare = {dispatchSetCompareOne}
            />
          </div>
          {/* Display the title of the course (truncated at 3 lines) and the attributes */}
          <h1 className="text-center font-medium tracking-wide px-4 py-2 line-clamp-3 h-[10vh]">{oneTitle}</h1>
          {/* Course Quality */}
          <h1 className="text-center font-light text-base pt-3 pb-2">Course Quality</h1>
          <div className="w-[5vw] m-auto pb-2">
            <CircularProgressbar value={(oneInfo.course_quality / 4) * 100} text={`${oneInfo.course_quality === undefined ? 0 : oneInfo.course_quality.toFixed(2)}`} styles={buildStyles({
                textSize: '26px',
                textColor: `${oneInfo.course_quality >= twoInfo.course_quality || twoInfo.course_quality === undefined ? "#55c193" : "#dc2625"}`,
                pathColor: `${oneInfo.course_quality >= twoInfo.course_quality || twoInfo.course_quality === undefined ? "#55c193" : "#dc2625"}`,
              })}/>
          </div>
          {/* Instructor Quality */}
          <h1 className="text-center font-light text-base pt-3 pb-2">Instructor Quality</h1>
          <div className="w-[5vw] m-auto pb-2">
            <CircularProgressbar value={(oneInfo.instructor_quality / 4) * 100} text={`${oneInfo.instructor_quality === undefined ? 0 : oneInfo.instructor_quality.toFixed(2)}`} styles={buildStyles({
                textSize: '26px',
                textColor: `${oneInfo.instructor_quality >= twoInfo.instructor_quality || twoInfo.instructor_quality === undefined ? "#55c193" : "#dc2625"}`,
                pathColor: `${oneInfo.instructor_quality >= twoInfo.instructor_quality || twoInfo.instructor_quality === undefined ? "#55c193" : "#dc2625"}`,
              })}/>
          </div>
          {/* Difficulty */}
          <h1 className="text-center font-light text-base pt-3 pb-2">Difficulty</h1>
          <div className="w-[5vw] m-auto pb-2">
            <CircularProgressbar value={(oneInfo.difficulty / 4) * 100} text={`${oneInfo.difficulty === undefined ? 0 : oneInfo.difficulty.toFixed(2)}`} 
              styles={buildStyles({
                textSize: '26px',
                textColor: `${oneInfo.difficulty <= twoInfo.difficulty || twoInfo.difficulty === undefined ? "#55c193" : "#dc2625"}`,
                pathColor: `${oneInfo.difficulty <= twoInfo.difficulty || twoInfo.difficulty === undefined ? "#55c193" : "#dc2625"}`,
              })}
            />
          </div>
          {/* Work Required */}
          <h1 className="text-center font-light text-base pt-3 pb-2">Work Required</h1>
          <div className="w-[5vw] m-auto pb-2">
            <CircularProgressbar value={(oneInfo.work_required / 4) * 100} text={`${oneInfo.work_required === undefined ? 0 : oneInfo.work_required.toFixed(2)}`} 
              styles={buildStyles({
                textSize: '26px',
                textColor: `${oneInfo.work_required <= twoInfo.work_required || twoInfo.work_required === undefined ? "#55c193" : "#dc2625"}`,
                pathColor: `${oneInfo.work_required <= twoInfo.work_required || twoInfo.work_required === undefined ? "#55c193" : "#dc2625"}`,
              })}
            />
          </div>
        </div>
        <div className="border-gray border-[1px] h-5/6 opacity-50 my-auto"></div>
        {/* Compare for course two */}
        <div className="w-1/2">
          <div className="px-4">
           <CompareSearch selected = {compareTwo} setCompare = {dispatchSetCompareTwo}></CompareSearch>
          </div>
          <h1 className="text-center font-medium tracking-wide px-4 py-2 line-clamp-3 h-[10vh]">{twoTitle}</h1>
          {/* Course Quality */}
          <h1 className="text-center font-light text-base pt-3 pb-2">Course Quality</h1>
          <div className="w-[5vw] m-auto pb-2">
            <CircularProgressbar value={(twoInfo.course_quality / 4) * 100} text={`${twoInfo.course_quality === undefined ? 0 : twoInfo.course_quality.toFixed(2)}`} styles={buildStyles({
                textSize: '26px',
                textColor: `${oneInfo.course_quality <= twoInfo.course_quality || oneInfo.course_quality === undefined ? "#55c193" : "#dc2625"}`,
                pathColor: `${oneInfo.course_quality <= twoInfo.course_quality || oneInfo.course_quality === undefined ? "#55c193" : "#dc2625"}`,
              })} />
          </div>
          {/* Instructor Quality */}
          <h1 className="text-center font-light text-base pt-3 pb-2">Instructor Quality</h1>
          <div className="w-[5vw] m-auto pb-2">
            <CircularProgressbar value={(twoInfo.instructor_quality / 4) * 100} text={`${twoInfo.instructor_quality === undefined ? 0 : twoInfo.instructor_quality.toFixed(2)}`} 
              styles={buildStyles({
                textSize: '26px',
                textColor: `${oneInfo.instructor_quality <= twoInfo.instructor_quality || oneInfo.instructor_quality === undefined ? "#55c193" : "#dc2625"}`,
                pathColor: `${oneInfo.instructor_quality <= twoInfo.instructor_quality || oneInfo.instructor_quality === undefined ? "#55c193" : "#dc2625"}`,
              })}
            />
          </div>
          {/* Difficulty */}
          <h1 className="text-center font-light text-base pt-3 pb-2">Difficulty</h1>
          <div className="w-[5vw] m-auto pb-2">
            <CircularProgressbar value={(twoInfo.difficulty / 4) * 100} text={`${twoInfo.difficulty === undefined ? 0 : twoInfo.difficulty.toFixed(2)}`} 
              styles={buildStyles({
                textSize: '26px',
                textColor: `${oneInfo.difficulty >= twoInfo.difficulty || oneInfo.difficulty === undefined ? "#55c193" : "#dc2625"}`,
                pathColor: `${oneInfo.difficulty >= twoInfo.difficulty || oneInfo.difficulty === undefined ? "#55c193" : "#dc2625"}`,
              })}
            />
          </div>
          {/* Work Required */}
          <h1 className="text-center font-light text-base pt-3 pb-2">Work Required</h1>
          <div className="w-[5vw] m-auto pb-2">
            <CircularProgressbar value={(twoInfo.work_required / 4) * 100} text={`${twoInfo.work_required === undefined ? 0 : twoInfo.work_required.toFixed(2)}`} 
              styles={buildStyles({
                textSize: '26px',
                textColor: `${oneInfo.work_required >= twoInfo.work_required || oneInfo.work_required === undefined ? "#55c193" : "#dc2625"}`,
                pathColor: `${oneInfo.work_required >= twoInfo.work_required || oneInfo.work_required === undefined ? "#55c193" : "#dc2625"}`,
              })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: { coursesReducer: any, compareOneReducer: any, compareTwoReducer: any }) => ({ courses: state.coursesReducer, compareOne: state.compareOneReducer, compareTwo: state.compareTwoReducer })

const mapDispatchToProps = (dispatch: (arg0: { type: String; course: any }) => any) => ({
  dispatchSetCompareOne: (course: any) => dispatch(setCompareOne(course)),
  dispatchSetCompareTwo: (course: any) => dispatch(setCompareTwo(course)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Compare)
