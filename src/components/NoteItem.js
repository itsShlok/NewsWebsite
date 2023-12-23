import React ,{useContext}from "react";
import noteContext from '../context/notes/NoteContext'

const NoteItem = (props) => {
  const { note,updateNote } = props;
  const context=useContext(noteContext)
  const {deletenote}=context
  
  return (
    <div className="col-md-4 my-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex aligh-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-solid fa-trash mx-3" onClick={()=>deletenote(note._id)}></i>
          <i className="fa-regular fa-pen-to-square" onClick={()=>updateNote(note)} ></i>
          </div>

          <p className="card-text">{note.description}</p>
          <p className="card-text">{note.Tag}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
