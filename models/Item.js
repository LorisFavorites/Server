const { Schema, Types } = require('mongoose');

const itemSchema = new Schema(
    {
        itemId: {
            type: Schema.Types.ObjectId,
            ref: 'Card',
            default: () => new Types.ObjectId()
        },
        stock: {
            type: Number,
            default: 0
        }
    },
    {
        toJSON: {
            getters: true,
        },
        _id: false,
    }
);