const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const path = require('path');
const { type } = require('os');
const { error } = require('console');
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

//Schema creating for user model
const Users = mongoose.model('Users',{
    name:{
        type: String
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String
    },
    cartData:{
        type: Object,
    },
    date:{
        type:Date,
        default: Date.now()
    }
})

// Creating Endpoint for registering the user
app.post('/signup', async(req,res)=>{
    let check = await Users.findOne({email:req.body.email})
    if(check){
        return res.json({success:false,errors:"existing user found with same email address"})
    }
    let cart = {};
    for(let i = 0; i < 300; i++){
        cart[i] = 0;
    }
    const user = new Users({
        name:req.body.username,
        email: req.body.email,
        password:req.body.password,
        cartData:cart
    })
    await user.save();
    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})

// Creating endpoint for user login
app.post('/login',async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"Wrong Password"});
        }
    }
    else{
        res.json({success:false,errors:"Wrong Email Id"})
    }
})

// creating endpoint for newcollection data
app.get('/newcollections',async(req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})

// creating endpoint for popular in youth data
app.get('/popularinyouth',async(req,res)=>{
    let products = await Product.find({category:"clothing"});
    let popular_in_youth = products.slice(0,4);
    console.log("Popular in Youth fetched");
    res.send(popular_in_youth);
})

// creating middleware to fetch user
const fetchUser = async(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.send({errors:"Please authenticate using valid token"});
    }
    else{
        try{

            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        } catch(error){
            res.send({errors:"please authenticate using a valid token"});
        }
    }
}


// creating endpoint for adding products in cartdata
app.post('/addtocart',fetchUser,async(req,res)=>{
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added");

})

// creating endpoint to remove product from cart
app.post('/removefromcart',fetchUser,async(req,res)=>{
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed");

})

// creating endpoint to get cartdata
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);

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
