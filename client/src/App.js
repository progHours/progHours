import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import { ToastContainer } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"
import "./styles/App.css"

// Import auth pages
import Login from "pages/auth/Login"
import Register from "pages/auth/Register"

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </HelmetProvider>
  )
}

export default App
