import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import noteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import Addnotes from "./Addnotes";
import {useNavigate} from "react-router-dom"

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getnotes, editnote } = context;
  let navigate=useNavigate()
  useEffect(() => {
    if(localStorage.getItem('token')){
      getnotes();
    }else{
      navigate("/login")
    }
    
    // eslint-disable-next-line
  }, []);


  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", eTag: "" })


  const ref = useRef(null);
  const refClose = useRef(null)

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, eTag: currentNote.Tag })
  };
  const handleclick = (e) => {
    e.preventDefault()
    refClose.current.click();
    setNote(prevNote => ({ ...prevNote }));
    editnote(note.id, note.etitle, note.edescription, note.eTag)

  }


  const onChange = (e) => {
    // e.preventDefault()
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Addnotes />
      {/* <!-- Button trigger modal --> */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title" name='etitle'
                    value={note.etitle}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description" name='edescription'
                    rows="3" value={note.edescription}
                    onChange={onChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Tag:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Tag" name='eTag'
                    value={note.eTag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleclick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your notes</h2>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
