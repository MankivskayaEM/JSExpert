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

let typeSelectValue,
    amountSelectValue;

resultArr = getResultArr(data);
setGroupsHide(groupsArr);

function setGroupsHide(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i].classList.add('hide');
    }
}

// get new changed array
function getResultArr(arr){
    return arr.map(function(elem){
        return {
            url : changeUrl(elem.url),
            name : changeRegister(elem.name),
            description : cutLongString(elem.description),
            date : formatDate(elem.date)
        }
    });
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

function init() {

    let picNum;
    let resultHTML = '';

    // get select value
    let newTypeSelectValue = document.getElementById("type-selector").value;
    let newAmountSelectValue = document.getElementById("line-selector").value;

    // check changes
    if ((newTypeSelectValue !== typeSelectValue) || (newAmountSelectValue !== amountSelectValue)) {

        typeSelectValue = newTypeSelectValue;
        amountSelectValue = newAmountSelectValue;

        setGroupsHide(groupsArr);

        switch (+amountSelectValue) {
            case 0:
                picNum = resultArr.length;
                break;
            case 1:
                picNum = 3;
                break;
            case 2:
               picNum = 6;
        }

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
        }

    }

    // create gallery with Replace method
    function runReplaceMethod() {
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
        firstBlock.innerHTML = resultHTML;
    }

    // create gallery with String Template method
    function runStringMethod() {
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
        secondBlock.innerHTML = resultHTML;
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
            let newImageBlock,
                newImage,
                newInfoWrapper,
                nameInfoRow,
                descriptionInfoRow,
                dateInfoRow;

            newImageBlock = imageBlock.cloneNode(false);

            newImage = image.cloneNode(false);
            newImage.src = `${resultArr[i].url}`;
            newImage.alt = `${resultArr[i].name}`;

            newInfoWrapper = infoWrapper.cloneNode(false);

            nameInfoRow = infoRow.cloneNode(false);
            nameInfoRow.textContent = `${resultArr[i].name}`;

            descriptionInfoRow = infoRow.cloneNode(false);
            descriptionInfoRow.classList.add('top-padding');
            descriptionInfoRow.textContent = `${resultArr[i].description}`;

            dateInfoRow = infoRow.cloneNode(false);
            dateInfoRow.textContent = `${resultArr[i].date}`;

            newInfoWrapper.appendChild(nameInfoRow).appendChild(descriptionInfoRow).appendChild(dateInfoRow);
            newImageBlock.appendChild(newImage);
            newImageBlock.appendChild(newInfoWrapper);
            thirdBlock.appendChild(newImageBlock);

        }
    }
    
}

btn.addEventListener("click", init);

})()