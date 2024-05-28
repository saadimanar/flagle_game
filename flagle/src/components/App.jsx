
import React, { useState, useEffect } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'
import Header from './Header'
//import flagImage from "../assets/SVG/AD.svg"
import countriesData from "../countries.json"






function App(){

  

  const [currentCountry, setCurrentCountry] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [flagCode, setFlagCode] = useState("");
  const [guess, setGuess] = useState('');  // State to store the current guess
  const [inputValue, setInputValue] = useState('');
  const [attempts, setAttempts] = useState(0);  // State to store the number of attempts
  const [message, setMessage] = useState('');  // State to store feedback messages

 

  useEffect(() => {
    console.log('render')
    displayRandomFlag();
  }, []);

  const displayRandomFlag = () => {
    const randomIndex = Math.floor(Math.random() * 250);
    setMessage(`The flag belongs to ${countriesData[randomIndex].name}`);
    setCurrentCountry(countriesData[randomIndex]);
    setCorrectAnswer(countriesData[randomIndex].name);
    setFlagCode(countriesData[randomIndex].code2l);
  };

  const handleInputChange = (event) => {
    setGuess(event.target.value);
    setInputValue(event.target.value);
  };

  const handleGuessSubmit = (e) => {
   if(e.key == "Enter"){
    const ans = (currentCountry.name.toLowerCase() === guess.toLowerCase());
    if (ans) {
      setMessage(`Correct! The flag belongs to ${currentCountry.name}`);
      setAttempts(0);
      setMessage("");
      displayRandomFlag();
      //setCurrentFlag(flag);
    } else {
      setAttempts(attempts + 1);
      setMessage('Incorrect, try again!');
      //setCurrentFlag(null);
    }
    setGuess('');
    setInputValue('');
  }
  };
  
 const flagPath = "/SVG" + "/" + flagCode + ".svg";
 //const suggestions = countriesData.map(country => country.name);
  return(
  <div>
    <Header/>
    {
      currentCountry && (
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


