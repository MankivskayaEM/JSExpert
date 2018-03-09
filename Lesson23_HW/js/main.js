(function(){
    
    const addBtn = document.getElementById("add-btn"),
        addedImagesElem = document.getElementById("added-images"),
        leftImagesElem = document.getElementById("left-images"),
        sortSelectElem = document.getElementById("sort-select"),
        galleryHolderElem = document.getElementById("gallery-holder");

    let showedArr = [],
        processedArr = [];

    let sortValue,
        leftImages,
        addedImages = 0;

    sortValue = localStorage.getItem('sortValue') === null ? 1 : +localStorage.getItem('sortValue');
    setSelectValue(sortValue);

    processedArr = getResultArr(data);
    leftImages = processedArr.length;
    printResult(leftImagesElem, leftImages);
    printResult(addedImagesElem, addedImages);

    // add item to gallery
    function addFun(e) {
        if (addBtn.classList.contains('disabled')) {
            return;
        }
        moveToShowed(processedArr, showedArr);
        showedArr.sort(compare);
        buildGallery();
        printResult(leftImagesElem, leftImages);
        printResult(addedImagesElem, addedImages);
        if (leftImages === 0) {
            addBtn.classList.add('disabled');
        }
        e.stopImmediatePropagation();
    }

    // remove item from gallery
    function deleteFun(e) {
        let itemIndex = getActiveItemIndex(e.target);
        if (itemIndex !== undefined) {
            removeFromShowed(showedArr, processedArr, itemIndex);
        }
        buildGallery();
        printResult(leftImagesElem, leftImages);
        printResult(addedImagesElem, addedImages);
        if (addedImages !== 0) {
            addBtn.classList.remove('disabled');
        }
    }

    // compare function for array sorting
    function compare(a, b) {
        if (sortValue === 1 || sortValue === 2) {
            a = a.name;
            b = b.name;
        } else if (sortValue === 3 || sortValue === 4) {
            a = Date.parse(a.date);
            b = Date.parse(b.date);
        }
        if (sortValue === 1 || sortValue === 3) {
            if (a > b) {
                return 1;
            }
            if (a < b) {
                return -1;
            }
                return 0;
        } else {
            if (a > b) {
                return -1;
            }
            if (a < b) {
                return 1;
            }
                return 0;
        }
    }

    // move item: processed array -> showed array
    function moveToShowed(originArr, finalArr) {
        finalArr.push(originArr.shift());
        leftImages--;
        addedImages++;
    }

    // move item: showed array -> processed array
    function removeFromShowed(originArr, finalArr, itemIndex) {
        finalArr.push(originArr.splice(itemIndex, 1)[0]);
        leftImages++;
        addedImages--;
    }

    // get index of clicked item 
    function getActiveItemIndex(elem) {
        if (elem.classList.contains('delete-btn')) {
            let itemNode = elem.closest('.gallery-item');
            let galleryNodes = itemNode.closest('#gallery-holder').children;
            for (var i = 0; i < galleryNodes.length; i++) {
                if (itemNode.isEqualNode(galleryNodes[i])) {
                    return itemIndex = i;
                }
            }
        }
    }

    // get processed array from raw-array
    function getResultArr(arr){
        let newArr = [];
        let newObj = {};
        for (let i = 0; i < arr.length; i++) {
            newObj = {
                url : getChangeUrl(arr[i].url),
                name : getChangeRegister(arr[i].name),
                description : getCutLongString(arr[i].description),
                date : getFormatDate(arr[i].date)
            }
            newArr.push(newObj);
        }
        return newArr;
    }

    // get proper url with http
    function getChangeUrl(url) {
        var protocol = 'http://';
        if (url.indexOf(protocol) !== 0) {
            return `http://${url}`;
        } else {
            return url;
        }
    }

    // get change register name
    function getChangeRegister(word) {
        return `${word.charAt(0).toUpperCase()}${word.substr(1).toLowerCase()}`;
    }

    // get short description string
    function getCutLongString(str){
        if (str.length > 15) {
            return `${str.substr(0,15)}...`;
        } else {
            return str;
        }
    }

    // get format date
    function getFormatDate(date){
        if (typeof date === 'number') {
            return (moment(date).format('YYYY/MM/DD hh:mm'));
        } else {
            return 'Wrong date';
        }
    }

    // get value of select's selected option
    function getSelectValue(e) {
        sortValue = +sortSelectElem.value;
        showedArr.sort(compare);
        buildGallery();
        setStorageSortValue(sortValue);
    }

    // set selected value for select
    function setSelectValue(sortValue) {
        sortSelectElem.value = sortValue;
    }

    // create gallery using String Template method
    function buildGallery() {
        let resultHTML = '';
        for (let i = 0; i < showedArr.length; i++) {
            resultHTML += `<div class="col-sm-3 col-xs-6 text-center gallery-item">\
            <div class="thumbnail">\
            <img src="${showedArr[i].url}" alt="${showedArr[i].name}">\
            <div class="caption">\
            <div class="h4">${showedArr[i].name}</div>\
            <div class="text-muted">${showedArr[i].description}</div>\
            <div class="text-muted">${showedArr[i].date}</div>\
            </div>\
            <button class="btn btn-danger bottom-margin delete-btn">Удалить</button>\
            </div>\
            </div>`;
        }
        printResult(galleryHolderElem, resultHTML);
    }

    // print result to HTML
    function printResult(holder, resultString) {
        holder.innerHTML = resultString;
    }

    // set local storage value
    function setStorageSortValue(value) {
        localStorage.setItem('sortValue', value);
    }

    addBtn.addEventListener('click', addFun);
    galleryHolderElem.addEventListener('click', deleteFun);
    sortSelectElem.addEventListener('change', getSelectValue);

})();