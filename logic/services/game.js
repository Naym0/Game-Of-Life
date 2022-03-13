function countNeighbours(grid, i, j) {
    const operations = [
        [0, 1], [0, -1], [1, -1], [-1, 1],
        [1, 1], [-1, -1], [1, 0], [-1, 0]
    ];
    let neighbors = 0;
    operations.forEach(([x, y]) => {
        const newI = i + x;
        const newJ = j + y;

        // NOTE: for wrap around to make grid infinite, uncomment next 2 lines, and comment 2 above.

        // const newI = (i + x + grid.length) % grid.length;
        // const newJ = (j + y + grid.length) % grid.length;

        if (newI >= 0 && newI < grid.length && newJ >= 0 && newJ < grid.length) {
            neighbors += grid[newI][newJ];
        }
    });
    return neighbors;
}

function getNextGeneration(grid) {
    let newGrid = JSON.parse(JSON.stringify(grid));
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            let neighbors = countNeighbours(grid, i, j);

            //implement transition rules
            if (grid[i][j] === 1 && neighbors < 2 || neighbors > 3) {
                newGrid[i][j] = 0;
            } else if (grid[i][j] === 0 && neighbors === 3) {
                newGrid[i][j] = 1;
            }
        }
    }
    return newGrid;
}

function repeatedPattern(array1, array2) {
    for (var i = 0; i < array1.length; i++) {
        for (let j = 0; j < array1.length; j++) {
            if (array1[i][j] !== array2[i][j]) {
                return false;
            }
        }
    }
    return true;
}

module.exports = {getNextGeneration, repeatedPattern}