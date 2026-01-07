import express from 'express'
import multer from 'multer';
const app = express();

const storage = multer.diskStorage({
    destination:function(req,file,cd){
        cd(null,'upload')
    },
    filename:function(req,file,cd){
        cd(null,file.originalname)
    }
})


const upload = multer({storage})

app.get("/",(req,res)=>{
    res.send(`
        <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="myfile" />
        <button>upload file</button>
        </form>
        `)
})

app.post("/upload",upload.single('myfile'),(req,res)=>{
    res.send({
        message:"file uploaded",
        info:req.file
    })
})

app.listen(3000)