import React, { useState } from "react";
import produce from "immer";
import './App.css';
import { Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [trajectory, setTrajectory] = useState("");
  const [generations, setGenerations] = useState("");
  const [grid, setGrid] = useState([]);
  const [generationGrids, setGenerationGrids] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [lastChange, setLastChange] = useState('');

  function renderGenerations(generationGrids){
    if(generationGrids.length < 30){                        // if generations are less than 30, display all
      return drawGenerations(generationGrids)
    }
    else{
      var first15Array = generationGrids.slice(0,15);       // get first 15 elements of array
      var last15Array = generationGrids.slice(-15);         // get last 15 elements of array
      generationGrids = first15Array.concat(last15Array);   // concatenate then for rendering
      return drawGenerations(generationGrids)
    }
  }

  function onTextChange(text) {
    const id = text.target.id;
    const value = text.target.value;
    if (id === "trajectoryInput") {
      setGrid([]);
      setTrajectory(value);
      setGenerationGrids([]);
    }
    if (id === "generationInput") {
      setGenerations(value);
    }
  }

  function createGrid() {
    if (trajectory === "" || trajectory <= 0) {
      setErrorMessage("Please input a trajectory above 0");
      return false;
    }
    setGrid(new Array((parseInt(trajectory)))               // generate grid and fill all cells with 0
      .fill(new Array((parseInt(trajectory))).fill(0))
    );
  }

  function drawGenerations(generationGrids) {
    return (
      generationGrids.map(function (generationArray) {
        return (
          <div
            style={{
              display: "grid",
              margin: '10px',
              gridTemplateColumns: `repeat(${trajectory}, 20px)`
            }}
          >
  
            {generationArray.map((rows, i) =>
              rows.map((col, j) => (
                <div
                  key={`${i}-${j}`}
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: generationArray[i][j] ? "rgb(142, 210, 255)" : undefined,
                    border: "solid 1px black"
                  }}
                />
              ))
            )}
  
          </div>)
      }, this)
    )
  }

  function runGame() {
    if (generations === "" || generations <= 0) {
      setErrorMessage("Please set generations above 0");
      return false;
    }

    let body = {
      trajectory: trajectory,
      generations: generations,
      grid: grid,
    }

    fetch('http://localhost:9000/logic', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(response => 
        { setGenerationGrids(response.answerGrid);
          setLastChange(response.lastChange);
        });
  }

  function clear() {
    setTrajectory('');
    setGenerations('');
    setGrid([]);
    setGenerationGrids([]);
  }

  return (
    <div className="mainContainer">
      <div className="headerContainer">
        <h1>GAME OF LIFE</h1>

        <Alert variant="info">
          {/* <Alert.Heading>Welcome to the game of Life</Alert.Heading> */}
          <p>
            Input a desired trajectory number and the number of generations then click <b>Create grid.</b> <br />
            Thereafter, select your desired live cells and <b>Run</b> it to get the results. <br />
            Clear will reset all inputs and results
          </p>
        </Alert>

        {errorMessage && (
          <Alert variant="warning" onClose={() => setErrorMessage(null)} dismissible>
            <Alert.Heading>Warning</Alert.Heading>
            <p>
              {errorMessage}
            </p>
          </Alert>
        )}

        <div className="innerContainer">
          <Form.Label className="label">Trajectory:</Form.Label>
          <Form.Control className="input" id="trajectoryInput" type="text" value={trajectory} onChange={(text) => onTextChange(text)} />

          <Form.Label className="label">Generations:</Form.Label>
          <Form.Control className="input" id="generationInput" type="text" value={generations} onChange={(text) => onTextChange(text)} />
        </div>

        <div className="headerButtons">
          <Button variant="primary" className="submit" onClick={() => createGrid()}>
            CREATE GRID
          </Button><br />
          {grid.length > 0 &&
            <Button variant="primary" className="submit" onClick={() => runGame()}>
              RUN
            </Button>
          }
          <Button variant="primary" className="submit" onClick={() => clear()}>
            CLEAR
          </Button>
        </div>
      </div>

      <div className="gridContainer">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${trajectory}, 20px)`
          }}
        >
          {grid.map((rows, i) =>
            rows.map((col, k) => (
              <div
                key={`${i}-${k}`}
                onClick={() => {
                  const newGrid = produce(grid, gridCopy => {
                    gridCopy[i][k] = grid[i][k] ? 0 : 1;
                  });
                  setGrid(newGrid);
                }}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: grid[i][k] ? "rgb(142, 210, 255)" : undefined,
                  border: "solid 1px black"
                }}
              />
            ))
          )}
        </div>
      </div><br />

      <div className="gridContainer">
        {generationGrids && generationGrids.length > 0 &&
          <div>
            <h3>Generation Answers</h3>
            {lastChange > 0 &&
              <p>The pattern stopped changing at generation {lastChange}</p>
            }
          </div>
        }
      </div><br />

      <div className="generationContainer">
        {generationGrids.length > 0 &&          
          renderGenerations(generationGrids)
        }
      </div>
    </div>
  );
};