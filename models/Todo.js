const mongoose = require('mongoose'),
       autoId = require('mongoose-auto-increment');

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
            // sub schema
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

autoId.initialize(mongoose.connection);
TodoSchema.plugin(autoId.plugin, 'todos');

const todos = mongoose.model('Todos', TodoSchema);

module.exports = todos