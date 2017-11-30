var symbols = ['pear','orange','grapes'];
var playerMoney = 0;
var wager = 0;

var spinnerInterval = null;
var intervalAmt = 50;

function startGame() {
    clearError();
    var startAmtBox = document.getElementById('startingAmount');
    playerMoney = parseInt(startAmtBox.value);
    if (!isNaN(playerMoney) && playerMoney > 0) {
        startAmtBox.disabled = "disabled";

        var playerMoneyDiv = document.getElementById('playerMoneyDiv');
        var playerMoneySpan = document.getElementById('playerMoneySpan');
        playerMoneySpan.innerHTML = playerMoney;
        playerMoneyDiv.style.display = "block";
    }
    else {
        setError('Invalid starting amount');
    }
}

function clearError() {
    var errorDiv = document.getElementById('errorDiv');
    errorDiv.innerHTML = '';
    errorDiv.style.display = 'none';
}

function setError(errorText) {
    var errorDiv = document.getElementById('errorDiv');
    errorDiv.innerHTML = errorText;
    errorDiv.style.display = 'block';
}

function spin() {
    var wagerBox = document.getElementById('wager');
    wager = parseInt(wagerBox.value);

    if (!isNaN(wager) && wager <= playerMoney) {
        clearSlotBorders();
        playerMoney -= wager;
        var playerMoneySpan = document.getElementById('playerMoneySpan');
        playerMoneySpan.innerHTML = playerMoney;
        spinnerInterval = setInterval(changeImages,intervalAmt);
        var spinButton = document.getElementById('spinButton');
        spinButton.disabled = true;
    }
    else {
        setError('Invalid starting amount');
    }
}

function clearSlotBorders() {
    for (var i = 0; i < 3; i++) {
        var slot = document.getElementById('slot' + (i + 1));
        slot.style.border = 'none';
    }
}

function changeImages() {
    for (var i = 0; i < 3; i++) {
        var slot = document.getElementById('slot' + (i + 1));
        setRandomSymbol(slot);
    }

    if (intervalAmt > 1000) {
        clearInterval(spinnerInterval);
        intervalAmt = 50;
        var slotArr = [slot1,slot2,slot3]
        var winningAmount = calculateWinnings(slotArr);
        showWinnings(winningAmount);
        var spinButton = document.getElementById('spinButton');
        spinButton.disabled = false;
    }
    else {
        clearInterval(spinnerInterval);
        intervalAmt += 50;
        spinnerInterval = setInterval(changeImages,intervalAmt);
    }
}

function setRandomSymbol(slot) {
    var randNum = Math.floor(Math.random() * 3);
    randomSymbol = symbols[randNum];
    slot.src = "img/" + randomSymbol + ".png";
    slot.symbol = randomSymbol;
}

function calculateWinnings(slotArr) {
    var symbols = [];
    var maxSymbolCount = 0;

    for(var i =0; i < slotArr.length;i++) {
        var slot = slotArr[i];

        // if symbol exists add slot to symbol array
        if (symbols[slot.symbol]) {
            symbols[slot.symbol].push(slot);

            // if length of symbol array for current slot is more than 2, highlight slots
            if (symbols[slot.symbol].length > 1) {
                maxSymbolCount = Math.max(maxSymbolCount,symbols[slot.symbol].length);
                highlightMatchingSymbols(symbols[slot.symbol]);
            }
        }
        else {
            symbols[slot.symbol] = [];
            symbols[slot.symbol].push(slot);
        }
    }

    return maxSymbolCount * wager;
}

function highlightMatchingSymbols(symbolsMap) {
    for(var sym in symbolsMap) {
        var slot = symbolsMap[sym];
        slot.style.border = '2px solid red';
    }
}

function showWinnings(winningAmount) {
    var playerMoneySpan = document.getElementById('playerMoneySpan');
    playerMoney += winningAmount;
    playerMoneySpan.innerHTML = playerMoney;

    if (winningAmount > 0) {
        console.log('You won this much' + winningAmount);
    }
    else {
        console.log('Loser....');
    }
}
