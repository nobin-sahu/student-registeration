// supporting functions 
const {validateEmail,validatePassword}=require("../validationfun.js");
const {toLowerCase}=require("../stringfun.js");

// mongodb schema 
const stu_schema=require("../../models/s_schema.js");


let password,cpassword,admission,name,phone,course,gender,email;

async function updatelogin(req,res){
    try{
         password=req.body.password;
         admission=toLowerCase(req.body.admission);
         const data=await stu_schema.findOne({admission,password});
         if(data===null){
                const existing=await stu_schema.findOne({admission});
                if(existing===null){
                    res.status(400).render("error",{
                    message:"User Donot exits"
                })
                }
                else{
                    res.status(400).render("error",{
                    message:"Invalid Credentials"
                    })
                }
         }
         else
         {
            
            name=data.name;
            phone=data.phone;
            course=data.course;
            gender=data.gender;
            email=data.email;
            res.status(201).render("updatedata");
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
        
        if(u_pass!=="") password=u_pass;
        if(u_name!=="")name=u_name;
        if(u_phone!=="")phone=u_phone;
        if(u_course!=="")course=u_course;
        if(u_gender!=="")gender=u_gender;
        if(u_email!=="")email=u_email;
        
        res.render("updatedsubmitdata",{admission,name,phone,course,gender,email});

        
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