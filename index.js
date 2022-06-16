const express=require('express')
const app=express()
const mongoose=require ('mongoose')
const model=require('./schema')

app.use(express.json());
let dburl="mongodb+srv://Ramya:Admin123@cluster0.2jync.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(dburl)
.then(res=>console.log('server connected  with db'))
.catch(res=>console.log('server not connected with db'));
app.get('/grocs',async(req,res)=>{
    try
    {
        const result=await model.find()
        res.send(result)
        
    }
    catch(error){
        console.log(error);
    }

})
app.post('/grocs',async(req,res)=>{
   
    try{
        const result=await model.create(req.body)
    res.json({
        message:'inserted ',
        // data:result
    })
}
catch(error){
    console.log(error);
}
})
app.get('/search/:name',async(req,res)=>{
    
    try{
        const result=await model.findOne({name:req.params.name})
        if(result){
            res.json({
                message:'displaying matched record',
                // data:result
            })
            res.json({
                message:'record not found',
             
            })
        }
    }
    catch(error){
        console.log(error);
    }
})

app.put('/update/:age',async(req,res)=>{
    
    try{
        const result=await model.findOne({age:parseInt(req.params.age)})
        if(result){
            const result=await model.updateOne({age :parseInt(req.params.age)},{$set:{name:req.body.name}})
            res.json({
                message:'displaying matched record',
              
            })
        }
        else{
            res.json({
                message:'record not found',
             
            })
        }
    }
    catch(error){
        console.log(error);
    }
})
app.delete('/delete/:name',async(req,res)=>{
    
    try{
        const result=await model.findOne({name:(req.params.name)})
        
        if(result){
            const result=await model.deleteOne({name :(req.params.name)})
            res.json({
                message:'record deleted',
              
            })
        }
        else{
            res.json({
                message:'record not found',
             
            })
        }
    }
    catch(error){
        console.log(error);
    }
})
app.listen(5000);