import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./pages/home"
import About from "./pages/about"
import SignUp from "./pages/auth/signup"
import SignIn from "./pages/auth/signin"
import { QueryClientProvider } from "@tanstack/react-query"
import { QueryClient } from "@tanstack/react-query"
import { AuthProvider } from "./components/auth"
import { AppLayout } from "./components/layouts/app-layout"
import Dashboard from "./pages/app/dashboard"

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
