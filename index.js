// import express from 'express'
// import userData from './users.json' with {type:'json'}
// const app = express();

// app.get("/",(req,res)=>{
//     console.log(userData);
    
//     res.send(userData)
// })
// app.get("/user/:id",(req,res)=>{
//     const id = req.params.id;
//     console.log(id);
//     let filterData = userData.filter((user)=>user.id==id)

//     res.send(filterData);
    
// })

// app.get("/userName/:name",(req,res)=>{
//     const name = req.params.name;
//     console.log(name);
//     let filterData = userData.filter((user)=>user.name.toLowerCase()==name.toLowerCase())

//     res.send(filterData);
    
// })

// app.listen(3200);

import { log } from 'console';
import express from 'express'
import { Agent } from 'http';
import { MongoClient, ObjectId } from 'mongodb';

const dbName = 'test'
const url = "mongodb://localhost:27017"
const client = new MongoClient(url)


const app = express()
app.use(express.urlencoded({extended:true}))
  app.use(express.json());

app.set("view engine",'ejs')
client.connect().then((connection)=>{
  const db = connection.db(dbName);  

//   app.get("/api",async (req,res)=>{
//     const collection = db.collection('students')
//     const students = await collection.find().toArray()
//     res.send(students)
//   })
//    app.get("/ui",async (req,res)=>{
//     const collection = db.collection('students')
//     const result= await collection.find().toArray()
//     res.render('student',{result})
//   })
//      app.get("/add",(req,res)=>{
//         res.render('add-student')
//   })
   /* CREATE API's */
    app.post("/api/students",async (req,res)=>{
    const collection = db.collection('students')
    // // console.log("collection data",collection);
    
    // const result = await collection.insertOne(req.body)
    // res.redirect("/ui")

    // // res.send({data:result,message:"success..."})
    // console.log("result....",result);
    // // return ({data:result,message:"success..."})
    const student = {
        name:req.body.name,
        age:Number(req.body.age),
        email:req.body.email
    };
    const result = await collection.insertOne(student);

    res.status(201).json({
        message:"student added",
        id: result.insertedId
    });
    
  })

  /* UPDATE API */

  app.put("/api/students/:id",async (req,res)=>{
    const collection = db.collection('students')

    const updateStudent ={
        name:req.body.name,
        age:Number(req.body.age),
        email:req.body.email
    };

    const result = await collection.updateOne(
        {_id: new ObjectId(req.params.id)},
        {$set: updateStudent}
    );

    if(result.matchedCount == 0){
        return res.status(404).json({
            message:"student not found"
        });
    }
    res.json({
        message:"student updated"
    });
  })

  /* READ API */
  app.get("/api/students",async (req,res)=>{
    const collection = db.collection('students')
    const students = await collection.find().toArray();
    res.json(students);
  })

  /* READ BY ID API */

  app.get("/api/students/:id",async (req,res)=>{
    const collection = db.collection('students');
    const student = await collection.findOne({
        _id: new ObjectId(req.params.id)
    });

    if(!student){
        return res.status(404).json({
            message:"student no found"
        });
    }
    res.json(student);
  })
/* DELETE API */
  app.delete("/api/students/:id",async (req,res)=>{
    const collection = db.collection('students');

    const result = await collection.deleteOne({
        _id: new ObjectId(req.params.id)
    });

    if(result.deletedCount == 0){
        return res.status(404).json({
            message: "student not found"
        });
    }

    res.json({
        message:"student deleted "
    });
  })

})

// app.set("view engine",'ejs')

// app.get("/",async (req,res)=>{
//         await client.connect()
//     const db = client.db(dbName)
//     const collection = db.collection('students')

//     const result = await collection.find().toArray()
//     console.log(result);
    
//     res.render('student',{result});
// })

app.listen(3200);
