const Expense = require("../models/Expense");
const xlsx = require("xlsx");
//Add Expense
exports.addExpense = async (req, res) => {
    const userId = req.user?.id;
    
    try{
        const {icon, category, amount, date} = req.body;
    if (!category|| !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (error) {
    console.error("Add Expense Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

//Get All Expense
exports.getAllExpense = async(req,res) =>{
    const userId = req.user.id;
    try{
        const expense = await Expense.find({userId}).sort({date:-1});
        res.json(expense);
    } catch(error){
        res.status(500).json({message:"Server errror"});
    }
};

//deleteIncome
exports.deleteExpense = async(req,res) =>{
    // const userId = req.user.id;
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message:"Expense deleted Sucessfully."});
    } catch(error){
        res.status(500).json({messsage:"Server Error"});
    }
};

//download income data in excell sheet
exports.downloadExpenseExcel = async(req,res) =>{
    const userId = req.user.id;
    try{
        const expense = await Expense.find({userId}).sort({date:-1});
        //prepare data for excel
        const data = expense.map((item) => ({
            Category : item.category,
            Amount : item.amount,
            Date: item.date,
        }));
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb,"expense_details.xlsx");
        res.download("expense_details.xlsx");
    } catch(error){
        res.status(500).json({message:"Server Errro"});
    }
};


