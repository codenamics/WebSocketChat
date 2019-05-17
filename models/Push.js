const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PushSchema = new Schema({
    endpoint: {
        type: String,
    },
    keys: {
        p256dh: {
            type: String
        },
        auth: {
            type: String
        },
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Push = mongoose.model('push', PushSchema)