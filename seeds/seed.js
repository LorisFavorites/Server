const db = require('../config/connection');
const { Profile, Inventory, Card } = require('../models');
const profileSeeds = require('./profileSeeds.json');
const cardSeeds = require('./cardSeeds.json');

db.once('open', async () => {
    try {
        await Profile.deleteMany({});
        await Inventory.deleteMany({});
        await Card.deleteMany({});
        
        const profiles = await Profile.create(profileSeeds);
        const cards = await Card.create(cardSeeds);
        
        // const inventory = [{ _id: cards[0]._id, 'stock': 0 }, { _id: cards[1]._id, 'stock': 1 }];

        const inventory = await Inventory.create({});
        console.log("Profiles created: ", profiles)
        console.log("Cards created: ", cards);
        console.log("Inventory created: ", inventory);
        await Inventory.findOneAndUpdate({ _id: inventory._id }, { $push: { cards: cards } });
        await Profile.findOneAndUpdate({ _id: profiles[0]._id }, { $push: { favorites: cards } });

        // console.table(users);
        console.log('Seeding complete!');
        process.exit(0);
    } catch (err) {
        throw err;
    }
});