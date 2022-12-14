const P1SYMBOL = "<span class='material-symbols-outlined'>close</span>";
const P2SYMBOL = "<span class='material-symbols-outlined'>circle</span>";


const cellConstructor = (context, pos, field) => {
    const getPos = () => pos;
    const cell = context.createElement("div");
    const getState = () => cell.innerHTML;
    const setCell = (e) => {
        e.target.innerHTML = gameState.getCurrentPlayer(gameState.turnCounter).getSymbol();
        gameState.turnCounter += 1;
        gameState.score(gameState.turnCounter);
    }
    cell.addEventListener("click", setCell, {once: true});
    const disable = () => {
        cell.removeEventListener("click", setCell);
    }
    let id = `${pos}`;
    cell.setAttribute("id", id);
    cell.classList.add("cell");
    field.appendChild(cell);
    return {getPos, getState, disable};
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

    const disable = () => {
        cells.forEach((icell) => icell.disable());
    }

    const reset = () => {
        field.remove();
    }
    return {field, cells, score, reset, disable};
});

const playerConstructor = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    return {getName, getSymbol}
}

let gameState = ((context) => {
    let turnCounter = 0;
    let field = playingField(context);
    const players = [playerConstructor("Player 1", P1SYMBOL), playerConstructor("Player 2", P2SYMBOL)];
    const getCurrentPlayer = (turnCounter) => players[turnCounter % 2];
    const startGameLoop = () => {}
    const announceVictor = (turnCounter) => {
        const victoryContent = context.querySelector(".right");
        const victoryContentText = context.createElement("div");
        victoryContentText.innerHTML = `${players[(turnCounter - 1) % 2].getName()} has won this Game.<br>Click Reset to play again.<br> Thanks for playing!`;
        victoryContent.appendChild(victoryContentText);
    }
    const score = (turnCounter) => {
        if (field.score()) {
            field.disable();
            announceVictor(turnCounter);
        }
    }
    const reset = (turnCounter) => {
        field.field.remove();
        field = playingField(context);
        let victoryArea = context.querySelector(".right");
        victoryArea.removeChild(victoryArea.lastChild);
        turnCounter = 0;
    }
    return {turnCounter, getCurrentPlayer, startGameLoop, score, reset}
})(document);

const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", function(e)  {
    gameState.reset(gameState.turnCounter);
});

const printInstructions = (() => {
    const instructionPane = document.querySelector(".instructions");
    const playerSymbols = document.createElement("li");
    playerSymbols.classList.add("player-legend")
    playerSymbols.innerHTML = `Player 1: ${P1SYMBOL}; Player 2: ${P2SYMBOL}`;
    instructionPane.appendChild(playerSymbols);
})()
