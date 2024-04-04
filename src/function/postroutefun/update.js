// supporting functions 
const {validateEmail,validatePassword}=require("../validationfun.js");
const {toLowerCase}=require("../stringfun.js");

// mongodb schema 
const stu_schema=require("../../models/s_schema.js");

// for hashing to store the password in database 
const bcrypt=require("bcryptjs");

let password,cpassword,admission,name,phone,course,gender,email;

async function updatelogin(req,res){
    try{
         password=req.body.password;
         admission=toLowerCase(req.body.admission);
         const data=await stu_schema.findOne({admission});
         if(data===null){
                res.status(400).render("error",{
                message:"User Donot exits"
            })
         }
         else
         {
            // to check whether entered password is correct or not  
            const storedhashpass=data.password;
            const flag= await bcrypt.compareSync(password,storedhashpass);

            if(flag===false){
                res.status(400).render("error",{
                    message:"Invalid credentials"
                })
            }
            else
            {
                name=data.name;
                phone=data.phone;
                course=data.course;
                gender=data.gender;
                email=data.email;
                password=data.password;
                res.status(201).render("updatedata");
            }
         }
    }
    catch(err){
        res.status(400).send(err);
    }
}

async function updatedata(req,res){
    
    try{
         const u_pass=req.body.password;
         const u_name=toLowerCase(req.body.name);
         const u_phone=req.body.phone;
         const u_course=req.body.course;
         const u_gender=req.body.gender;
         const u_email=toLowerCase(req.body.email);

        if(u_email!=="" && !validateEmail(u_email))
        {
             res.status(400).render("error",{
            message:"Email is invalid"
            })
        } 
        else if(u_pass!=="" && !validatePassword(u_pass)){
            res.status(400).render("error",{
            message:"Password is invalid (Please check the Constraint)"
            })
        }
        else {
                if(u_pass!=="") 
                {
                    // we are updating hashpassword in the database
                    password=await bcrypt.hashSync(u_pass,10);
                }    
                if(u_name!=="")name=u_name;
                if(u_phone!=="")phone=u_phone;
                if(u_course!=="")course=u_course;
                if(u_gender!=="")gender=u_gender;
                if(u_email!=="")email=u_email;
                
               res.render("updatedsubmitdata",{admission,name,phone,course,gender,email});
        }
    
    }
    catch(err){
        res.status(400).send(err);
    }
}

async function updatedsubmitdata(req,res){
    try{
        const data=await stu_schema.updateOne({admission},{$set:{name,phone,course,gender,email,password}});
        res.render("updatedsuccessful");
    }
    catch(err){
        res.status(400).send(err);
    }
}

module.exports={updatelogin,updatedata,updatedsubmitdata};