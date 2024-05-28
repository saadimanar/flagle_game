import React, { useState, useEffect } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'
import Header from './Header'
import Hints from './Hints'
import countriesData from "../countries.json"
import { getDistance } from 'geolib';


function App(){
  const [currentCountry, setCurrentCountry] = useState(null);
  const [flagCode, setFlagCode] = useState("");
  const [guess, setGuess] = useState('');  // State to store the current guess
  const [gussedCountry, setGussedCountry] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [attempts, setAttempts] = useState(0);  // State to store the number of attempts
  const [message, setMessage] = useState('');  // State to store feedback messages

  // calculate distance
  const [lat1, setLat1] = useState('');
  const [lon1, setLon1] = useState('');
  const [distance, setDistance] = useState(null);
 
 
  useEffect(() => {
    console.log('render')
    displayRandomFlag();
  }, []);
  

  const displayRandomFlag = () => {
    const randomIndex = Math.floor(Math.random() * 250);
    setMessage(`The flag belongs to ${countriesData[randomIndex].name}`);
    setCurrentCountry(countriesData[randomIndex]);
    setLat1(countriesData[randomIndex].center.latitude);
    setLon1(countriesData[randomIndex].center.longitude);
    setFlagCode(countriesData[randomIndex].code2l); 
  };

  const handleInputChange = (event) => {
    setGuess(event.target.value);
    setInputValue(event.target.value);
    const foundCountry = countriesData.find(c => c.name.toLocaleLowerCase() === event.target.value.toLocaleLowerCase());
    if(foundCountry){ // calculate distance
      setGussedCountry(foundCountry);
      const lat2 = foundCountry.center.latitude;
      const lon2 = foundCountry.center.longitude
      const dist = getDistance(
        { latitude: parseFloat(lat1), longitude: parseFloat(lon1) },
        { latitude: parseFloat(lat2), longitude: parseFloat(lon2) }
       );
       setDistance(dist / 1000); // Convert to kilometers
    }
  };


  const handleGuessSubmit = (e) => {
   if(e.key == "Enter"){
    const ans = (currentCountry.name.toLowerCase() === guess.toLowerCase());
    if (ans) {
      setMessage(`Correct! The flag belongs to ${currentCountry.name}`);
      setAttempts(0);
      setMessage("");
      displayRandomFlag();
    } else {
      setAttempts(attempts + 1);
      updateTable(gussedCountry.name, distance);
     // setMessage(`Incorrect! gussed country is ${gussedCountry.name} and the distance is ${distance.toFixed(2)}`);
    }
    setGuess('');
    setInputValue('');
  }
  };


  function updateTable(guess, distance) {
    const tableBody = document.getElementById('guessesTable').getElementsByTagName('tbody')[0];
    const newRow = tableBody.insertRow();
    const guessCell = newRow.insertCell(0);
    const distanceCell = newRow.insertCell(1);
    guessCell.innerHTML = guess;
    distanceCell.innerHTML = distance.toFixed(2) + ' km';
} 
  
 const flagPath = "/SVG" + "/" + flagCode + ".svg";
 //const suggestions = countriesData.map(country => country.name);
  return(
  <div>
    <Header/>
    {
      currentCountry &&(
        <div className="flag">
          <img src={flagPath} />
          <input
          className='input'
          type='text'
          placeholder='Guss the flag!'
          value={inputValue}
          onChange={handleInputChange} 
          onKeyDown={handleGuessSubmit}
          />
         <p>Attempts: {attempts}</p>
         <Hints/>
         <p>{message}</p>
       </div>
      )
    }
   
    <button onClick={displayRandomFlag}>Show Another Flag</button>
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


