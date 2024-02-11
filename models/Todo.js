const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required : true
    },
    status : {
        type: String,
        required: true,
        enum: ['to-do', 'in-progress', 'done'],
        default: 'to-do',
    },
    tags: {
        type: [String]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users',
    },
}, { timestamps: true })

const todos = mongoose.model('Todos', TodoSchema);

module.exports = todos