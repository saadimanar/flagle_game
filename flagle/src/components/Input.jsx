import React, { useState } from 'react';
import './Autocomplete.css';
import '../App.css';

const Autocomplete = ({ suggestions }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

  const handleChange = (e) => {
    const userInput = e.target.value;
    const filtered = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setInputValue(userInput);
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
    setActiveSuggestionIndex(0);
  };

  const handleClick = (e) => {
    setInputValue(e.target.innerText);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      setInputValue(filteredSuggestions[activeSuggestionIndex]);
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    } else if (e.keyCode === 38) {
      if (activeSuggestionIndex === 0) {
        return;
      }
      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    } else if (e.keyCode === 40) {
      if (activeSuggestionIndex === filteredSuggestions.length - 1) {
        return;
      }
      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    }
  };

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul className="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          if (index === activeSuggestionIndex) {
            className = "suggestion-active";
          }
          return (
            <li className={className} key={suggestion} onClick={handleClick}>
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : (
      <div className="no-suggestions">
        <em>No suggestions available.</em>
      </div>
    );
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={inputValue}
      />
      {showSuggestions && inputValue && <SuggestionsListComponent />}
    </div>
  );
};

export default Autocomplete;



/*

          <input
          className='input'
          type='text'
          placeholder='Guss the flag!'
          value={inputValue}
          onChange={handleInputChange} 
          onKeyDown={handleGuessSubmit}
          />

*/