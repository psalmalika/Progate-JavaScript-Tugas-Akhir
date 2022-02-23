const amiiboDiv = document.getElementById('amiibo-div');

/* Deklarasi variabel yang akan diubah dalam displayAmiibo(); agar globally available */
let image = '';
let name = '';
let character = '';
let series = '';
let game = '';
let type = '';

let filteredAmiibo = '';

const getAmiibo = async () => {
    try {
        const response = await fetch(`https://amiiboapi.com/api/amiibo/?showgames&showusage`, {
            method: "GET"
        });
        const amiiboList = await response.json();
        /*console.log(amiiboList);*/
        /* Game name */
        /*console.log(amiiboList.amiibo[0].games3DS[0].gameName);*/
        console.log('Tombol Search diklik')
        console.log('getAmiibo() berhasil')
        return amiiboList;
    } catch (error) {
        console.log(`Error! This is why: ${error}`);
        return;
    };
};

const findAmiibo = async() => {
    const keywordInput = document.getElementById('keyword-input').value;
    let allAmiibo = await getAmiibo(keywordInput);
    let filter = document.getElementById('filter').value;

    /*console.log(filter);*/

    /*console.log('Filtered Amiibo result:');*/
    /* const ke let, declare secara global */
    filteredAmiibo = allAmiibo.amiibo.filter(amiibo => {
            if (filter == 'name'){
                return amiibo.name.includes(keywordInput);
            } else if (filter == 'character') {
                return amiibo.character.includes(keywordInput);
            } else if (filter == 'amiiboSeries') {
                return amiibo.amiiboSeries.includes(keywordInput);
            } else if (filter == 'gameSeries') {
                return amiibo.gameSeries.includes(keywordInput);
            } else {
                return amiibo.character.includes(keywordInput) || amiibo.name.includes(keywordInput) || amiibo.gameSeries.includes(keywordInput) || amiibo.amiiboSeries.includes(keywordInput);
            };
        });
    /*console.log(filteredAmiibo);*/
    if (keywordInput.trim().length == 0) {
        console.log('No input');
        const noResults = `<p id="no-results">Please input keyword.</p>`
        amiiboDiv.innerHTML = noResults;
    } else if (filteredAmiibo.length == 0) {
        console.log('Oops! No results');
        const noResults = `<p id="no-result">Nothing here. Please try another keyword.</p>`
        amiiboDiv.innerHTML = noResults; 
    } else {
        displayAmiibo(filteredAmiibo);
    };
};

const displayAmiibo = (amiibos) => {
    let listOfAmiibo = ""
    for (let i = 0; i < amiibos.length; i++) {
        const amiibo = amiibos[i];
        /*console.log(amiibo);*/

        image = amiibo.image;
        name = amiibo.name;
        character = amiibo.character
        series = amiibo.amiiboSeries;
        game = amiibo.gameSeries;
        type = amiibo.type;
        head = amiibo.head;
        tail = amiibo.tail;
        number = amiibo.head + amiibo.tail;

        const amiiboCard = `
            <div class="amiibo-card">
                <div class="card-background"></div>
                <div class="amiibo-image-container">
                    <img class="amiibo-image" src='${image}'>
                </div>
                <div class="amiibo-details">
                    <h1 class="amiibo-name">${name}</h1>
                    <p class="amiibo-character">Character: ${character}</p>
                    <p class="amiibo-series">Amiibo Series: ${series}</p>
                    <p class="amiibo-game">Game Series: ${game}</p>
                    <p class="amiibo-type">Type: ${type}</p>
                    <p class="amiibo-number">Number: ${number};</p>
                    <button class="button button-details" id="button-details-${i}" value=${number} onClick="openModal()"><p>Details</p></button>
                </div>
            </div>
        `
        
        listOfAmiibo += amiiboCard;
    };

    amiiboDiv.innerHTML = listOfAmiibo;
};

const openModal = async() => {
    console.log('Tombol Details diklik');
    await findAmiibo(filteredAmiibo);
    console.log('filteredAmiibo di openModal:')
    console.log(filteredAmiibo);

    /* value1 = document.getElementById("button-details-0").value;
    console.log(value1); */
    
    /* Nemu i dari value button Details (seharusnya berbeda setiap card) */
    let x = document.getElementById(`button-details-${i}`).value;
    console.log(x);
    
    name = filteredAmiibo[x].name;
    console.log('Akan buka pop up page');
    console.log(name);
}
