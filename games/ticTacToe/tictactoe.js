function TicTacToe() {
    var playerPositions = {"X":[],"O":[]};
    this.board = {};
    this.currentPlayer = "X";

    this.getPlayerPositions = function (symbol) {
        return playerPositions[symbol];
    }

    this.selectCell = function (cellId) {
        var cellDOM = this.board[cellId];
        cellDOM.innerHTML = this.currentPlayer;
        cellDOM.classList.add("taken");
        cellDOM.setAttribute('onclick', "null");
        playerPositions[this.currentPlayer].push(cellDOM);
    };

    this.checkForWin = checkForWin;
}

var ticTacToe = new TicTacToe();

var gameTable = document.getElementById('gameTable');

for(var i = 0;i < 3;i++) {
    var row = document.createElement("tr");

    for(var j=0;j < 3;j++) {
        var cell = document.createElement("td");
        cell.id = i + "-" + j;
        cell.setAttribute('onclick', "ticTacToe.selectCell(\"" + cell.id + "\")");
        row.append(cell);
        ticTacToe.board[cell.id] = cell;
    }

    gameTable.append(row);
}

var computerTimer = null;

function checkForWin(symbol) {
    var currentPlayerPositions = JSON.parse(JSON.stringify(this.playerPositions[symbol]));
    console.log(currentPlayerPositions);
    var symbolCount = 0;
    var colCount = 0;

    var pos = currentPlayerPositions.pop()

    while(pos) {
        var position = currentPlayerPositions[idx];
        if (position.r == cell.r) {
            rowCount++;
        }
        if (position.c == cell.c) {
            colCount++;
        }

        pos = humanPositions.pop();
    }

    if (rowCount == 3 || colCount == 3) {
        console.log("win!");
    }
}

var cellCount = 0;

function getSymbolCount(checkCellGroup,position,group,symbol) {
    var traverseGroup = (group == 'r') ? position.c : position.r;
    var symbolCount = 1;

    if (!checkCellGroup.includes(position[group])) {
        checkCellGroup.push(position[group]);
        // check row
        var cellGroupPos = traverseGroup - 1;
        var id = (group == 'r') ? position.r + '-' + cellGroupPos : cellGroupPos + '-' + position.c;
        var cellToCheck = document.getElementById(id);

        while (cellGroupPos > -1 && cellToCheck.innerHTML == "X") {
            symbolCount++;
            cellGroupPos--;
            id = (group == 'r') ? position.r + '-' + cellGroupPos : cellGroupPos + '-' + position.c;
            cellToCheck = document.getElementById(id);

            if (symbolCount > 1 && cellToCheck && cellToCheck.innerHTML == '') {
                return cellToCheck;
            }
        }

        return null;
    }
}

function checkHumanSelections() {
    var humanPositions = JSON.parse(JSON.stringify(gameBoard.getPlayerPositions('X')));
    var rowCount = 0;
    var colCount = 0;
    var checkedRows = [];
    var checkedCols = [];
    var pos = humanPositions.pop()

    while(pos) {
        var defenseCell = getSymbolCount(checkedRows,pos,"r","X");

        if (defenseCell) {
            return defenseCell;
        }
        else {
            pos = humanPositions.pop();
        }
    }

    return null;
}

function computerTurn() {
    var chosenCell = checkHumanSelections();
    if (!chosenCell) {
        clearInterval(computerTimer);
        var availableCells = getAvailableCells();
        if (availableCells.length) {
            var randomNumber = Math.floor(Math.random() * availableCells.length);
            chosenCell = availableCells[randomNumber];
        }
    }

    if (chosenCell)  {
        markCell(chosenCell, "O");
    }

    computerTimer = null;
}

function getAvailableCells() {
    var availableCells = playerPositions['X'].filter(function (v) {
        for(var idx in playerPositions['O']) {
            var computerPosition = playerPositions[idx];

            if (v.r != computerPosition.r && computerPosition.c != v.c) {
                return v;
            }
        }

    });

    return availableCells;
}
