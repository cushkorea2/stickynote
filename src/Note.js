import React from "react";

const Note = (props) => {
  // Write the function for the onChange method
  const updateTitle = (e) => {
    const updatedValue = e.target.value;
    const editMeId = props.note.id;
    props.onType(editMeId, "title", updatedValue);
  };
  const updateDescription = (e) => {
    const updatedValue = e.target.value;
    const editMeId = props.note.id;
    props.onType(editMeId, "description", updatedValue);
  };
  const clickDelete = () => {
    props.removeNote(props.note.id);
  };
  return (
    <li className="note">
      {/* Add Value attribute to output title and description in respective fields */}
      <input
        className="note__title"
        type="text"
        placeholder="Title"
        value={props.note.title}
        // Add the onChange for the onType method
        onChange={updateTitle}
      />
      <textarea
        className="note__description"
        placeholder="Description..."
        value={props.note.description}
        onChange={updateDescription}
      />
      <span className="note__delete" onClick={clickDelete}>
        X
      </span>
    </li>
  );
};

export default Note;