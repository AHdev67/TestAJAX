function loadDoc1() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        manageBingBong(this.responseText);
    }
    xhttp.open("GET", "bingbong.json", true);
    xhttp.send();
}

function manageBingBong(responseText) {
    var jsonData = JSON.parse(responseText);
    const demoLegend = document.getElementById("legDemo");
    const questionMark = " ?";
    const demoContent = document.getElementById("demo");
    
    if(demoContent.textContent.includes("Bing")) {
        demoLegend.textContent = jsonData[0].name.concat(questionMark);
        demoContent.textContent = jsonData[1].name;
    }
    else if(demoContent.textContent.includes("Bong")) {
        demoLegend.textContent = jsonData[1].name.concat(questionMark);
        demoContent.textContent = jsonData[0].name;
    }
}

function loadDoc2() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        manageBateau(this.responseText);
    }
    xhttp.open("GET", "bateau.json", true);
    xhttp.send();
}

function manageBateau(responseText) {
    var jsonData = JSON.parse(responseText);
    const demoContent2 = document.getElementById("demo2");
    const selectedRadio = document.querySelector('input[name="choice"]:checked');
    
    if (selectedRadio.value == "pincemi") {
        //console.log(selectedRadio.value);
        demoContent2.textContent = jsonData[0].name;
    }
    else if (selectedRadio.value == "pincemoi") {
        //console.log(selectedRadio.value);
        demoContent2.textContent = jsonData[1].name;
    }
}

function multiply() {
    const numbers = document.querySelectorAll('input[name="userInp"]');
    const res = document.getElementById("result");
    let prod = 1;

    numbers.forEach(nb => {
        if (nb.value == "") {
            nb.value = "0";
        }
        prod = parseInt(nb.value) * prod;
    })

    res.textContent = prod;
}

function handleFocus(input) {
    if (input.value == '0') {
        input.value = '';
    }
}

function handleBlur(input) {
    if (input.value == '') {
        input.value = '0'
    }
}

function loadSuggest() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        manageSearch(this.responseText);
    }
    xhttp.open("GET", "searchData/cpu.json", true);
    xhttp.send();
}

function removeSpecialCharactersAndSpaces(str) {
    return str.replace(/[^\w]|_/g, '');
}

function manageSearch(responseText) {
    const searchbar = document.getElementById("search");
    const jsonData = JSON.parse(responseText);
    const searchValue = removeSpecialCharactersAndSpaces(searchbar.value.trim().toLowerCase());

    const filteredResults = jsonData.filter(product => {
        const productNameWithoutSpecialChars = removeSpecialCharactersAndSpaces(product.name.toLowerCase());
        return productNameWithoutSpecialChars.includes(searchValue); // Check for inclusion without special characters
    });

    if (searchValue.length > 0) {
        suggest(filteredResults);
    } else {
        clearResults();
    }
}

function suggest(results) {
    const resultList = document.getElementById("suggestions");
    resultList.innerHTML = "";

    if (results.length > 0) {
        for(let i = 0; i < 10; i++) {
            const result = document.createElement('li');
            const text = document.createTextNode(results[i].name);
            result.appendChild(text);
            resultList.appendChild(result);
        }
    } else {
        noResults();
    }
}

function noResults() {
    const resultList = document.getElementById("suggestions");
    resultList.innerHTML = ""; // Clear previous results

    const error = document.createElement('li');
    const text = document.createTextNode('No results found. Sorry!');
    error.appendChild(text);
    resultList.appendChild(error);
}

function clearResults() {
    const resultList = document.getElementById("suggestions");
    resultList.innerHTML = ""; // Clear all results
}

// ---------- DATA LOADER FOR SELECT FIELD ----------

// const xhttp = new XMLHttpRequest();
// xhttp.onload = function() {
//     createCpuOption(this.responseText);
// }
// xhttp.open("GET", "searchData/cpu.json", true);
// xhttp.send();

fetch('searchData/cpu.json')
    .then(response => response.json())
    .then(data => {
        createCpuOption(data);
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });

function createCpuOption(jsonData) {
    const selectList = document.getElementById("cpuList");

    for(let i = 0; i < jsonData.length; i++) {
        const option = document.createElement('option');
        option.text = jsonData[i].name;
        option.value = String(i);
        selectList.appendChild(option);
    }
}