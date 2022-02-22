const amiiboDiv = document.getElementById('amiibo-div');


const getAmiibo = async (keyword, filter) => {
    try {
        const response = await fetch(`https://amiiboapi.com/api/amiibo/`, {
            method: "GET"
        });
        const amiiboList = await response.json();
        /*console.log(amiiboList);*/
        return amiiboList;
    } catch (error) {
        console.log(`Error! This is why: ${error}`);
        return;
    };
};

const displayAmiibo = (amiibos) => {
    let listOfAmiibo = ""
    for (let i = 0; i < amiibos.length; i++) {
        const amiibo = amiibos[i];
        /*console.log(amiibo);*/

        let image = amiibo.image;
        let name = amiibo.name;
        let character = amiibo.character
        let series = amiibo.amiiboSeries;
        let game = amiibo.gameSeries;

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
                </div>
            </div>
        `
        
        listOfAmiibo += amiiboCard;
    };

    amiiboDiv.innerHTML = listOfAmiibo;
};

const findAmiibo = async() => {
    const keywordInput = document.getElementById('keyword-input').value;
    let allAmiibo = await getAmiibo(keywordInput);
    let filter = document.getElementById('filter').value;

    /*console.log(filter);*/

    /*console.log('Filtered Amiibo result:');*/
    const filteredAmiibo = allAmiibo.amiibo.filter(amiibo => {
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
    if (filteredAmiibo.length == 0) {
        console.log('Oops! No result');
        const noResult = `<p id="no-result">Sorry, no result. Please try another keyword.</p>`
        amiiboDiv.innerHTML = noResult;
    } else {
        displayAmiibo(filteredAmiibo);
    };
};
