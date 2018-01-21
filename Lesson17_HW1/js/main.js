var btn = document.getElementById("play");
var myArr = [],
	myChangedArr = [],
	filteredArr = [];

function transform() {
	cutOff(data, 6, 1);
	getNewArr(data, myArr);
    myChangedArr = changeArr(myArr);
   	filteredArr = filterArr(myChangedArr);
   	printResult(filteredArr);
}

btn.addEventListener("click", transform);

function cutOff(arr, startPos, amount) {
	arr.splice(startPos, amount);
}

function getNewArr(oldArr, newArr) {
	oldArr.forEach(function(elem, index){
		newArr.push(Object.assign({}, elem));
		delete newArr[index].id;
	});
}

function changeArr(arr) {
	return arr.map(function(elem){
		var newElem = Object.assign({}, elem);
		newElem.name = changeRegister(elem.name);
		newElem.url = changeUrl(newElem.url);
		newElem.description = cutLongString(newElem.description);
		newElem.date = formatDate(newElem.date);
		newElem.params = getParams(newElem.params);
		newElem.isVisible = elem.params.status;
		return newElem;
	});
};

function changeRegister(word) {
	return `${word.charAt(0).toUpperCase()}${word.substr(1).toLowerCase()}`;
}

function changeUrl(url){
	return `http://${url}`;
}

function cutLongString(str){
	return `${str.substr(0,15)}...`;
}

function formatDate(date){
	return (moment(date).format('YYYY/MM/DD hh:mm'));
}

function getParams(param){
	return `${param.status}=>${param.progress}`;
}

function filterArr(arr){
	return arr.filter(function(elem){
		return elem.isVisible === true;
	});
}

function printResult(result){
	console.log(result);
}





/*1. С помощью функции splice необходимо вырезать 6-й элемент массива. В результате ваш массив должен стать короче на один элемент.

2. Используйте функцию forEach.
Внутри цикла создайте новый массив объектов.
В процессе создания нового массива объектов, избавьтесь от ключа id.
То есть в вашем новом массиве не должно быть id в каждом конкретном объекте.
Подсказка:

var newArr = [];
data.forEach(function(item, index){
      newArr.push({
        name: item.name
        ////.....
      })
})
3. По новому массиву объектов, полученному с помощью функции forEach пройдитесь методом map()

4. На каждой итерации цикла мы получаем один объект из массива объектов. Берем этот объект и преобразоваем его поля по следующим правилам.
Вам пригодится документация по дате и по строкам.

5. Для поля Name: с помощью функций работы со стрингами делаете первую букву большой, остальные маленькие (ДЖИП -> Джип)

6. Для поля url: добавить перед ним «http://»

7. Для поля Description: с помощью функций работы со стрингами делаете обрезание до 15 символов. После добавляем многоточие (…) Остальное отбрасываете.

8. Для поля date: создать объект даты из заданных миллисекунд и потом отобразить в виде «2015/07/02 14:15»
Для этого надо открыть документацию по дате.
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date
Пример как преобразовывать дату. Можно использовать и другой подход. Главное чтоб он не был более громоздким и сложным.

var date = 1422153200637;
var newDate = function(date){
    var tmpDate = new Date(date);
    return tmpDate.getFullYear() + "/" +
           tmpDate.getMonth() + "/" +
           tmpDate.getDate() + " " +
           tmpDate.getHours() + ":" +
           tmpDate.getMinutes();
};
9*.(дополнительное задание)
Более предпочтительно работать с датой с помощью библиотеки moment.js
Постарайтесь разобраться как она работает и использовать ее вместо примера выше. Если очень тяжело — используйте подход выше.

10. Для поля params: из значений ключей сформировать строку типа «true=>80». Для выполнения задания можно обращаться к полям объект params напрямую.
То есть params.status и params.progress

11. Создать новое поле isVisible. Переложить в это поле значение поля params.status.

12. После всех преобразований функция map вернет вам новый массив. Теперь с помощью функции filter вам необходимо выбрать только те элементы у которых isVisible == true. Пример работы функции filter есть в презентации.

13. Полученный результат печатаем в консоль.
Для печати используем отдельную функцию как в прошлых заданиях. То есть вынесете console.log в отдельную функцию.

14. Пример результата (количество элементов в результате должно быть не два а сколько укажете в переменной):

var data = [{
    url: "http://desktopwallpapers.org.ua/mini/201507/40069.jpg",
    name: "Chevrolet",
    params : "true=>80",
    isVisible : true,
    description : "be conveyed to ...",
    date : "2015/01/25 14:15"
},{
    url: "http://desktopwallpapers.org.ua/mini/201507/40068.jpg",
    name: "Dewoo",
    params : "true=>88",
    isVisible : true,
    description : "sing color to a...",
    date : "2015/12/18 15:35"
}]*/