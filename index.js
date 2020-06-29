const express=require('express');
//const { response } = require('express');
const app=express();
const validation=require('./utils/taskschema');

app.use(express.json());

const dataBase=[
    {
        id:1,
        name:'pramod',
        age:20
    },
    {
        id:2,
        name:'manogna',
        age:24
    },
    {
        id:3,
        name:'Raghavendra',
        age:49
    },
    {
        id:4,
        name:'srilatha',
        age:43
    }
];

//GET Task

app.get('/api',function(req,res){
    try{
    res.send(dataBase);
    }catch(err)
    {
        console.log(err);
    }
});

//GET by ID each Task

app.get('/api/:id',function(req,res){
    try{
    const taskid=req.params.id;
  
    const task= dataBase.find(function(value) {
        return value.id==parseInt(taskid);
    });
   
    if(!task) return res.status(404).send("Requested data is not found");
    res.send(task);
    }catch(err)
    {
        console.log(err);
    }
});

//POST data

app.post('/api',function(req,res){
    const { error }=validation.validatetask(req.body);

    if(error)
        return  res.status(405).send('Required fields are missing');
    else{
        const data={
            id:dataBase.length+1,
            name:req.body.name,
            age:req.body.age
        }
        dataBase.push(data);
        res.status(201).send(data);
    }

});

//PUT(update) the data

app.put('/api/:id',function(req,res){
    const { error }=validation.validatetask(req.body);

    if(error)
      return res.status(405).send('Cannot update the values,Required fields are missing');
    
    const taskid=req.params.id;
    
    const task=dataBase.find((val) =>{
        return val.id===parseInt(taskid);
    })
    if(!task)
      return res.status(404).send("cannot find the data with given data to update");
    task.name=req.body.name;
    task.age=req.body.age;
    res.send(task);
});

// DELETE data

app.delete('/api/:id',function(req,res){
    const taskid=req.params.id;
    const task=dataBase.find((value) =>{
       return value.id===parseInt(taskid);
    })
    if(!task)
      return res.status(404).send("cannot find the entry to delete");
    const index=dataBase.indexOf(task);
    
    dataBase.splice(index,1);
    res.status(200).send(task);

});




const port=process.env.PORT || 8080;
app.listen(port, function(){
    console.log('listening on port....');
});
module.exports=app;
