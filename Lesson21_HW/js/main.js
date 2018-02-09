(function(){
    
let btn = document.getElementById("play"),
    firstBlock = document.querySelector('#first-line'),
    secondBlock = document.querySelector('#second-line'),
    thirdBlock = document.querySelector('#third-line'),
    firstGroup = document.querySelector('.first-group'),
    secondGroup = document.querySelector('.second-group'),
    thirdGroup = document.querySelector('.third-group');

let groupsArr = [firstGroup, secondGroup, thirdGroup];

let resultArr = [];
let picNum;
let resultHTML = '';

let typeSelectValue,
    amountSelectValue,
    newTypeSelectValue,
    newAmountSelectValue;

setGroupsHide(groupsArr);

function init() {
    getSelectValues();

    // check changes and run build
    if ((newTypeSelectValue !== typeSelectValue) || (newAmountSelectValue !== amountSelectValue)) {
        typeSelectValue = newTypeSelectValue;
        amountSelectValue = newAmountSelectValue;
        setPicturesAmount();

        if (+typeSelectValue !== 0) {
            setGroupsHide(groupsArr);
            resultArr = getResultArr(data);
        }
        chooseGalleryMethod();
    }
}

function setGroupsHide(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i].classList.add('hide');
    }
}

// get select value
function getSelectValues() {
    newTypeSelectValue = document.getElementById("type-selector").value;
    newAmountSelectValue = document.getElementById("line-selector").value;
}

function setPicturesAmount() {
    switch (+amountSelectValue) {
        case 0:
            picNum = data.length;
            break;
        case 1:
            picNum = 3;
            break;
        case 2:
            picNum = 6;
            break;
        default:
            alert('Количество неопределено');
    }
}

function chooseGalleryMethod() {
    switch (+typeSelectValue) {
        case 0:
            alert('Пожалуйста, выберите вариант построения');
            break;
        case 1:
            firstGroup.classList.remove('hide');
            runReplaceMethod();
            break;
        case 2:
            secondGroup.classList.remove('hide');
            runStringMethod();
            break;
        case 3:
            thirdGroup.classList.remove('hide');
            runCreateElementMethod();
            break;
        default:
            alert('Вариант построения не определен');
    }
}

// get new changed array
function getResultArr(arr){
    let newArr = [];
    let newObj = {};
    for (var i = 0; i < picNum; i++) {
        newObj = {
            url : changeUrl(arr[i].url),
            name : changeRegister(arr[i].name),
            description : cutLongString(arr[i].description),
            date : formatDate(arr[i].date)
        }
        newArr.push(newObj);
    }
    return newArr;
}

function changeUrl(url) {
    var protocol = 'http://';
    if (url.indexOf(protocol) !== 0) {
        return `http://${url}`;
    } else {
        return url;
    }
}

function changeRegister(word) {
    return `${word.charAt(0).toUpperCase()}${word.substr(1).toLowerCase()}`;
}

function cutLongString(str){
    if (str.length > 15) {
        return `${str.substr(0,15)}...`;
    } else {
        return str;
    }
}

function formatDate(date){
    if (typeof date === 'number') {
        return (moment(date).format('YYYY/MM/DD hh:mm'));
    } else {
        return 'Wrong date';
    }
}

// create gallery with Replace method
function runReplaceMethod() {
    resultHTML = '';
    let replaceItemTemplate = '<div class="col-sm-3 col-xs-6">\
        <img src="$url$" alt="$name$" class="img-thumbnail">\
        <div class="info-wrapper">\
        <div class="text-muted">$name$</div>\
        <div class="text-muted top-padding">$description$</div>\
        <div class="text-muted">$date$</div>\
        </div>\
        </div>';
    for (let i = 0; i < picNum; i++) {
        resultHTML += replaceItemTemplate.replace(/\$name\$/gi, resultArr[i].name)
                                         .replace("$url$", resultArr[i].url)
                                         .replace("$description$", resultArr[i].description)
                                         .replace("$date$", resultArr[i].date);
    }
    printResult(firstBlock);
}

// create gallery with String Template method
function runStringMethod() {
    resultHTML = '';
    for (let i = 0; i < picNum; i++) {
        resultHTML += `<div class="col-sm-3 col-xs-6">\
        <img src="${resultArr[i].url}" alt="${resultArr[i].name}" class="img-thumbnail">\
        <div class="info-wrapper">\
        <div class="text-muted">${resultArr[i].name}</div>\
        <div class="text-muted top-padding">${resultArr[i].description}</div>\
        <div class="text-muted">${resultArr[i].date}</div>\
        </div>\
        </div>`;
    }
    printResult(secondBlock);
}

// create gallery with DOM createElement method
function runCreateElementMethod(argument) {
    thirdBlock.innerHTML = '';
    let imageBlock,
        image,
        infoWrapper,
        infoRow;

    imageBlock = document.createElement('div');
    imageBlock.className = 'col-sm-3 col-xs-6';

    image = document.createElement('img');
    image.className = 'img-thumbnail';

    infoWrapper = document.createElement('div');
    infoWrapper.className = 'info-wrapper';

    infoRow = document.createElement('div');
    infoRow.className = 'text-muted';

    for (let i = 0; i < picNum; i++) {
        let galleryItem = {
            newImageBlock : imageBlock.cloneNode(false),
            newImage : image.cloneNode(false),
            newInfoWrapper : infoWrapper.cloneNode(false),
            nameInfoRow : infoRow.cloneNode(false),
            descriptionInfoRow : infoRow.cloneNode(false),
            dateInfoRow : infoRow.cloneNode(false)
        };
        buildGallery(galleryItem, i);
    }
}

function buildGallery(galleryItem, i) {
    galleryItem.newImage.src = `${resultArr[i].url}`;
    galleryItem.newImage.alt = `${resultArr[i].name}`;
    galleryItem.nameInfoRow.textContent = `${resultArr[i].name}`;
    galleryItem.descriptionInfoRow.classList.add('top-padding');
    galleryItem.descriptionInfoRow.textContent = `${resultArr[i].description}`;
    galleryItem.dateInfoRow.textContent = `${resultArr[i].date}`;
    galleryItem.newInfoWrapper
        .appendChild(galleryItem.nameInfoRow)
        .appendChild(galleryItem.descriptionInfoRow)
        .appendChild(galleryItem.dateInfoRow);
    galleryItem.newImageBlock.appendChild(galleryItem.newImage);
    galleryItem.newImageBlock.appendChild(galleryItem.newInfoWrapper);
    thirdBlock.appendChild(galleryItem.newImageBlock);
}

function printResult(resultHolder) {
    resultHolder.innerHTML = resultHTML;
}

btn.addEventListener("click", init);

})()