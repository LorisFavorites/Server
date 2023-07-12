const axios = require('axios');
const db = require('../config/connection');
const { Inventory, Card } = require('../models');
const cards = [];

/**
 * TODO: This is a static return of an API call, eventually this should become a proper call to
 * https://api.pokemontcg.io/v2/cards 
 * scheduled by the server once per day.
 */

db.once('open', async () => {
    try {
        const response = await axios.get("https://api.pokemontcg.io/v2/cards");

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

        // Create new cards
        const newCards = await Card.create(cards);

        // Create items array
        const items = [];

        // newCards.forEach((card) => {
        //     let num = Math.floor(Math.random() * 100);
        //     items.push({ itemId: card._id, stock: num });
        // });

        for (let i = 0; i < 55; i++) {
            let num = Math.floor(Math.random() * 100);
            items.push({ itemId: newCards[0]._id, stock: num });
        }
        
        // Update the inventory with the new cards
        await Inventory.findOneAndUpdate({ name: "pokecards" }, { $set: { cards: items } }, { upsert: true });
        
        // const sorted = await Inventory.
        //     find({ name: 'pokecards'})
        //     .populate(
        //         { 
        //             path: 'cards.itemId',
        //             options: { sort: {'cardmarket.prices.averageSellPrice': -1 } } 
        //         })

        // console.log('%j', sorted[0].cards);
        // console.log(sorted[0].cards);

        console.log('Data pull complete!');
        process.exit(0);
    } catch (err) {
        throw err;
    }
});