import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => setData(data.message))
      .catch(err => console.error("Error fetching data: ", err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Math Game</h1>
        <p>{data ? data : "Loading..."}</p>
      </header>
    </div>
  );
}

export default App;