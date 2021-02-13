const express=require('express');
const router=express.Router();

router.get('/',(req,res,next)=>{
res.status(200).json({
    message:'GET REQ OF ORDERS'
})
});

router.post('/',(req,res,next)=>{
    res.status(201).json({
        message:'POST REQ OF ORDERS'
    })
});
router.get('/:orderID',(req,res,next)=>{
    const id=req.params.orderID;

    res.status(200).json({
        message:'Details of order',
        id:id
    });

})
router.delete('/:orderID',(req,res,next)=>{
    const id=req.params.orderID;
    res.status(200).json({
        message:'Order Deleted',
        id:id
    });
})  
module.exports=router;