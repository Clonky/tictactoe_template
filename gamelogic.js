const cellConstructor = (context, pos, field) => {
    let state = undefined;
    const getPos = () => pos;
    const cell = context.createElement("div");
    const getState = () => cell.innerHTML;
    let id = `${pos}`;
    cell.setAttribute("id", id);
    cell.classList.add("cell");
    cell.addEventListener("click", function(e) {
        e.target.innerHTML = gameState.getCurrentPlayer(gameState.turnCounter).getSymbol();
        gameState.turnCounter += 1;
        e.target.removeEventListener(e.type, arguments.callee)
    })
    field.appendChild(cell);
    return {getPos, getState};
}

const playingField = ((context) => {
    const playingArea = context.querySelector(".playing-area");
    const field = context.createElement("div");
    field.classList.add("field");
    const cells = [];
    for (i=1; i<=9; i++) {
        cells.push(cellConstructor(context, i, field));
    }
    playingArea.appendChild(field)
    const idToXY = (id) => {
        let X = Math.floor(id / 3);
        let Y = id % 3;
        return {X, Y};
    }
    const XYtoID = function(X,Y)  {
        id = X * 3 + Y;
        return id;
    }

    const checkRow = (idx) => {
        let row = [];
        for (i=0; i<=2; i++) {
            row.push(cells[XYtoID(idx, i)].getState());
        }
        isWinner = row.every(val => val === row[0] && val !== '');
        return isWinner;
    }

    const checkCol = (idx) => {
        let col = [];
        for (i=0; i<=2; i++) {
            col.push(cells[XYtoID(i, idx)].getState());
        }
        isWinner = col.every(val => val === col[0] && val !== '');
        return isWinner;
    }

    const score = () => {
        let results = [];
        for (j=0; j<3; j++) {
            results.push(checkCol(j));
            results.push(checkRow(j));
        }
        return results.some(item => item);
    }

    const reset = () => {
        
    }
    return {field, cells, score};
});

const playerConstructor = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    return {getName, getSymbol}
}

const gameState = ((context) => {
    let turnCounter = 0;
    let field = playingField(context);
    const players = [playerConstructor("Player 1", "<span class='material-symbols-outlined'>close</span>"), playerConstructor("Player 2", "<span class='material-symbols-outlined'>circle</span>")]
    const getCurrentPlayer = (turnCounter) => players[turnCounter % 2];
    const startGameLoop = () => {}
    const score = () => field.score()
    const reset = () => {
        delete field;
        field = playingField(context);
    }
    return {turnCounter, getCurrentPlayer, startGameLoop, score, reset}
})(document)

const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", gameState.reset);