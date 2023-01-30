import "./App.css"
import { Routes, Route } from "react-router-dom"
import Main from "./components/Main"
import Checkout from "./components/Checkout"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main></Main>}></Route>
      <Route path="/checkout" element={<Checkout></Checkout>}></Route>
      <Route path="*" element={<div>hello3</div>}></Route>
    </Routes>
  )
}

export default App
