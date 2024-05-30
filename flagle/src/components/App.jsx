import React, { useState, useEffect } from 'react'
import '../App.css'
import Header from './Header'
import Hints from './Hints'
import countriesData from "../countries.json"
import { getDistance } from 'geolib';
import Select from 'react-select';


function App(){
  const [currentCountry, setCurrentCountry] = useState(null);
  const [flagCode, setFlagCode] = useState("");
  const [attempts, setAttempts] = useState(0);  // State to store the number of attempts
  const [message, setMessage] = useState('');  // State to store feedback messages
  const [message1, setMessage1] = useState('');

  // store lattitude and longitude of correct country
  const [lat1, setLat1] = useState('');
  const [lon1, setLon1] = useState('');

  //Hints table
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [guesses, setGuesses] = useState([]); // State to store the current guesses
  const [isSelectVisible, setIsSelectVisible] = useState(true);

  const countryOptions = countriesData.map(country => ({
    value: country.name,
    label: country.name,
  }));
  

  useEffect(() => {
    console.log('render')
    displayRandomFlag();
  }, []);
  

  const displayRandomFlag = () => {//begin of the game
    const randomIndex = Math.floor(Math.random() * 250);
    setMessage1(`The flag belongs to ${countriesData[randomIndex].name}`);
    setCurrentCountry(countriesData[randomIndex]);
    setLat1(countriesData[randomIndex].center.latitude);
    setLon1(countriesData[randomIndex].center.longitude);
    setFlagCode(countriesData[randomIndex].code2l); 
    setGuesses([]);
    setIsSelectVisible(true);
    setIsTableVisible(false);
    setAttempts(0);
    setMessage('');
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
      alert(`Correct! The flag belongs to ${currentCountry.name} WELL DONE!`);
      setMessage1(`Correct! The flag belongs to ${currentCountry.name}`);
      setMessage('');
      setIsSelectVisible(false);
    }else{// wrong answer
      setAttempts(attempts + 1);
      if(attempts === 2){
        setMessage1(`GAME IS OVER!`);
        setMessage(`The correct answer is: ${currentCountry.name}`);
        setIsSelectVisible(false);
      }
      setGuesses([...guesses, { guess: currentguess, distance: distance + ' km' }]);
      setIsTableVisible(true);
      //setMessage(`Incorrect! gussed country is ${gussedCountry.name} and the distance is ${distance.toFixed(2)}`);
    }
  };

 const flagPath = "/SVG" + "/" + flagCode + ".svg";

  return(
  <div>
    <Header/>
    {
    currentCountry &&(
      <div>
         <div className="flag">
         <img src={flagPath} alt={currentCountry.name}/>
         </div>
         <p>{message1}</p>
         <p>{message}</p>
         {
          isSelectVisible && (
            <Select
            onChange={handleSelect}
            options={countryOptions}
            placeholder="Select a country"
            isClearable
           />
          )
         }
         <p>Attempts: {attempts}/3</p>
        {
          isTableVisible && (<Hints guesses={guesses}/>)
        }
      </div>
    )
    }
    <button className="tryAgainButton" onClick={displayRandomFlag}>Try Another Flag</button>
  </div>
);
}

export default App;




/* <button onClick={handleGuessSubmit}>Submit</button>


/*
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <Header></Header>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
*/


