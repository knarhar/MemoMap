import { useState } from 'react'
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import CardsPage from '@pages/cardsPage/CardsPage.jsx';
function App() {

  return (
    <div className='bg-gray-900'>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cards" element={<CardsPage />} />
        {/* <Route path="/card/:id" element={<SingleCardPage />} /> */}
        {/* <Route path="/about" element={<AboutPage />} /> */}
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
