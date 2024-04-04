// supporting functions 
const {toLowerCase}=require("../stringfun.js");

// mongodb schema 
const stu_schema=require("../../models/s_schema.js");

// for hashing to store the password in database 
const bcrypt=require("bcryptjs");

let password,admission;
async function logininfo(req,res){
    try{
         password=req.body.password;
         admission=toLowerCase(req.body.admission);
         const data=await stu_schema.findOne({admission});
         if(data===null){
                res.status(400).render("error",{
                message:"User Donot exits"
            })
        }
        else{

            // to check whether entered password is correct or not  
            const storedhashpass=data.password;
            const flag= await bcrypt.compareSync(password,storedhashpass);

            if(flag===false){
                res.status(400).render("error",{
                    message:"Invalid credentials"
                })
            }
            else{
                const name=data.name;
                res.status(201).render("dashboard",{
                    name,admission
                });
            } 
         } 
    }
    catch(err){
        res.status(400).send(err);
    }
}

module.exports={logininfo};