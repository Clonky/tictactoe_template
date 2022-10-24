const cellConstructor = (context, pos, field) => {
    const state = undefined;
    const getPos = () => pos;
    const createCell = () => {
        const cell = context.createElement("div");
        let id = `${pos}`;
        cell.setAttribute("id", id);
        cell.classList.add("cell");
        cell.addEventListener("click", function(e) {
            const currsymbol = context.gameState.getCurrentPlayer().symbol;
            e.target.innerHTML = currsymbol;
            state = currsymbol;
        })
        field.appendChild(cell);
    }
    const getState = () => state;
    return {getPos, createCell, getState};
}

const playingField = ((context) => {
    const setup = () => {
        const field = context.createElement("div");
        field.classList.add("field");
        for (i=1; i<=9; i++) {
            cellConstructor(context, i, field).createCell();
        }
        context.body.appendChild(field)
    }
    return {setup};
})(document);

playingField.setup()