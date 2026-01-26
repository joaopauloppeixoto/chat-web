import './App.css'

import { Link, Route, Routes } from 'react-router-dom'
import { About, Home } from './pages'

function App() {

  return (
    <>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App
