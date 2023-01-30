import Nav from "./Nav"
import Courses from "./Courses"
import Description from "./Description"
import Compare from "./Compare"

/**
 * Main consists of Courses, Description, Compare and the navbar.
 */
const Main = () => (
  <div className="max-h-screen h-screen">
    <div className="h-[7vh] mb-1">
      <Nav />
    </div>
    <div className="flex bg-[#f9fcff] w-full px-4 h-[92vh]">
      <div className="w-[31vw] max-h-[85vh]">
        <Courses />
      </div>
      <div className="w-[38vw] mx-4">
        <Description />
      </div>
      <div className="w-[31vw] max-h-[85vh]">
        <Compare />
      </div>
    </div>
  </div>
)

export default Main
