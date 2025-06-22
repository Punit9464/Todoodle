const { Schema, model } = require("mongoose");
const { randomUUID } = require('crypto')

const todoSchema = new Schema({
    id: {
        type: String,
        unique: true,
        default: randomUUID()
    },
    task: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: () => new Date().toISOString().slice(0, 10)
    },
    isDone: {
        type: Boolean,
        default: false
    }
}, { id: false });

module.exports = model('todo', todoSchema);