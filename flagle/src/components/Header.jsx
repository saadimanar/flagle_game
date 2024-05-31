import React from "react";
import QuestionIcon from './QuestionIcon';

function Header() {
  return (
    <div className="container">
    <header className="App-header">
      <QuestionIcon />
      <h1>Flag<span style={{ color: 'blue'}}>le</span></h1>
    </header>
    </div>
  );
}

export default Header;