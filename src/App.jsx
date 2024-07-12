import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AuthLayout from './layouts/AuthLayout';
import HomeBase from './layouts/HomeBase';
import Experience from './pages/Experience';
import HomePage from './pages/HomePage'

function App() {

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <main className="flex-1 overflow-y-auto">
          {/* AUTH */}
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
            {/* DASHBOARD  path="/home-base"*/}
            <Route element={<HomeBase />}>
              <Route path="/home" element={<HomePage/>} />
              <Route path="/experience" element={<Experience />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
