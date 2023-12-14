
const mongoose = require('mongoose');

//mongoose connect korar time e jemon ekta method chilo mongoose.conect()
//mongoose schema use korar o ekta method ache: mongoose.Schema()
//() er moddhei ekta Schema dibo akta simple object akare.
const todoSchema= mongoose.Schema({
    title:{
//this shows he schema. 
//1st field hobe title, seta hobe string type, 
//require: true  means must input ditei hobe eita. optional na.
// evabei pura structure banano.
        type: String,
        require: true,
    },
    description: String,
    status:{
        type: String,
        enum: ['active', 'inactive']
    },
    date:{
        type: Date,
        default: Date.now,
    }
});

// //instance methods
// todoSchema.methods = {
//     findActive: function(){
//         return mongoose.model("Todo").find({status:"active"});
//     },
// //this does not work because, Model.find() no longer accepts a callback at Function
//     findActiveCallback: function(cb){
//         return mongoose.model("Todo").find({status:"active"},cb);
//     },
// };


// //static methods
// todoSchema.static = {
//     findByJs: function(){
//         return this.find({title: /js/i });
//     }
// }

module.exports = todoSchema;