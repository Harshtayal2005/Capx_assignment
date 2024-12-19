const express=require('express')
const router=express.Router()
const {createstock,updatestock,deletestock,getallstock}=require('../controllers/authcontroller')

router.get("/",function(req,res){
    res.send("hey its working");
});

router.post("/add",createstock);
router.put("/:postId",updatestock);
router.delete("/delete/:postId",deletestock);
router.get("/getallstocks",getallstock);

module.exports=router;
