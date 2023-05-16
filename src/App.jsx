import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Callback from "./pages/Callback"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/callback"
        code="/callback?code=:code"
        element={<Callback />}
      />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}

export default App
