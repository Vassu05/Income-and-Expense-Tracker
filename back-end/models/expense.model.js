const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
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
        default: 'expense'
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

module.exports = mongoose.model('Expense', ExpenseSchema);