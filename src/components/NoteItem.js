import React,{useContext} from 'react'
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
    const { note,updateNote } = props
    const context = useContext(NoteContext)
    const {deleteNote}=context;
    return (
        <div className="notes col-md-3">
            <div className="notes card my-3">
                <div className="notes card-body">
                    <div className="notes d-flex align-items-center">
                        <h5 className="card-title mx-4 mt-2">{note.title}</h5>
                        <i className="fas fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                        <i className="fas fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <p className="notes card-text mx-4">{note.description}</p>
                    
                </div>
            </div>
        </div>
    )
}

export default NoteItem
