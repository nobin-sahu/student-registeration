// supporting functions 
const {validateEmail,validatePassword}=require("../validationfun.js");
const {toLowerCase}=require("../stringfun.js");

// for hashing to store the password in database 
const bcrypt=require("bcryptjs");

// mongodb schema 
const stu_schema=require("../../models/s_schema.js");

let password,cpassword,admission,name,phone,course,gender,email;
async function register(req,res){
    try{
         password=req.body.password;
         cpassword=req.body.cpassword;
         admission=toLowerCase(req.body.admission);
         name=toLowerCase(req.body.name);
         phone=req.body.phone;
         course=req.body.course;
         gender=req.body.gender;
         email=toLowerCase(req.body.email);

        if(!validateEmail(email))
        {
             res.status(400).render("error",{
            message:"Email is invalid"
            })
        } 
        else if(!validatePassword(password)){
            res.status(400).render("error",{
            message:"Password is invalid (Please check the Constraint)"
            })
        }
        else if(password!==cpassword)
        {
            res.status(400).render("error",{
            message:"Password is not matching "
            }  )
        } 
        else{

            // we are storing hashpassword in the database
            password=await bcrypt.hashSync(password,10);

            res.render("submitted",{admission,name,phone,course,gender,email});
        }
        
    }
    catch(err){
        res.status(400).send(err);
    }
}

async function submitdata(req,res){
    try{
        const data=new stu_schema({
                admission,
                name,
                phone,
                course,
                gender,
                email,
                password
            });
            const register_student=await data.save();
            res.status(201).render("index");
    }
    catch(err){

        // Get an array of all the keys of the object
        const keys = Object.keys(err.keyValue);
        // Access the first key from the array
        const key = keys[0];
        let message;
        if(key=="admission"){
            message="admission no already exist";
        }
        else if(key=="phone"){
             message="Phone no already exist";
        }
        else if(key=="email"){
            message="Email id already exist";
        }

        res.status(400).render("error1",{
            message
        });
    }
}

module.exports={register,submitdata};