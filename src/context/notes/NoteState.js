import React from "react";
import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInit = [];
  const [notes, setNotes] = useState(notesInit);

// Get notes from database***************************************
  const getnotes = async () => {
    const url = `${host}/api/notes/fetchallnotes`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
           localStorage.getItem('token'),
        },
      });
      if (!response.ok) {
        // Handle error, for example:
        console.error(`Failed to fetch notes. Status: ${response.status}`);
        return;
      }
      const json1 = await response.json();
      // console.log(json1);
      setNotes(json1);
    } catch (error) {
      console.error("Error during fetch:", error.message);
    }
  };

  //****************************Add note******************************
  const addnote = async (title, description, tag) => {
    // Add note THRUOGH API
    const url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
      
    });
    const json=await response.json() ;
    console.log(json)
    console.log("NOte added");
    const note = {
      // _id: "8657ca8c9d2531aa0ba22df42b",
      // user: "657c4f56df93c78e47519375",
      title: title,
      description: description,
      Tag: tag,
      // date: "2023-12-15T19:28:09.872Z",
      // __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //******************Edit Note***********************************
  const editnote = async (id, title, description, tag) => {
    //---------------------------// API call
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },
      
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    
    });
    const json=await response.json() ;
    console.log(json)

    // Logic to edit
    let newNotes =JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].Tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  };
  //***********************Delete Note***********************
  const deletenote = async(id) => {
    // Api CALL
    const url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },
    });
    const json = response.json();
    console.log(json)

    console.log("Deleting note" + id);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };
// ****************************************************************
  return (
    <NoteContext.Provider
      value={{ notes, addnote, deletenote, editnote, getnotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
