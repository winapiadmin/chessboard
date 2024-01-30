var sourceSquare;
function WhichButton(event) {
    var cell = undefined;
    if (event.target.localName == "img"){
        cell = event.target.parentNode;
    }
    if (event.target.localName == "td"){
        cell = event.target;
    }
    const activeCell = document.getElementById(cell.id);
    if (event.button == 2) {
        if (!activeCell.classList.contains("pointed")) {
            activeCell.classList.add("pointed");
        }
        else if (activeCell.classList.contains("pointed")) {
            activeCell.classList.remove("pointed");
        }
    }
    else if (event.button == 0) {
        const chess = new Chess();
            for (square in SQUARES) {
                document.getElementById(SQUARES[square]).classList.remove("pointed");
            }
            const moves = chess.moves();
            for (algmove in moves) {
                let move = chess.move(moves[algmove]);
                // Parse the algebraic move to get the coordinate notation
                let coordmove = move.from + move.to;
                chess.undo();
                if (coordmove.includes(activeCell.id)){
                   document.getElementById(coordmove.replace(activeCell.id, "")).classList.add("pointed");
                   sourceSquare = move.from;
		}
            }
        console.log(activeCell.id);
        console.log(sourceSquare);
        if (activeCell.classList.contains("pointed")) {
            chess.move(sourceSquare + activeCell.id);
            console.log(chess.board());
            try {
                document.getElementById(activeCell.id).childNodes[0].src = document.getElementById(sourceSquare).childNodes[0].src;
                activeCell.childNodes[0].src = "";
                for (square in SQUARES) {
                    document.getElementById(SQUARES[square]).classList.remove("pointed");
                }
            }
            catch(error){
                console.log(error);
            }
        }
    }
}