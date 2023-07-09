const { Schema, model } = require('mongoose');
const Card = require('./Card');

const inventorySchema = new Schema(
    {
        cards: [
            {   
                type: Schema.Types.ObjectId,
                ref: 'Card',
                stock: {
                    type: Number,
                    default: 0,
                },
            }
        ]
    },
    {
        toJSON: {
            getters: true
        },
        id: true,
    }
);

// Create a virtual called cardCount that retrieves the amount of cards in the inventory field on query.
inventorySchema.virtual('cardCount').get(function () {
    return this.cards.length;
});

// Initialize Inventory model
const Inventory = model('Inventory', inventorySchema);

module.exports = Inventory;