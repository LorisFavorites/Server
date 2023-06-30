const mongoose = require('mongoose');
/**
 * TODO: Is this the database name we want?
 */
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pokedexDB',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

module.exports = mongoose.connection;