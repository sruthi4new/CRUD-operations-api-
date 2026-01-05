import mongoose from'mongoose'

async function dbConnection(){
 await mongoose.connect("mongodb://localhost:27017//test")
 const schema  = mongoose.Schema({
  name:String,
  age:Number,
  email:String
 })

 const studentsModel = mongoose.model('students',schema);
 const result = studentsModel.find();
  console.log(result);
  
}

dbConnection();