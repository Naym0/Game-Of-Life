var express = require('express');
var gameLogic = require('../services/game')
var router = express.Router();

router.post('/', function (req, res) {
  let answerGrid = [];
  let grid = req.body.grid;
  let iterations = req.body.generations;
  let lastChange = 0;

  while (iterations > 0) {
    let nextGeneration = gameLogic.getNextGeneration(grid);

    //check if pattern is repeated to stop iterations
    if(gameLogic.repeatedPattern(grid, nextGeneration)){
      lastChange = req.body.generations-iterations;
      break;
    }

    answerGrid.push(nextGeneration);
    grid = JSON.parse(JSON.stringify(nextGeneration));    // deep copy
    iterations--;
  }

  let response = {
    answerGrid: answerGrid,
    lastChange: lastChange,
  }
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(response));
});

module.exports = router;