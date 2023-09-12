const ExpenseSchema = require('../models/expense.model');

exports.addExpense = async (req,res) => {
    const { title, amount, category, description, date} = req.body;
    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    });
    try {
        if(!title || !category || !date || !description){
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if(amount <= 0 || !amount === 'number'){
            console.log(amount);
            return res.status(400).json({ message: 'Amount must be a positive Integer'} );
        }
        await expense.save();
        res.status(200).json({ message: 'Expense Added!'} );
    } catch (error) {
        res.status(500).json({message: error});
    }
};


exports.getExpense = async (req,res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({createdAt: -1});
        return res.status(200).json(expenses);
    } catch (error) {
        return res.status(500).json({ message: error} );
    }
};

exports.deleteExpense = async (req,res) => {
    const { id } = req.params;
    ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
        res.sendStatus(200);
    })
    .catch((err) => {
        res.sendStatus(500);
    });
}