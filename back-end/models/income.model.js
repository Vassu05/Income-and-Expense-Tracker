const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IncomeSchema = new Schema({
    title: {
        type: String,
        required: true,
        trime: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 20
    },
    type: {
        type: String,
        default: 'income'
    },
    date: {
        type: Date,
        required: true,
        trim: true
    }
    ,category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Income', IncomeSchema);