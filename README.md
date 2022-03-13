
# Game of Life

A web application implementation of [The Game of Life](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiByuSci8P2AhWmRfEDHW-8AN4QmhN6BAghEAI&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FConway%2527s_Game_of_Life&usg=AOvVaw3Ren4zMW9qfyNBCmJvYMlL), introduced by a British mathematician John Horton Conway in 1970.
A game where you define an unpredictable cell automaton, which is a grid of cells, where each has a finite number of states such as on or off. It consists of an infinite, two-dimensional orthogonal grid of square cells and revolves around a set of rules which will recursively interact with the current state of the grid. 

## Run Locally

Clone the project

```bash
  git clone https://github.com/Naym0/Game-Of-Life.git
```

Go to the project directory

```bash
  cd Game-of-Life
```

Install backend(logic) dependencies and start server

```bash
  cd logic && npm install
  npm run start
```

Install client dependencies and start server

```bash
  cd client && npm install
  npm run start
```

## Implementation Note

> The default _count neighbours_ algorithm does not consider the grid as infinite in both directions.
The wrap-around implementation is commented out in the logic. To enable the wrap-around logic, simply uncomment that section. <br><br>
_See logic/game.js countNeighbours() method_

## Tech Stack

**Client:** React, React-Bootstrap

**Server:** Node, Express

