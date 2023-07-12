const cron = require("node-cron");
const cards = []

const fetchData = async () => {
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

    } catch (error) {
      console.error("Error fetching data:", error);
    }
};

exports.initScheduledJobs = () => {
    const scheduledFunction = cron.schedule('* * * * *', async () => {
        console.log('Running scheduled task');
        await fetchData();
        console.log(result);
    });

    scheduledFunction.start();
};