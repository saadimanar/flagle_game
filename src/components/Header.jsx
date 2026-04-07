import React from "react";
import QuestionIcon from './QuestionIcon';

function Header() {
  return (
    <div className="container">
      <header className="App-header">
        <div className="header-title-row">
          <h1 className="flagle-title">
            Flag<span className="flagle-title-accent">le</span>
          </h1>
          <QuestionIcon />
        </div>
        <p className="flagle-subtitle">Guess the country from the flag</p>
      </header>
    </div>
  );
}

export default Header;