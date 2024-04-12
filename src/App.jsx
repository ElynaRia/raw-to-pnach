import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Pcsx2_16 from './Pages/Pcsx2_16'
import Pcsx2_17 from './Pages/Pcsx2_17'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/pcsx2-stable" element={<Pcsx2_16 />} />
        <Route path="/pcsx2-nightly" element={<Pcsx2_17 />} />
      </Routes >
    </>
  )
}
