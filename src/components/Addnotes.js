import React, { useState } from 'react'
import { useContext } from "react";
import noteContext from '../context/notes/NoteContext'

const Addnotes = () => {
    const context=useContext(noteContext)
    const {addnote}=context
    const [note,setNote]=useState({title:"",description:"",tag:""})

    const handleclick=(e)=>{
        e.preventDefault()
        addnote(note.title,note.description,note.tag)
    }
    const onChange=(e)=>{
        // e.preventDefault()
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div className='container'>
       <h1>Add Notes</h1>
      <form>
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            id="title" name='title'
            placeholder="Title"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description" name='description'
            rows="3"
            onChange={onChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Tag:</label>
          <input
            type="text"
            className="form-control"
            id="tag" name='tag'
            placeholder="Tag"
            onChange={onChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleclick}>Add Note</button>
      </form>
  
    </div>
  )
}

export default Addnotes
