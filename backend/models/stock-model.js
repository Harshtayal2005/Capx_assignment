const mongoose=require('mongoose');

const stocksSchema=mongoose.Schema({
    stockname: String,
    ticker: String,
    quantity: Number,
    price: Number
});

module.exports=mongoose.model('stocks',stocksSchema);