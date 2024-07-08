import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AuthLayout from './layouts/AuthLayout';
import HomeBase from './layouts/HomeBase';

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
            {/* DASHBOARD */}
            <Route path="/home-base" element={<HomeBase />}>
              {/* <Route path="/profile" element={<Profile />} /> */}
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
