import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import VirtualTable from './components/VirtualizationTable.jsx'

function App() {
  return (
    <div className="App">
      <h1>Virtualized User Table</h1>
      <VirtualTable />
    </div>
  )
}

export default App
