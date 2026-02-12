interface ViewToggleProps{
    activeView: 'table'|'form'
    onToggle:(view:'table'|'form')=>void;
}

function ViewToggle({activeView,onToggle}:ViewToggleProps){
    return(
        <div className="flex items-center gap-4">
            <button 
                onClick={()=>onToggle('form')}
            >
                Form   
            </button>
            <button onClick={()=>onToggle('table')}
            >
                Table
            </button>
        </div>

    );
}
export default ViewToggle