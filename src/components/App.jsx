import React, { useState, useEffect, useRef } from 'react'
import '../App.css'
import Header from './Header'
import Hints from './Hints'
import countriesData from "../countries.json"
import { getDistance } from 'geolib';
import Select from 'react-select';

const selectStyles = {
  control: (base, state) => ({
    ...base,
    borderRadius: '12px',
    borderColor: state.isFocused ? '#6366f1' : '#e2e8f0',
    boxShadow: state.isFocused ? '0 0 0 3px rgba(99, 102, 241, 0.2)' : 'none',
    minHeight: '50px',
    cursor: 'pointer',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    backgroundColor: '#ffffff',
    '&:hover': {
      borderColor: state.isFocused ? '#6366f1' : '#cbd5e1',
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 12px 40px rgba(15, 23, 42, 0.12)',
    border: '1px solid #e2e8f0',
  }),
  menuList: (base) => ({
    ...base,
    padding: '0.35rem',
  }),
  option: (base, state) => ({
    ...base,
    borderRadius: '8px',
    cursor: 'pointer',
    margin: '2px 0',
    backgroundColor: state.isSelected
      ? '#4f46e5'
      : state.isFocused
        ? '#eef2ff'
        : 'transparent',
    color: state.isSelected ? '#ffffff' : '#1e293b',
    transition: 'background-color 0.15s ease',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#94a3b8',
  }),
  singleValue: (base) => ({
    ...base,
    color: '#0f172a',
  }),
  input: (base) => ({
    ...base,
    color: '#0f172a',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: '#64748b',
    '&:hover': {
      color: '#4f46e5',
    },
  }),
};

function App(){
  const [currentCountry, setCurrentCountry] = useState(null);
  const [flagCode, setFlagCode] = useState("");
  const [attempts, setAttempts] = useState(0);  // State to store the number of attempts
  const [message, setMessage] = useState('');  // State to store feedback messages
  const [message1, setMessage1] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  // store lattitude and longitude of correct country
  const [lat1, setLat1] = useState('');
  const [lon1, setLon1] = useState('');

  //Hints table
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [guesses, setGuesses] = useState([]); // State to store the current guesses
  const [isSelectVisible, setIsSelectVisible] = useState(true);

  const [flagCardFeedback, setFlagCardFeedback] = useState('idle');
  const [guessFeedback, setGuessFeedback] = useState(null);
  const flagAnimTimersRef = useRef({});

  const clearFlagAnimTimers = () => {
    Object.values(flagAnimTimersRef.current).forEach((id) => {
      if (id) clearTimeout(id);
    });
    flagAnimTimersRef.current = {};
  };

  const countryOptions = countriesData.map(country => ({
    value: country.name,
    label: country.name,
  }));
  

  useEffect(() => {
    console.log('render')
    displayRandomFlag();
  }, []);

  useEffect(() => {
    const ref = flagAnimTimersRef;
    return () => {
      Object.values(ref.current).forEach((id) => {
        if (id) clearTimeout(id);
      });
    };
  }, []);
  

  const displayRandomFlag = () => {//Start of the game
    clearFlagAnimTimers();
    setGuessFeedback(null);
    const randomIndex = Math.floor(Math.random() * 250);
    //setMessage1(`The flag belongs to ${countriesData[randomIndex].name}`);
    setCurrentCountry(countriesData[randomIndex]);
    setLat1(countriesData[randomIndex].center.latitude);
    setLon1(countriesData[randomIndex].center.longitude);
    setFlagCode(countriesData[randomIndex].code2l); 
    setGuesses([]);
    setIsSelectVisible(true);
    setIsTableVisible(false);
    setAttempts(0);
    setMessage('');
    setMessage1('');
    setFlagCardFeedback('enter');
    flagAnimTimersRef.current.enter = setTimeout(() => {
      setFlagCardFeedback('idle');
    }, 520);
  };


  const handleSelect = (selectedOption) => {
    if (!selectedOption) return;
    const currentguess = selectedOption.value;
    const guessedCountry = countriesData.find(country => country.name === currentguess);

    // Check if the guess is already made
    if (guesses.some(g => g.guess.toLowerCase() === currentguess.toLowerCase())) {
      alert('You already guessed that country. Try a different one.');
      return;
    }

    // calculate distance
    const lat2 = guessedCountry.center.latitude;
    const lon2 = guessedCountry.center.longitude;
    const dist = getDistance(
      { latitude: parseFloat(lat1), longitude: parseFloat(lon1) },
      { latitude: parseFloat(lat2), longitude: parseFloat(lon2) }
     );
    const distance = dist / 1000; // Convert to kilometers
   
    //check if the guess is correct
    const ans = (currentCountry.name.toLowerCase() === currentguess.toLowerCase());
    if(ans){
      alert(`Correct! The flag belongs to ${currentCountry.name}. Well done!`);
      setMessage1(`Correct! The flag belongs to ${currentCountry.name}`);
      setMessage('');
      setIsSelectVisible(false);
      clearFlagAnimTimers();
      setFlagCardFeedback('correct');
      setGuessFeedback('correct');
      flagAnimTimersRef.current.correct = setTimeout(() => {
        setFlagCardFeedback('idle');
        setGuessFeedback(null);
      }, 780);
    }else{// wrong answer
      setAttempts(attempts + 1);
      if(attempts === 2){
        setMessage1(`GAME OVER!`);
        setMessage(`The correct answer is: ${currentCountry.name}`);
        setIsSelectVisible(false);
      }
      setGuesses([...guesses, { guess: currentguess, distance: distance + ' km' }]);
      setSelectedCountry(null);
      setIsTableVisible(true);
      clearFlagAnimTimers();
      setFlagCardFeedback('wrong');
      setGuessFeedback('wrong');
      flagAnimTimersRef.current.wrong = setTimeout(() => {
        setFlagCardFeedback('idle');
        setGuessFeedback(null);
      }, 660);
      //setMessage(`Incorrect! gussed country is ${gussedCountry.name} and the distance is ${distance.toFixed(2)}`);
    }
  };

  const flagPath = `${import.meta.env.VITE_FLAGS_BASE_URL }/SVG/${flagCode}.svg`;

  const flagCardClassName =
    flagCardFeedback === 'idle'
      ? 'flag-card'
      : `flag-card flag-card--${flagCardFeedback} flag-card--animating`;

  return(
  <div className="app">
    <Header/>
    {
    currentCountry &&(
      <div className="game-content">
         <div className={flagCardClassName}>
           <div className="flag-inner">
             <img src={flagPath} alt={currentCountry.name}/>
           </div>
         </div>
         <div className="guess-feedback-slot" aria-live="polite">
           {guessFeedback && (
             <p className={`guess-feedback guess-feedback--${guessFeedback}`}>
               {guessFeedback === 'correct' ? 'Correct!' : 'Wrong guess'}
             </p>
           )}
         </div>
         <div className="game-messages">
           <p className='bold-text'>{message1}</p>
           <p>{message}</p>
         </div>
         {
          isSelectVisible && (
            <div className="country-select-wrap">
              <Select
                value={selectedCountry}
                onChange={handleSelect}
                options={countryOptions}
                placeholder="Select a country"
                isClearable
                styles={selectStyles}
                classNamePrefix="country-select"
              />
            </div>
          )
         }
         <div
           className="attempts-indicator"
           role="status"
           aria-label={`Attempts: ${attempts} of 3`}
         >
           <span className="attempts-indicator__label">Attempts</span>
           <div className="attempts-dots" aria-hidden="true">
             {[0, 1, 2].map((i) => (
               <span
                 key={i}
                 className={`attempt-dot ${i < attempts ? 'attempt-dot--used' : ''}`}
               />
             ))}
           </div>
         </div>
        {
          isTableVisible && (<Hints guesses={guesses}/>)
        }
      </div>
    )
    }
    <button type="button" className="tryAgainButton" onClick={displayRandomFlag}>Try Another Flag</button>
  </div>
);
}

export default App;

