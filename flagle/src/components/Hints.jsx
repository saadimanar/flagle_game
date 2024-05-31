import React from 'react'

const Hints = ({ guesses }) => {
    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Guess</th>
              <th>Distance (km)</th>
            </tr>
          </thead>
          <tbody>
            {guesses.map((entry, index) => (
              <tr key={index}>
                <td>{entry.guess}</td>
                <td>{entry.distance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default Hints;