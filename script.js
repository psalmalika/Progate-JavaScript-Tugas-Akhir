const getAmiibo = async (keyword, filter) => {
    try {
        const response = await fetch(`https://amiiboapi.com/api/amiibo/`, {
            method: "GET"
        });
        const amiiboList = await response.json();
        console.log(amiiboList);
        return amiiboList;
    } catch (error) {
        console.log(`Error! This is why: ${error}`);
        return;
    };
};

const findAmiibo = async() => {
    const keywordInput = document.getElementById('keyword-input').value;
    let allAmiibo = await getAmiibo();
    console.log('Filtered Amiibo result:');
    const filteredAmiibo = allAmiibo.filter(amiibo => {
            return amiibo.character.includes(keywordInput);
        });
    console.log(filteredAmiibo);
}