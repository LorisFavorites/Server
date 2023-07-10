const { Schema, model } = require('mongoose');
const itemSchema = require('./Item');

const inventorySchema = new Schema(
    {
        name: {
            type: String,
            unique: true
        },
        cards: [itemSchema]
    },
    {
        toJSON: {
            getters: true
        },
        id: false,
    }
);

// Create a virtual called cardCount that retrieves the amount of cards in the inventory field on query.
inventorySchema.virtual('cardCount').get(function () {
    return this.cards.length;
});

// Initialize Inventory model
const Inventory = model('Inventory', inventorySchema);

module.exports = Inventory;