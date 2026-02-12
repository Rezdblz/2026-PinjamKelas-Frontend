import { useState } from 'react'
import './App.css'
import ViewToggle from './components/slider'
import FormView from './components/FormView'

function App() {
  const [activeView, setActiveView] = useState<'table'|'form'>('form')

  return (
    <div className="min-h-screen bg-amber-600">
      <ViewToggle activeView={activeView} onToggle={setActiveView} />
      {activeView === 'form' && <FormView />}
    </div>
  )
}

export default App
