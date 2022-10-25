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
        e.target.innerHTML = gameState.getCurrentPlayer(gameState.turnCounter).getSymbol();
        gameState.turnCounter += 1;
        e.target.removeEventListener(e.type, arguments.callee)
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
    const players = [playerConstructor("Player 1", "<span class='material-symbols-outlined'>close</span>"), playerConstructor("Player 2", "<span class='material-symbols-outlined'>circle</span>")]
    const getCurrentPlayer = (turnCounter) => players[turnCounter % 2];
    const startGameLoop = () => {}
    return {turnCounter, getCurrentPlayer, startGameLoop}
})(document)
gameState.startGameLoop();