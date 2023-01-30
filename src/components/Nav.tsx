import { connect } from "react-redux"
import Sidebar from "./Sidebar"
import Logo from '../icons/Logo'

/**
 * Nav contains the logo and other navbar components.
 */
const Nav = () => (
  <div className="h-full bg-white pt-2 shadow-md py-auto align-middle flex flex-row">
    <div className="ml-4 text-3xl flex w-full font-medium tracking-wide">
      <Logo></Logo>
      Penn Course Cart
    </div>
    <div className="mr-5 mt-1">
      <Sidebar></Sidebar>
    </div>
  </div>
)

const mapStateToProps = (state: { coursesReducer: any }) => ({ courses: state.coursesReducer })

export default connect(mapStateToProps, null)(Nav)
