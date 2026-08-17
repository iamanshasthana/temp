import { useState } from 'react'
import Home from './pages/Home'
import Gift from './pages/Gift'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div className="app-container">
      {currentPage === 'home' ? (
        <Home onOpenGift={() => setCurrentPage('gift')} />
      ) : (
        <Gift onBack={() => setCurrentPage('home')} />
      )}
    </div>
  )
}

export default App