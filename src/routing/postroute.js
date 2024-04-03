const express = require('express');
const router = express.Router();

// supporting function
const {closelogin}=require("../function/postroutefun/close.js");
const {logininfo}=require("../function/postroutefun/login.js");
const {register,submitdata}=require("../function/postroutefun/registeration.js");
const {updatelogin,updatedata,updatedsubmitdata}=require("../function/postroutefun/update.js");

router.post("/register",register);
router.post("/submitdata",submitdata);
router.post("/logininfo",logininfo);
router.post("/updatelogin",updatelogin);
router.post("/updatedata",updatedata);
router.post("/updatedsubmitdata",updatedsubmitdata);
router.post("/closelogin",closelogin);
module.exports = router;