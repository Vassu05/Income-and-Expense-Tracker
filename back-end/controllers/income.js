const IncomeSchema = require('../models/income.model');

exports.addIncome = async (req,res) => {
    const { title, amount, category, description, date} = req.body;
    const income = IncomeSchema({
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
        await income.save();
        res.status(200).json({ message: 'Income Added!'} );
    } catch (error) {
        res.status(500).json({message: error});
    }
};


exports.getIncome = async (req,res) => {
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        return res.status(200).json(incomes);
    } catch (error) {
        return res.status(500).json({ message: error} );
    }
};

exports.deleteIncome = async (req,res) => {
    const { id } = req.params;
    IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
        res.sendStatus(200);
    })
    .catch((err) => {
        res.sendStatus(500);
    });
}