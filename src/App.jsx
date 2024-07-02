import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AuthLayout from './layouts/AuthLayout';

function App() {

  return (
    <Router>
      <div className="flex flex-col h-screen">
        {/* <header>
          <Navbar />
        </header> */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>
            </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
