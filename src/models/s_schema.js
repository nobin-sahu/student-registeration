const mongoose=require("mongoose");
const validator=require("validator");
const student_schema = new mongoose.Schema({
    admission:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
        min:10
    },
    course:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    gender:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
         validate: {
            validator: function(value) {
                return validator.isEmail(value);
            },
            message: props => `${props.value} is not a valid email address!`
        
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        min:4,
        validate: {
            validator: function(value) {
                // Check if the password contains at least one capital letter, one number, and one special character
                return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{4,}$/.test(value);
            },
            message: props => 'Password must contain at least one capital letter, one number, and one special character!'
        }
    }
})

const stu_schema=new mongoose.model("studentdatas",student_schema)
module.exports=stu_schema;

// collection name studentdata