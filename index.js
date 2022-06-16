const express=require('express')
const dotenv = require('dotenv')
const app=express()
const mongoose=require ('mongoose')
const model=require('./schema')
const PORT = process.env.PORT || 5000

dotenv.config()

app.use(express.json());


mongoose
.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
})
.then(() => console.log("DB Connected..!"))
.catch(err => console.log(err))

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
// app.listen(5000);

// app.use('/', req, res => {
//     res.send(`Server is up and running on port ${PORT}`)
// })

app.listen(process.env.PORT, () => console.log(`Server is up and listening to the ${PORT}`))
app.get('/', (req, res) => res.send("Hello world"))