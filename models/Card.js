const { Schema, model } = require('mongoose');

/*
 !! The card is schema only, and will not be used as a model.
 it will be used as the card field's subdocment schema in the Inventory model.
*/
const cardSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
            maxlength: 280,
        },
        flavorText: {
            type: String
        },
        images: {
            small: {
                type: String
            },
            large: {
                type:String
            },
        },
        cardMarket: {
            url: {
                type: String
            },
            updatedAt: {
                type: String
            },
            prices: {
                averageSellPrice: {
                    type: Number
                },
                lowPrice: {
                    type: Number
                },
                trendPrice: {
                    type: Number
                }
            }
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