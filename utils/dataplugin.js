const axios = require('axios');
const db = require('../config/connection');
const { Profile, Inventory, Card } = require('../models');
const cards = [];

/**
 * TODO: This is a static return of an API call, eventually this should become a proper call to
 * https://api.pokemontcg.io/v2/cards 
 * scheduled by the server once per day.
 */

db.once('open', async () => {
    try {
        const response = await axios.get("https://api.pokemontcg.io/v2/cards");
        // const response = require('../seeds/card_data.json');

        response.data.data.forEach(card => {
            const { id, name, flavorText, images, cardmarket } = card;
            
            // make sure cardmarket data is present
            if (cardmarket) {
                // Parse relevent CM data.
                const cm = {
                url: cardmarket.url,
                updatedAt: cardmarket.updatedAt, 
                prices: {
                    averageSellPrice: cardmarket.prices.averageSellPrice,
                    lowPrice: cardmarket.prices.lowPrice,
                    trendPrice: cardmarket.prices.trendPrice
                    }
                };
                // Add object to array.
                cards.push({ id, name, flavorText, images, cardmarket: cm });
            }
        });

        await Card.create(cards);

        console.log('Data pull complete!');
        process.exit(0);
    } catch (err) {
        throw err;
    }
});