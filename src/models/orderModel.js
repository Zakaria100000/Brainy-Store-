const { model, Schema } = require('mongoose')

const OrderModel = new Schema({

    num: {
        type: String,
        required: true
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client' // Client Model's reference
    },
    items: [{
        item: {
           type: Schema.Types.ObjectId,
          
           ref: 'Item' // Article Model's reference
        },
        nbrOfItems: Number,
        reference: String,
        designation: String,
        unitPrice: Number,
        totalPrice: Number // Unit Price x nbrOfItems
    }],

    payment: {
        type: Number,
    },
    status: {
        type: String,
        required: true
    },
    totalprice: {   
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }

});

module.exports = model('Order', OrderModel, 'orders');
