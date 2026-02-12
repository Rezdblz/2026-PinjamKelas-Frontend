import { useState } from 'react'
import './App.css'
import ViewToggle from'./components/slider'
function App() {
  const [activeView,setActiveView] = useState<'table'|'form'>('form')

  return (
    <>
      <div className='min-h-screen'>
        <div className='bg-blue-950'>
          <ViewToggle activeView ={activeView} onToggle={setActiveView}/>
        </div>
        <div></div>
      </div>
    </>
  )
}

export default App
