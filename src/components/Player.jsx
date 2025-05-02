import { useState } from "react";


export default function Player({initialName,symbol,isActive,onChangeName}){
    
    const [isEditing,setIsEditing] = useState(false);
    const [playerName,setPlayerName] = useState(initialName);

    function handleEditClick(){
        setIsEditing((editing) => !editing);
        if(isEditing)
        onChangeName(symbol,playerName);
    }

    function handleChange(event){
        setPlayerName(event.target.value);
        console.log(playerName);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    // let btnCaption = 'Edit';

    if(isEditing)
    {
        editablePlayerName = <input type="text" value= {playerName} name="name" required onChange={handleChange} />
    }
    
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
            {editablePlayerName}
            <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing=== true ? 'Save' : 'Edit'}</button>
          </li>
    );
}