const mongoose = require('mongoose'),
       autoId = require('mongoose-auto-increment');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required : true
    },
    description: {
        type: String,
        required : false
    },
    price: {
        type: Number
    },
    discountPercentage: {
        type: Number
    },
    rating: {
        type: Number
    },
    stock: {
        type: Number
    },
    brand: {
        type: String
    },
    category: {
        type: String
    },
    thumbnail: {
        type: String
    },
    images: {
        type: [String]
    },
    // quantity: {
    //     type: Number
    // },
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
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'Users',
    // },
}, { timestamps: true })

autoId.initialize(mongoose.connection);
TodoSchema.plugin(autoId.plugin, 'todos');

const todos = mongoose.model('Todos', TodoSchema);

module.exports = todos
