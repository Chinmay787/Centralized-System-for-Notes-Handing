import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from "../context/notes/NoteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { Button, Modal,Form } from 'react-bootstrap';
import {useNavigate } from 'react-router-dom';

const Notes = (props) => {
    let navigate=useNavigate();
    const context = useContext(NoteContext)
    const { notes, getNotes,editNote } = context;
    useEffect(() => {
        if (localStorage.getItem("token")) {
          getNotes();
        } else {
            navigate("/login")
        }
        // eslint-disable-next-line
      }, []);
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({id:" ",etitle: "", edescription: "", etag: ""})
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
        
    }
    const handleClick=(e)=>{
        console.log("Updating The existing note",note);
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click();
        e.preventDefault();
        props.showAlert("Notes Updated Successfully","success");
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <>
        <div className="notes">
            <AddNote showAlert={props.showAlert}/>
            <Button variant="primary" className="notes d-none" ref={ref} onClick={handleShow}>
                Launch demo modal
            </Button>
            <Modal  show={show} onHide={handleClose}>
                <Modal.Header className="notes"
                     closeButton>
                    <Modal.Title>UPDATE NOTE HERE</Modal.Title>
                </Modal.Header>
                <Modal.Body className="notes">
                <Form>
                    <Form.Group className="mb-3" controlId="etitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Update Title" id="etitle" name="etitle" value={note.etitle}onChange={onChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="edescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Update Description" id="edescription" name="edescription" value={note.edescription} onChange={onChange} required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="etag">
                        <Form.Label>Tag</Form.Label>
                        <Form.Control type="text" placeholder="Update Tag" id="etag" name="etag" value={note.etag} onChange={onChange} required />
                    </Form.Group>    
                    <Modal.Footer>

                    <Button ref={refClose}variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button  disabled={note.etitle.length<2 ||note.edescription.length<5 || note.etag.description<2 }variant="primary" onClick={handleClick}>
                        Update Note
                    </Button>
                    </Modal.Footer>
                    </Form>
                </Modal.Body>    
            </Modal>
            </div>
            <div className="notes row my-3 mx-3">
                <h2>Your Notes Are</h2>
                <div className="container mx-2"> 
                {notes.length===0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} handleShow={handleShow} note={note} />
                })}
            </div>
        
        </>
    )
}
export default Notes;
