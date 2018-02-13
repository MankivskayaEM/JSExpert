Lesson #21
----------------------------

Архив с заготовкой можно скачать [здесь](http://www.jsexpert.net/wp-content/uploads/2018/01/dom_homework.zip).
Задача: Вам необходимо построить галерею изображений одним из 3-х способов.

1. методом replace
2. методом шаблонных строк
3. методом createElement

**Общее описание:** 

необходимо взять данные, которые находятся в файле data.js преобразовать эти данные и отобразить их на экране. Для отображения на экране необходимо реализовать цикл который создаст нужный html код для последующей вставки в страницу.
Создавать html код можно одним из трех возможных способов. Два этих способа показаны в заготовке. Третий освещался в лекции на тему DOM.

**Рекомендация:** 

задание объемное, постарайтесь реализовать столько сколько сможете. Если что-то не поняли, пропускайте или делайте как поняли.

**Пошаговый алгоритм:**

* Взять данные из data.js.
Из исходных данных отобразить только саму картинку, название, описание, и дату. Соответственно для этих данных использовать преобразования, которые были в предыдущем домашнем задании. Остальные данные отбросить.
* Получить результирующий массив объектов.
Определить тип галереи, которую будете строить. Для этого снять значение из первого селектбокса, пример как это сделать указан в коде. Вы получите значения 0, 1, 2 и тд. Содержимое атрибута value.
* Определить количество элементов, которые будете показывать в галерее. Для этого снять значение со второго селектбокса.
* После нажатия на кнопку «построить галерею» запустить функцию run или init которая построит галерею.
* Проитерироваться по массиву объектов с помощью цикла. Количество итераций зависит от выбранного значения во втором селектбоксе.
* На каждой итерации цикла HTML код создавать с помощью метода который был выбран в первом селектбоксе. Примеры создания HTML кода есть в заготовке.
* При построении галереи должны быть скрыты все блоки, которые не относятся к данному типу галереи. Соответственно будет отображен только один заголовок и сама галерея. Каждый такой блок находится внутри контейнера с классом (first-group, second-group, third-group). Таким образом, например, если показан блок second-group то все остальные блоки скрыты.
* Если пользователь меняет параметры изменив значения в селектбоксе, после нажатия на кнопку «построить галерею» она должна быть пересоздана согласно новым параметрам.
Например изменился способ построения, тогда прячем блок second-group и показываем тот который необходимо и перестраиваем галерею новым способом. При этом заново считываем значения параметра из второго селектбокса и строим то количество элементов, которе необходимо.




Lesson #21 Watch
----------------------------

Задача **«Часы»**
Вам необходимо реализовать электронные часы с календарем, которые будут показывать текущее время и дату.
1. Воспользуйтесь шаблоном по ссылке для визуального оформления часов. Заготовку сможете найти [здесь](http://www.jsexpert.net/wp-content/uploads/2018/02/clockExample.zip).
2. Создайте самостоятельно скриптовый файл и подключаете его к HTML странице. Вся логика по работе приложения должна располагаться в этом файле.
3. Для реализации часов воспользуйтесь функционалом встроенного объекта Date и функциями setInterval.
4. При загрузке приложения, с помощью new Date() получите значение текущего времени и даты и отобразите его на экране.
5. С помощью функции setInterval каждую секунду (или чаще), запускать специальную функцию, которая будет перерисовывать значение текущего времени если это необходимо.
6. Таким образом у вас на экране должна отображаться такая информация: Сегодня среда, 10 января. Текущее время: 14:25:45
7. Так же необходимо отобразить информацию сколько дней осталось до следующего года. Формат: До 2019 года осталось 327 дней.