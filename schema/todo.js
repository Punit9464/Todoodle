const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
    task: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: () => new Date().toISOString().slice(0, 10)
    },
    
});

module.exports = model('todo', todoSchema);