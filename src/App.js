import React, { Component } from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";

class App extends Component {
  state = {
    notes: [
      { id: Date.now(), title: "", description: "", doesMatchSearch: true }
    ],
    searchText: ""
  };

  addNote = () => {
    // Create a new note
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    // Add the new note to the existing notes array in State
    // Change the notes array in state and mapping to it this new note
    const newNotes = [newNote, ...this.state.notes];
    this.setState({ notes: newNotes });
  };

  // Update state: which note changed? Title change? Description change?
  // Pass this method to Note.js (bc Note.js will call this method) by first passing it to NotesList which is connected to App.js
  onType = (editMeId, updatedKey, updatedValue) => {
    // editMeId == id of the note that is edited
    // updateKey == title or description field
    // updateValue == value of title or description

    // Map & test
    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== editMeId) {
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });
    this.setState({ notes: updatedNotes });
  };

  onSearch = (text) => {
    const newSearchText = text.toLowerCase();
    const updatedNotes = this.state.notes.map((note) => {
      if (!newSearchText) {
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const titleMatch = title.includes(newSearchText); // evaluates to true
        const descriptionMatch = description.includes(newSearchText); // evaluates to true
        const hasMatch = titleMatch || descriptionMatch;
        note.doesMatchSearch = hasMatch;
        // if (titleMatch) {
        //   note.doesMatchSearch = true;
        // } else if (descriptionMatch) {
        //   note.doesMatchSearch = true;
        // } else {
        //   note.doesMatchSearch = false;
        // }
        return note;
      }
    });
    this.setState({ note: updatedNotes, searchText: newSearchText });
  };

  removeNote = (noteId) => {
    const updatedNotes = this.state.notes.filter((note) => note.id !== noteId);
    this.setState({ notes: updatedNotes });
  };
  componentDidUpdate() {
    const stringifiedNotes = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", stringifiedNotes);
  }
  componentDidMount() {
    const stringifiedNotes = localStorage.getItem("savedNotes");
    if (stringifiedNotes) {
      const savedNotes = JSON.parse(stringifiedNotes);
      this.setState({ notes: savedNotes });
    }
  }
  render() {
    return (
      <div>
        {/* pass the state's props to the specific component that handles that part of the UI */}
        <Header
          onSearch={this.onSearch} // pass to Header
          addNote={this.addNote} // pass the addNote prop to the component with the button
          searchText={this.state.searchText}
        />
        {/* Passing the onType method to NotesList to pass it on to Note */}
        <NotesList
          removeNote={this.removeNote}
          onType={this.onType}
          notes={this.state.notes}
        />
      </div>
    );
  }
}

export default App;
