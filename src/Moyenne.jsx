import { useState, useEffect } from "react";
import './Moyenne.css';

//localstorage utilisation
function getLocalStrorage(key){
    try{
        const data = localStorage.getItem(key);
        const getValue = data.split(',');
        return getValue;
    }catch(err){
        return null;
    }   
}
function setLocalStrorage(key,notes){
    const store = notes.join(',');
    localStorage.setItem(key,store);
}


function Moyenne(){
    const localStorageKey = 'notes-gestions';
    const matieres = ["Architecture Client Serveur" ,"Administration des systemes d'exploitation" ,"Statistique inferentielle" ,"Securité informatique" ,"Base de donnée" ,"Architecture et technologies reseaux" ,"Modele osi/tcp ip" ,"Routage ip" ,"Analyse numerique Pratique" ,"Connaissance d'entreprise" ,"Communication en entreprise" ,"Analyse financiere" ,"Projet tutoré"];
    const coefficients = [2,2,2,3,4,3,3,1,3,2,2,2,1];
    const [notes,setNotes] = useState(
        getLocalStrorage(localStorageKey) || Array(matieres.length).fill('')
    );
    const [moyenne,setMoyenne] = useState(0);

    function calculerMoyenne(){
        const notePonderes = notes.map((note,index)=>note*coefficients[index]);
        const somme = notePonderes.reduce((acc,val)=>acc += val , 0);
        const totalCoefficient = coefficients.reduce((acc,val) => acc += val, 0);
        return somme/totalCoefficient;
    }

    function handleNoteChange(event,index){
        const listeModifie = [...notes];
        listeModifie[index] = event.target.value;
        setNotes(listeModifie);
        setLocalStrorage(localStorageKey,listeModifie);
        
        setMoyenne(calculerMoyenne());
    }

    useEffect(()=>{
        setMoyenne(calculerMoyenne());
    },[]);

    return( 
    <div id="notes-container">
        <h3 id="notes-header">Calcul Moyenne S4</h3>
        <form>
            {matieres.map((matiere,index) =>{
                return (
                <div key={`key-${index}`} className="notes-section">
                    <label htmlFor={`matiere-${index}`}>{matiere}</label>
                    <input
                        type="number" 
                        max={20} step="any"
                        id={`matiere-${index}`}
                        value={notes[index]}
                        onChange={(e)=>handleNoteChange(e,index)} 
                    />
                </div>);
            })}
            <span id="moyenne">Moyenne: {moyenne.toFixed(3)}</span>
        </form>
    </div>
    );
}
export default Moyenne