const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
},
{
    timestamps: true
}
)



const Category = mongoose.model('Category', categorySchema)
module.exports = Category;