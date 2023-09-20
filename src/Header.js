import React from "react";

const Header = (props) => {
  const callSearch = (e) => {
    props.onSearch(e.target.value);
  };

  return (
    <header>
      <h1 className="app-header__title">Super Sticky Notes</h1>
      <aside className="app-header__controls">
        {/* Receive the prop */}
        <button className="add-new" onClick={props.addNote}>
          + New Note
        </button>
        <input
          className="search"
          type="text"
          placeholder="Type here to search..."
          // Set the value attribute
          value={props.searchText} // Requires an onChange handler
          onChange={callSearch}
        />
      </aside>
    </header>
  );
};

export default Header;
