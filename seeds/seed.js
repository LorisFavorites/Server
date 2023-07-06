const db = require('../config/connection');
const { Profile } = require('../models');
const profileSeeds = require('./profileSeeds.json');

db.once('open', async () => {
    try {
        await Profile.deleteMany({});
        const users = await Profile.create(profileSeeds);

        // console.table(users);
        console.log('Seeding complete!');
        process.exit(0);
    } catch (err) {
        throw err;
    }
});