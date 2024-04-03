// supporting functions 
const {toLowerCase}=require("../stringfun.js");

// mongodb schema 
const stu_schema=require("../../models/s_schema.js");

let password,admission;
async function logininfo(req,res){
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
            const name=data.name;
            res.status(201).render("dashboard",{
                name,admission
            });
         }
         
    }
    catch(err){
        res.status(400).send(err);
    }
}

module.exports={logininfo};