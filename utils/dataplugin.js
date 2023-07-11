const axios = require('axios');
const db = require('../config/connection');
const { Profile, Inventory, Card } = require('../models');
const profileSeeds = require('./profileSeeds.json');
const cardSeeds = require('./cardSeeds.json');

server.executeOperation({
            Mutation: {
            // Backend only function
            propogateCards: async (parent) => {
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
            }
    }
});

db.once('open', async () => {
    try {
        
        const response = require('../seeds/card_data.json');
        response.data.forEach(card => {
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
        
        // console.table(users);
        console.log('Data pull complete!');
        process.exit(0);
    } catch (err) {
        throw err;
    }
});