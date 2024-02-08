var sourceSquare = "";
var chess;
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
        if (sourceSquare=="") {
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
                   sourceSquare = activeCell.id;
		}
            }
	    return;
	}
    if (activeCell.classList.contains("pointed")) {
		try {
			try{
				if (chess.is_castle_kingside({from: sourceSquare, 
									  to: activeCell.id.toString(), 
										  promotion: 'q'})){
					document.getElementById("f1").childNodes[0].src = document.getElementById("h1").childNodes[0].src;
							document.getElementById("h1").childNodes[0].src = "./EmptySquare.gif";
				}
				if (chess.is_castle_kingside({from: sourceSquare, 
									  to: activeCell.id.toString(), 
										  promotion: 'q'})){
					document.getElementById("d1").childNodes[0].src = document.getElementById("a1").childNodes[0].src;
							document.getElementById("h1").childNodes[0].src = "./EmptySquare.gif";
				}
			}
			catch(err){}
			activeCell.childNodes[0].src = document.getElementById(sourceSquare).childNodes[0].src;
			document.getElementById(sourceSquare).childNodes[0].src = "./EmptySquare.gif";
			for (square in SQUARES) {
				document.getElementById(SQUARES[square]).classList.remove("pointed");
			}
			chess.move({from: sourceSquare, 
			to: activeCell.id.toString(), 
			promotion: 'q'});
		}
		catch(error){
			console.log(error);
		}
		console.log(chess.ascii());
		sourceSquare="";
	}
	else {
		for (square in SQUARES) {
			document.getElementById(SQUARES[square]).classList.remove("pointed");
		}
		sourceSquare = "";
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
			   sourceSquare = activeCell.id;
			}
		}
	}
}}