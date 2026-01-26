import { Link, Route, Routes } from 'react-router-dom'
import { About, Home } from './pages'
import { Button } from './components/ui/button'
import { Separator } from './components/ui/separator'

function App() {
  return (
    <>
      <nav className='flex flex-row gap-2'>
        <Link to="/">
          <Button className='cursor-pointer'>Home</Button>
        </Link>
        <Separator orientation='vertical' />
        <Link to="/about">
          <Button className='cursor-pointer'>About</Button>
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App
