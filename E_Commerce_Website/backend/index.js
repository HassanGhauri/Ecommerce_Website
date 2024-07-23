const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const path = require('path');
const { type } = require('os');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());
app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
});

// Api Creation

// Image Storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//Creating Upload Endpoint for images

app.use('/images',express.static('upload/images'))


app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${process.env.PORT}/images/${req.file.filename}`
    } )
})


const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    new_price:{
        type: Number,
        required:true
    },
    old_price:{
        type: Number,
        required:true
    },
    date:{
        type: Date,
        default:Date.now()
    },
    available:{
        type: Boolean,
        default: true
    }
})

app.post('/addproduct',async (req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:1,
        name:req.body.name,
    })
})

app.post('/removeproduct', async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:1,
        name:req.body.name
    })    
})

//Creating API for getting all products
app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})






mongoose.connect(process.env.MongoDB_Url)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log(`Connected to DB and listening to port ${process.env.PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    })
