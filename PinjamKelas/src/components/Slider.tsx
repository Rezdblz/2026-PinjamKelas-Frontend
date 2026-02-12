interface ViewToggleProps{
  activeView: 'table'|'form'
  onToggle:(view:'table'|'form')=>void;
}

function ViewToggle({activeView,onToggle}:ViewToggleProps){
  return(
    <div className="inline-flex items-center rounded-full bg-slate-100 p-1 shadow-sm border">
      <button 
        onClick={()=>onToggle('form')}
        className={`px-5 py-2 text-sm font-semibold rounded-full transition ${
          activeView === 'form'
            ? 'bg-blue-600 text-white shadow'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        Form
      </button>
      <button 
        onClick={()=>onToggle('table')}
        className={`px-5 py-2 text-sm font-semibold rounded-full transition ${
          activeView === 'table'
            ? 'bg-blue-600 text-white shadow'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        Table
      </button>
    </div>
  );
}
export default ViewToggle