/**
 * TODO: This is a static return of an API call, eventually this should become a proper call to
 * https://api.pokemontcg.io/v2/cards 
 * scheduled by the server once per day.
 */
const data = require('../seeds/cardSeeds.json');
const axios = require('axios');

const cards = []

module.exports = fetchData = async () => {
    try {
        const response = await axios.get("https://api.pokemontcg.io/v2/cards");
      
        response.data.forEach(card => {
            const { id, name, flavorText, images, cardmarket } = card;
            if ((id, name, flavorText, images) && cardmarket) {
                cards.push({ id, name, flavorText, images, cardmarket });
            }
        });
        
        console.log("Data fetched from API: ", cards[0]);
        // return(response.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
};

// module.exports = fetchData;