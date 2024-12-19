const express=require('express');
const stock_model=require('../models/stock-model');


exports.createstock=async (req,res)=>{
    let {stockname,ticker,quantity, price}=req.body;
    console.log(stockname,ticker,quantity, price);
    let em=await stock_model.findOne({stockname});
    if(em) return res.status(404).json({message:"same user details are already exist"});

    try{
        let stock=await stock_model.create({
          stockname,
          ticker,
          quantity,
          price,
        })
        return res.status(200).json(stock);
    }
    catch(err){
        return res.status(400).json({message:err.message});
    }
}

exports.getallstock=async (req,res)=>{
    try{
        const stock = await stock_model.find();
        return res.json({stock});
    }
    catch(err){
        return res.json(err.message);
    }
}

exports.updatestock= async (req, res) => {
    const { postId } = req.params;
    const {stockname,ticker,quantity, price}=req.body;
    try {
      const updatedcont = await stock_model.findByIdAndUpdate(postId, {stockname,ticker,quantity, price}, { new: true });
      return res.status(200).json(updatedcont);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating post', error });
    }
  };


exports.deletestock= async (req, res) => {
    const { postId } = req.params;
  try {
    const deletedcontact = await stock_model.findByIdAndDelete(postId);
    
    if (!deletedcontact) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully', post: deletedcontact });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error });
  }
  };

  