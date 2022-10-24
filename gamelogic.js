const cellConstructor = (context, pos, field) => {
    let state = undefined;
    const getPos = () => pos;
    const getState = () => state;
    const setState = (symbol) => state = symbol;
    const cell = context.createElement("div");
    let id = `${pos}`;
    cell.setAttribute("id", id);
    cell.classList.add("cell");
    cell.addEventListener("click", function(e) {
        let currsymbol = gameState.getCurrentPlayer().getSymbol();
        e.target.innerHTML = currsymbol;
        state = currsymbol;
        gameState.turnCounter += 1;
    })
    field.appendChild(cell);
    return {getPos, getState, setState};
}

const playingField = ((context) => {
    const field = context.createElement("div");
    field.classList.add("field");
    const cells = [];
    for (i=1; i<=9; i++) {
        cells.push(cellConstructor(context, i, field));
    }
    context.body.appendChild(field)
    return {field, cells};
});

const playerConstructor = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    return {getName, getSymbol}
}

const gameState = ((context) => {
    let turnCounter = 0;
    const field = playingField(context);
    const players = [playerConstructor("Player 1", "X"), playerConstructor("Player 2", "O")]
    const getCurrentPlayer = (iturn) => players[iturn % 2];
    const startGameLoop = () => {
        let iturn = 0;
        while (iturn <= 9) {
            getCurrentPlayer(iturn)
        }
    }
    return {turnCounter, getCurrentPlayer, startGameLoop}
})(document)
gameState.startGameLoop();