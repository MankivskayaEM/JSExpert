(function() {

	const dateObj = {
		weekDayElem : document.getElementById('week-day'),
		dateMonthElem : document.getElementById('date'),
		daysLeftElem : document.getElementById('days-left'),
		currentTimeElem : document.getElementById('current-time'),
		stopBtn : document.getElementById('stop-btn'),
		dayWord : '',
		daysLeft : null,
		targetDate : new Date(2019,0,1),
		timerMode : true
	}

	// run timer
 	watchGo(dateObj);
 	let timer = setInterval(watchGo, 1000, dateObj);

 	// switch timer button
 	let switchTimer = () => {
 		if (dateObj.timerMode) {
	 		dateObj.timerMode = false;
	 		clearInterval(timer);
	 		dateObj.stopBtn.textContent = 'RUN';
 		} else {
 			dateObj.timerMode = true;
	 		timer = setInterval(watchGo, 1000, dateObj);
	 		dateObj.stopBtn.textContent = 'STOP';
 		}
 	}

 	// timer function
	function watchGo(dateObj) {
		const myDate = new Date();
		const daysToFinal = getDaysLeft(dateObj.targetDate, myDate);
	 	printResult(dateObj, myDate, daysToFinal);
	}

	// get how many days left
	function getDaysLeft(finalDate, currentDate) {
		return Math.round((finalDate.getTime() - currentDate.getTime()) / (86400*1000));
	}

	// set proper word
	function setDayWord(num) {
		if (num % 10 === 1) {
			return 'день';
		} else if (num % 10 === 2 || num % 10 === 3 || num % 10 === 4) {
			return 'дня';
		} else {
			return 'дней'
		}
	}

	// print data
	function printResult(dateObj, myDate, daysToFinal) {
		dateObj.weekDayElem.textContent = myDate.toLocaleDateString('ru', {weekday:'long'});
		dateObj.dateMonthElem.textContent = myDate.toLocaleDateString('ru', {day: '2-digit', month: 'long'});
		dateObj.currentTimeElem.textContent = myDate.toLocaleTimeString('ru', {hour: '2-digit', minute: '2-digit', second: '2-digit'});
	 	dateObj.daysLeftElem.textContent = `${daysToFinal} ${setDayWord(daysToFinal)}`;
	}

	dateObj.stopBtn.addEventListener('click', switchTimer);

})();
