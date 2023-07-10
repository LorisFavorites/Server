const { Schema, model } = require('mongoose');

/*
 !! The card is schema only, and will not be used as a model.
 it will be used as the card field's subdocment schema in the Inventory model.
*/
const cardSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 280,
        },
        imgUrl: {
            type: String,
            required: true,
            maxlength: 280,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            default: 0,
        },

    },
    {
        toJSON: {
            getters: true,
        },
    }
);

// Schema only, this does not have an instantiated model.
const Card = model('Card', cardSchema);

module.exports = Card;