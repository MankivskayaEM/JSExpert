/*var btn = document.getElementById("play");
var player1 = document.getElementById("player1");
var player2 = document.getElementById("player2");
var result = document.getElementById("result");
var playerResult1,
	playerResult2,
	winner;

function getPlayerResult() {
    return Math.floor((Math.random() * 3) + 1);
}


function runGame() {
    playerResult1 = getPlayerResult();
    playerResult2 = getPlayerResult();
	player1.innerHTML = getNameById(playerResult1);
    player2.innerHTML = getNameById(playerResult2);
    winner = determineWinner(playerResult1, playerResult2);
    printResult(winner);
}

function getNameById(num) {
	return (num == 1) ? num = 'камень' :
		(num == 2) ? num = 'ножницы' :
		num = 'бумага';
}

function determineWinner(num1, num2) {
	if (num1 == num2) {
		return 0;
	} else if (((num1 == 1) && (num2 == 2)) || ((num1 == 2) && (num2 == 3)) || ((num1 == 3) && (num2 == 1))) {
		return 1;
	} else {
		return 2;
	}
}

function printResult(playerNum) {
	if (playerNum == 1) {
		playerNum = 'первый';
	} else if (playerNum == 2) {
		playerNum = 'второй';
	}
	result.innerHTML = (playerNum == 0) ? 'Ничья' : `выиграл ${playerNum} игрок`;
}

btn.addEventListener("click", runGame);*/



/*fixed variant*/
var btn = document.getElementById("play");
var player1 = document.getElementById("player1");
var player2 = document.getElementById("player2");
var result = document.getElementById("result");
var playerResult1,
	playerResult2,
	winner;

function runGame() {
    playerResult1 = getPlayerResult();
    playerResult2 = getPlayerResult();
	player1.innerHTML = getNameById(playerResult1);
    player2.innerHTML = getNameById(playerResult2);
    printResult(determineWinner(playerResult1, playerResult2));
}

function getPlayerResult() {
    return Math.floor((Math.random() * 3) + 1);
}

function getNameById(num) {
	switch (num) {
		case 1:
			num = 'Камень';
			break;
		case 2:
			num = 'Ножницы';
			break;
		default:
			num = 'Бумага';
	}
	return num;
}

function determineWinner(num1, num2) {
	if (num1 === num2) {
		return 0;
	} else if (((num1 === 1) && (num2 === 2)) || ((num1 === 2) && (num2 === 3)) || ((num1 === 3) && (num2 === 1))) {
		return 1;
	} else {
		return 2;
	}
}

function printResult(playerNum) {
	if (playerNum === 1) {
		playerNum = 'первый';
	} else if (playerNum === 2) {
		playerNum = 'второй';
	}
	result.innerHTML = (playerNum === 0) ? 'Ничья' : `Выиграл ${playerNum} игрок`;
}

btn.addEventListener("click", runGame);