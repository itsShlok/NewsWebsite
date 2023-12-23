import React,{useContext, useEffect} from 'react'
import noteContext from '../context/notes/NoteContext'


const About=()=> {
    const a = useContext(noteContext)

  return (
    <div>
      About 
    </div>
  )
}

export default About
