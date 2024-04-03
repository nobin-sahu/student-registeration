// supporting functions 
const {toLowerCase}=require("../stringfun.js");

// mongodb schema 
const stu_schema=require("../../models/s_schema.js");


let password,admission;

async function closelogin(req,res){
    try{
         password=req.body.password;
         admission=toLowerCase(req.body.admission);
         const data=await stu_schema.findOne({admission,password});
         if(data===null){
                res.status(400).render("error",{
                    message:"Invalid Credentials"
                })
         }
         else
         {
            const data=await stu_schema.deleteOne({"admission":admission});
            res.status(201).render("index");
         }
    }
    catch(err){
        res.status(400).send(err);
    }
}

module.exports={closelogin};