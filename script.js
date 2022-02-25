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
                    <button class="button button-details" onClick="openModal(${i})")><p>Details</p></button>
                </div>
            </div>
        `

        listOfAmiibo += amiiboCard;
        /* let buttonDetails = document.getElementById(`button-details-${i}`);

        buttonDetails.addEventListener("click", openModal(i)); */
    };

    amiiboDiv.innerHTML = listOfAmiibo;

};

const amiiboPage = document.querySelector('.amiibo-page');

const openModal = async function (e) {
    //const res = await findAmiibo(keyword);
    //console.log('filteredAmiibo di openModal:')
    //console.log(filteredAmiibo);
    image = filteredAmiibo[e].image;
    name = filteredAmiibo[e].name;
    character = filteredAmiibo[e].character;
    series = filteredAmiibo[e].amiiboSeries;
    game = filteredAmiibo[e].gameSeries;
    type = filteredAmiibo[e].type;
    head = filteredAmiibo[e].head;
    tail = filteredAmiibo[e].tail;
    identifier = filteredAmiibo[e].head + filteredAmiibo[e].tail;
    releaseAU = filteredAmiibo[e].release.au;
    releaseEU = filteredAmiibo[e].release.eu;
    releaseJP = filteredAmiibo[e].release.jp;
    releaseNA = filteredAmiibo[e].release.na;
    console.log(releaseAU);

    document.getElementById('amiibo-page-image').src = `${image}`;
    document.getElementById('amiibo-page-name').innerHTML = name;
    document.getElementById('amiibo-page-character').innerHTML = `<span class="page-title">Karakter:</span> ${character}`;
    document.getElementById('amiibo-page-amiibo-series').innerHTML = `<span class="page-title">Amiibo Series:</span> ${series}`;
    document.getElementById('amiibo-page-game-series').innerHTML = `<span class="page-title">Game Series:</span> ${game}`;
    document.getElementById('amiibo-page-type').innerHTML = `<span class="page-title">Type:</span> ${type}`;
    document.getElementById('amiibo-page-release-au').innerHTML = `${releaseAU} (Australia)`;
    document.getElementById('amiibo-page-release-eu').innerHTML = `${releaseEU} (Europe)`;
    document.getElementById('amiibo-page-release-jp').innerHTML = `${releaseJP} (Japan)`;
    document.getElementById('amiibo-page-release-na').innerHTML = `${releaseNA} (North America)`;

    // console.log(e.name);
    console.log(amiiboPage);
    // amiiboPage.classList.toggle('show-amiibo-page');
    amiiboPage.style.display = 'block';
}

const closeModal = () => {
    amiiboPage.style.display = 'none';
}

/* const openModal = async(x) => {
    console.log('Tombol Details diklik');
    await findAmiibo(filteredAmiibo);
    console.log('filteredAmiibo di openModal:')
    console.log(filteredAmiibo);

    value1 = document.getElementById("button-details-0").value;
    console.log(value1);
    
    // Nemu i dari value button Details (seharusnya berbeda setiap card)
    let x = document.getElementById(`button-details-${i}`).value;
    console.log(x);
    
    name = filteredAmiibo[x].name;
    console.log('Akan buka pop up page');
    console.log(name);
} */
