import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Gift from './pages/Gift'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gift" element={<Gift />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
