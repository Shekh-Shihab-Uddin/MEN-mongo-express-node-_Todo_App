const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routeHandler/todoHandler');

const app = express();
//used express.json(), jate je API response ashbe segulo ke Json akare pai
app.use(express.json());



//connecting to DB with mongoose
//er moddhe db url deoya = setar nam "Connection String"
//mongodb= connect to mongoDB, localhost= our host, todos= DB name(age theke thakar dorkar nai, runtime e create hoye jabe)
mongoose
    .connect('mongodb://localhost/todos',
//na dileo oka chilo. warning dey nai
        {useNewUrlParser: true,
        useUnifiedTopology: true,
        }
    )
    .then(()=> console.log('connection successful'))
    .catch((err)=> console.log(err))
// ei porjonto amader mongoDB er sathe connection hoye gelo


//routes declaration and doing different works with the help of them
app.use('/todo', todoHandler);


//default erro handler
function errorHandler(err,req,res,next){
    if(res.headersSent){
        return next(err);
    }
    res.status(500).json({error: err});
}

app.listen(3000,()=>{
    console.log("app is listening at port: 3000");
})