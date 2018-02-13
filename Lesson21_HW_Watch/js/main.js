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

 	watchGo(dateObj);
 	let timer = setInterval(watchGo, 1000, dateObj);

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

	function watchGo() {
		const myDate = new Date();

		dateObj.weekDayElem.textContent = myDate.toLocaleDateString('ru', {weekday:'long'});
		dateObj.dateMonthElem.textContent = myDate.toLocaleDateString('ru', {day: '2-digit', month: 'long'});
		dateObj.currentTimeElem.textContent = myDate.toLocaleTimeString('ru', {hour: '2-digit', minute: '2-digit', second: '2-digit'});

	 	dateObj.daysLeft = Math.round((dateObj.targetDate.getTime() - myDate.getTime()) / (86400*1000));
	 	let num = dateObj.daysLeft.toString()[dateObj.daysLeft.toString().length-1];
	 	switch (+num){
	 		case 1 :
	 			dateObj.dayWord = 'день';
	 			break;
	 		case 2 :
	 		case 3 :
	 		case 4 :
	 			dateObj.dayWord = 'дня';
	 			break;
	 		default : 
	 			num = 'дней';
	 	}
	 	dateObj.daysLeftElem.textContent = `${dateObj.daysLeft} ${dateObj.dayWord}`;
	}

	dateObj.stopBtn.addEventListener('click', switchTimer);

})();
