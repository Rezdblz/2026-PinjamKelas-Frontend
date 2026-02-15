import { useState } from 'react';
import './App.css';
import ViewToggle from './components/Navbar';
import FormView from './components/FormView';
import TableView from './components/TableView';
import Login from './components/login';
import { useAuth } from './hooks/useAuth';

function App() {
  const [activeView, setActiveView] = useState<'table' | 'form'>('form');
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen w-screen bg-white">
      <ViewToggle activeView={activeView} onToggle={setActiveView} />
      {activeView === 'form' && <FormView />}
      {activeView === 'table' && <TableView />}
    </div>
  );
}

export default App;
