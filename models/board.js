const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    url : {
        type: String,
        required: true
    },
    title : {
        type: String,
        required: true
    },
    artist : String,
    apiID :  String,
}, {
    timestamps: true
})

const boardSchema = new Schema({
    items : [itemSchema],
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order : { type: Number }
}, {
    timestamps: true
})

module.exports = mongoose.model('Board', boardSchema)