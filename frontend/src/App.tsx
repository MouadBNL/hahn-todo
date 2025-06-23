import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./pages/home"
import About from "./pages/about"
import SignUp from "./pages/auth/signup"
import SignIn from "./pages/auth/signin"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
