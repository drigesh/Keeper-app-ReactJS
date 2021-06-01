import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import _ from 'lodash';

function Custom(props) {
  const [notes, setNotes] = useState([]);
  // console.log("in custom");

  async function addNote(newNote) {
    // console.log(notes.length,"  ",newNote.title);
      setNotes(prevNotes => {
        return [...prevNotes, newNote];
      });
    fetch('/'+_.lowerCase(props.match.params.custom),{
      method: 'POST',
      headers: {'Content-Type':'application/json',
      'Accept': 'application/json'},
      body: JSON.stringify({
        title: newNote.title,
        content: newNote.content
      })
     })
     
  }

  async function deleteNote(id) {
    
    await fetch('/'+_.lowerCase(props.match.params.custom)+'/remove',{
      method: 'post',
      headers: {
        'Content-Type':'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
       title:notes[id].title,
       content:notes[id].content
      })
    });
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  const getDataconst = function getData(){

    // const temp = async ()=>{
      // await fetch("/");

      fetch('/custom/'+ _.lowerCase(props.match.params.custom))
        .then(response => response.json())
        .then(data => {
          data = data.items;

            var tempData =[];
            data.forEach((dataItem)=>{
              tempData.push(dataItem)
            })
            setNotes(tempData );
          
    });
  // }
      
  }
  
  return (
    
    <div>
      <Header name={_.upperFirst(_.lowerCase(props.match.params.custom))}/>
      <CreateArea onAdd={addNote} />
      <div style={{overflow: "hidden"}}>
        
        {notes.length===0?getDataconst():null}
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        })}
      </div>
      
      <Footer />
    </div>
  );
}

export default Custom;
