import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function Home() {
  const [notes, setNotes] = useState([]);
  // console.log("in home")

  async function addNote(newNote) {
    // console.log(notes.length,"  ",newNote.title);
      setNotes(prevNotes => {
        return [...prevNotes, newNote];
      });
    fetch('/',{
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
    
    await fetch('/remove',{
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
    
    fetch('/home/getData',{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
        .then(response => response.json())
        .then(data => {
          // console.log("im in getDataConst");
          if(data === null){
          }
          else{
            var tempData =[];
            // console.log("temp1",tempData);
            data.forEach((dataItem)=>{
              tempData.push(dataItem)
            })
            // console.log("temp2",tempData);
            setNotes(tempData );
            // console.log(data);
          }
          
        });
      
    // return null;
  }
  
  return (
    
    <div>
      <Header name="Welcome"/>
      <CreateArea onAdd={addNote} />
      <div style={{overflow: "hidden"}}>
        {notes.length === 0 ? getDataconst():null}
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

export default Home;
