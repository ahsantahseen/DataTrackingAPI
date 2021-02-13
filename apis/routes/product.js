const express=require('express');
const router=express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'Handling GET requests to /products'
    })
})  
router.post('/',(req,res,next)=>{
    res.status(201).json({
        message:'Handling POST requests to /products'
    })
})  

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message:'Handling POST requests to /products'
    })
})  
router.get('/:productID',(req,res,next)=>{
    const id=req.params.productID;
    if(id==='special'){
    res.status(200).json({
        message:'DISCOVERED SPECIAL'
    });
}
    else{
        res.status(200).json({
            message:'NOT SO SPECIAL!'
        });
    }
})  
router.patch('/:productID',(req,res,next)=>{
    res.status(200).json({
        message:'PATCH REQUEST! UPDATED PRODUCT'
    });
})  

router.delete('/:productID',(req,res,next)=>{
    res.status(200).json({
        message:'DELETE REQUEST! DELETED PRODUCT'
    });
})
module.exports=router;