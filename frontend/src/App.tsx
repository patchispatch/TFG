import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import {ObjectiveService} from './services/objective-service';
import {Objective} from './models/objective';
import {useState, useEffect} from 'react';

function App() {
  let objectiveService = new ObjectiveService();

  // State
  let [obj, setObj] = useState<Objective>();

  useEffect(() => {
    objectiveService.get(17).subscribe(result => {
      setObj(result);
    });
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => console.log(obj)}>Obj</button>
      </header>
    </div>
  );
}

export default App;
