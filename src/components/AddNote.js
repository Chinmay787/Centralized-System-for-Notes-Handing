import React,{useContext,useState} from 'react'
import NoteContext from "../context/notes/NoteContext"

const AddNote = (props) => {
    const context = useContext(NoteContext)
    const {addNote}=context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})
    const handleClick= (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        setNote({title: "", description: "", tag: ""})
        props.showAlert("Added Successfully","success")
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div className="addnote">
            <div className="container mx-3 my-3">
                <h2>Add Notes Here</h2>
                <form className="my-3 mx-2" onLoad={props.DarkMode}>
                    <div className="mb-3">
                        <label htmlFor="title" className="h5 form-label fw-bold my-2">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange}  required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="h5 form-label fw-bold my-2">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="h5 form-label fw-bold my-2">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} required/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote;
