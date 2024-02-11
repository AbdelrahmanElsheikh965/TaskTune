const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
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
        type: [String],
        // validate: {
        //     validator: (tags) => tags.every( tag => tag.length <= 10 ),
        //     message: 'Tag min length validation failed'
        //   }
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users',
    },
}, { timestamps: true })

const todos = mongoose.model('Todos', TodoSchema);

module.exports = todos