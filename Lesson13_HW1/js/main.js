/*Цель задания: научиться базовым приемам работы с функциями.
Названия всех функций даны для справки. Вы можете придумать свои.
Все то что было реализовано в прошлом задании необходимо перевести на работу с функциями.

1. Создать главную самозапускающуюся функцию run() в которой будет выполняться основной код (цикл)
Также эта функция должна содержать в себе вызовы всех остальных функций.

2. Сделать функцию для получения случайных чисел (getRndNumber).
Значение каждой переменной, в которую мы записываем, какая выпала кость получать с помощью вызова этой функции

3. Сделать одну функцию которая будет склеивать все строки в одну (setResult). Она должна принимать только один аргумент. Строку текста, которую надо склеить.
(если вы выводите данные не только в div с id result, а возможно еще в какой то другой div, тогда функция должна принимать 2 аргумента: id и Строку)

4. Сделать функцию для определения совпадений. (isNumbersEqual). Она должна содержать в себе проверку на совпадение и внутри себя вызывать функцию для сохранения данных в общую строку (setResult).

5. Сделать функцию для определения разницы. (isBigDifference). Она должна содержать в себе соответствующую проверку и внутри себя вызывать функцию для сохранения данных в общую строку (setResult).

6. Сделать функцию для вычисления результата total. Функция должна вычислять результат и сохранять его в переменную total.

7. Сделать функцию, которая напечатает полученные с помощью функции setResult данные в HTML (printResult).*/

/*'use strict';
var first,
	second,
	total = 0,
	diff;
var mainStr = '',
	result = document.getElementById("result");

function mainFunc() {
	for (var i = 0; i < 15; i++) {
		if (i == 8 || i == 13) {
			continue;
		}

		first = getRandomNum();
		second = getRandomNum();
		joinStr(`Первая кость: ${first} Вторая кость: ${second}<br>`);
		isEqualNum(first, second);
		isBigDiff(first, second);
		total = setTotal(first, second);
	}

	(total > 100) ? joinStr(`<b>Победа, вы набрали ${total} очков<b><br>`) : joinStr(`<b>Вы проиграли, у вас ${total} очков</b><br>`);
	printResult(mainStr);
}

function getRandomNum() {
	return Math.floor((Math.random() * 6) + 1);
}

function joinStr(partStr) {
	return mainStr += partStr;
}

function isEqualNum(firstNum, secondNum) {
	if (firstNum == secondNum) {
		joinStr(`<b>Выпал дубль. Число ${first}</b><br>`);
	}
}

function isBigDiff(firstNum, secondNum) {
	if (((firstNum < 3)&&(second > 4))||((secondNum < 3)&&(firstNum > 4))) {
		diff = Math.abs(firstNum - secondNum);
		joinStr(`<b>Большой разброс между костями. Разница составляет ${diff}</b><br>`);
	}
}

function setTotal(firstNum, secondNum) {
	return total += firstNum + secondNum;
}

function printResult(total) {
	result.innerHTML = mainStr;
}

mainFunc();*/


/*fixed variant*/
'use strict';
var first,
	second,
	total = 0;
var mainStr = '',
	result = document.getElementById("result");

(function mainFunc() {
	var totalResult = '';
	for (var i = 0; i < 15; i++) {
		if (i == 8 || i == 13) {
			continue;
		}

		first = getRandomNum();
		second = getRandomNum();
		joinStr(`Первая кость: ${first} Вторая кость: ${second}<br>`);
		isEqualNum(first, second);
		isBigDiff(first, second);
		setTotal(first, second);
	}

	totalResult = (total > 100) ? `<b>Победа, вы набрали ${total} очков<b><br>` : `<b>Вы проиграли, у вас ${total} очков</b><br>`;
	joinStr(totalResult);
	printResult(mainStr);
})();

function getRandomNum() {
	return Math.floor((Math.random() * 6) + 1);
}

function joinStr(partStr) {
	mainStr += partStr;
}

function isEqualNum(firstNum, secondNum) {
	if (firstNum === secondNum) {
		joinStr(`<b>Выпал дубль. Число ${first}</b><br>`);
	}
}

function isBigDiff(firstNum, secondNum) {
	if ( ((firstNum < 3) && (second > 4)) || ((secondNum < 3) && (firstNum > 4)) ) {
		joinStr(`<b>Большой разброс между костями. Разница составляет ${Math.abs(firstNum - secondNum)}</b><br>`);
	}
}

function setTotal(firstNum, secondNum) {
	total += firstNum + secondNum;
}

function printResult(total) {
	result.innerHTML = mainStr;
}