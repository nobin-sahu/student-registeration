const express=require("express");
const app =express();
const port= process.env.port || 8000;
const path=require("path");
const hbs=require("hbs");

// to build a connection with mongodb
require("./db/connection.js");

// console.log(__dirname);
// to get the paths
const static_path=path.join(__dirname,"../public");
const view_path=path.join(__dirname,"../templates/views");
const partial_path=path.join(__dirname,"../templates/partials");


app.use(express.static(static_path)); // public folder
app.set("views",view_path);           // views path
app.set("view engine","hbs");        //  template engine hbs
hbs.registerPartials(partial_path);  // partials


app.use(express.json());             // because we are getting data in json format 
app.use(express.urlencoded({extended:false}));  // because we are getting data from form submit 
// in case of postman there is no need to write above line

// Import route files
const getRoutes = require("./routing/getroute.js");
const postRoutes = require("./routing/postroute.js");

// Use routes
app.use("/",postRoutes);
app.use("/",getRoutes);


// // routings
// app.get("/",(req,res)=>{
//     res.render("index");
// })
// app.get("/register",(req,res)=>{
//     res.render("register");
// });

// app.get("/login",(req,res)=>{
//     res.render("login");
// });

// let password,cpassword,admission,name,phone,course,gender,email;
// app.post("/register",async(req,res)=>{
//     try{
//          password=req.body.password;
//          cpassword=req.body.cpassword;
//          admission=toLowerCase(req.body.admission);
//          name=toLowerCase(req.body.name);
//          phone=req.body.phone;
//          course=req.body.course;
//          gender=req.body.gender;
//          email=toLowerCase(req.body.email);

//         if(!validateEmail(email))
//         {
//              res.status(400).render("error",{
//             message:"Email is invalid"
//             })
//         } 
//         else if(!validatePassword(password)){
//             res.status(400).render("error",{
//             message:"Password is invalid (Please check the Constraint)"
//             })
//         }
//         else if(password!==cpassword)
//         {
//             res.status(400).render("error",{
//             message:"Password is not matching "
//             }  )
//         } 
//         else{
//             res.render("submitted",{admission,name,phone,course,gender,email});
//         }
        
//     }
//     catch(err){
//         res.status(400).send(err);
//     }
// })

// app.post("/submitdata",async (req,res)=>{
//     try{
//         const data=new stu_schema({
//                 admission,
//                 name,
//                 phone,
//                 course,
//                 gender,
//                 email,
//                 password
//             });
//             const register_student=await data.save();
//             res.status(201).render("index");
//     }
//     catch(err){

//         // Get an array of all the keys of the object
//         const keys = Object.keys(err.keyValue);
//         // Access the first key from the array
//         const key = keys[0];
//         let message;
//         if(key=="admission"){
//             message="admission no already exist";
//         }
//         else if(key=="phone"){
//              message="Phone no already exist";
//         }
//         else if(key=="email"){
//             message="Email id already exist";
//         }

//         res.status(400).render("error1",{
//             message
//         });
//     }
// })

// app.post("/logininfo",async(req,res)=>{
//     try{
//          password=req.body.password;
//          admission=toLowerCase(req.body.admission);
//          const data=await stu_schema.findOne({admission,password});
//          if(data===null){
//                 res.status(400).render("error",{
//                     message:"Invalid Credentials"
//                 })
//          }
//          else
//          {
//             const name=data.name;
//             res.status(201).render("dashboard",{
//                 name,admission
//             });
//          }
         
//     }
//     catch(err){
//         res.status(400).send(err);
//     }
// })

app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})