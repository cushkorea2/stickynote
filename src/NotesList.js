import React from "react";
import Note from "./Note.js";

// In the NotesList component, pass a note object in the notes array to each Note component by mapping over props.notes. As you map over this array, render a Note component for each object in the notes array that is passed to the NotesList component.

// 1. Need to pass that prop through to Note.js
// 2. To do that, map over the notes array
// 3. For each object in the array, we are going to return a Note component and we're going to pass to each Note component that particular object

const NotesList = (props) => {
  // Second -- set up the filter method
  // Use the .filter() method to remove any objects from the notes array that have a doesMatchSearch value of false.
  // 1. Write the callback function for the filter method
  const keepSearchMatches = (note) => note.doesMatchSearch === true;
  // 2. Write the filter method applying the callback function
  const searchMatches = props.notes.filter(keepSearchMatches);

  // First -- set up the map method
  // The callback function for the map method
  // This callback function renders the Note component
  // We pass it a Note prop which is equal to an entire note object/one element of the array
  // Because we're rendering a list, we need a key property and the key property is the outermost property
  const renderNote = (note) => (
    // Passing the onType method from App to NotesList to Note
    // Passing the removeNote method from App to NotesList to Note
    <Note
      removeNote={props.removeNote}
      onType={props.onType}
      note={note}
      key={note.id}
    />
  );
  // Map over the notes array in App.js
  // const noteElement = props.notes.map(renderNote);
  // Updated statement applying filter method wih the filtered array
  const noteElement = searchMatches.map(renderNote);
  // For as many objects as there are in that notes array, we want to generate a new Note component with that information passed along as a prop
  return <ul className="notes-list">{noteElement}</ul>;
};

export default NotesList;
