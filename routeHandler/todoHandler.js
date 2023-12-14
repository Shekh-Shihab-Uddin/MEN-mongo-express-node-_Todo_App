const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");

//eta akta class return kore tai akta new return korte hocche
//ekta model design korchi created and imported schema ke use kore
const Todo = new mongoose.model("Todo", todoSchema);
//1st parameter model er nam. Capital and singular e dite hobe. karon setar sese s lagiye etar akta collection DB te create hobe auto
//2nd parameter kon schema ke follow korbo seta. jeta amra import korechi seta
//evabei ekta schema baniye tar upor base korei akta object data mapping banabo

//Get All the todos
router.get("/", async (req, res) => {
  try {
    const data = await Todo.find({})
      .select({ _id: 0 }) //It means that only specific fields will be included in the results, and _id will be excluded from the output. The value 0 means exclusion.
      .limit(2);
    res.status(200).json({
      result: data,
    });
  } catch (err) {
    res.status(500).json({
      error: "there was server side error",
    });
  }
});

//These are the parts of the "instance method" and "static method" er tutorial.
//Get active todos
// router.get("/active",async(req,res)=>{
//     const todo = new Todo();
//     const data = await todo.findActive();
//     res.status(200).json({
//         data,
//     });
// });

// //Get active todos
// router.get("/active-callback",(req,res)=>{
//     const todo = new Todo();
//     todo.findActiveCallback((err,data)=>{
//         res.status(200).json({
//             data,
//         });
//     });
// });
//this does not work because, Model.find() no longer accepts a callback at Function

//get todos by a language
// router.get("/js", async(req,res)=>{
//     const data = await Todo.findByJs();
//     res.status(200).json({
//         data,
//     });
// });
// till now These are the parts of the "instance method" er tutorial.

//get a single todo
router.get("/:id", async (req, res) => {
  try {
    const data = await Todo.find({ _id: req.params.id });
    res.status(200).json({
      result: data,
    });
  } catch (err) {
    res.status(500).json({
      error: "there was server side error",
    });
  }
});

//post a single todo
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save({});
    res.status(200).json({
      message: "Todo inserted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "there was server side error",
    });
  }
});

//post multiple todos
router.post("/all", async (req, res) => {
  try {
    const newTodo = await Todo.insertMany(req.body);
    res.status(200).json({
      message: "Todo inserted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

//update todo
//but updateOne()/updateMany() do not show the updated values in the console or in the response
// for this we need to use findByIdAndUpdate(). which we did in the next middlewire.
// router.put('/:id', async(req,res)=>{
//     try{
//         const updatedTdo = await Todo.updateOne({_id: req.params.id},
//             {
//                 $set:{
//                     status: "active"
//                 }
//             },
//         );
//         res.status(200).json({
//             message: "Todo updated successfully",
//             data: updatedTdo,
//         })
//     }catch(err){
//         console.log(err);
//         res.status(500).json({message: "An error has occured"})
//     }
// })

//its the process of updateMany()
// router.put('/all', async(req,res)=>{
//     try{

//         const condition = req.body.condition;
//         const update = req.body.update;
//         const updatedTdo = await Todo.updateMany(condition,update);
//         res.status(200).json({
//             message: "Todos updated successfully",
//             data: updatedTdo,
//         })
//     }catch(err){
//         console.log(err);
//         res.status(500).json({message: "An error has occured"})
//     }
// })

//the body in the postman will be like this;
// {
//     "condition":{"status":"inactive"},
//     "update": {"status":"active"}
// }
// othoba ekhaneo etar bodole
//await Todo.updateMany(condition,update);
//evabe filtering condition and update ki hobe ta dite pari
//await Todo.updateMany({status:"active"},{status:"inactive"});

//its process is same as updateOne(). just had to give extra one parameter. which is also an obhect
router.put("/:id", async (req, res) => {
  try {
    const updatedTdo = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      //{
      // this is if want to change parameter hardcodedly here.
      // $set:{
      //     status: "inactive"
      // }
      //},
      //if want to take the update from Todo
      req.body,
      //and need to send the key pair in object that property we want to update
      {
        new: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json({
      message: "Todo updated successfully",
      data: updatedTdo,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error has occured" });
  }
});

//delete todo
router.delete("/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndRemove({ _id: req.params.id });
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({
      message: "Todos updated successfully",
      data: deletedTodo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

//delete multiple todo
router.delete("/all", async (req, res) => {
  try {
    const deletedTodo = await Todo.deleteMany(req.body.condition);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({
      message: "Todos updated successfully",
      data: deletedTodo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
