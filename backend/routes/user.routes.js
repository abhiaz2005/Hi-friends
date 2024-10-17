import express from "express";
import { sendQuery,sendOTP, userSignup, userLogin, getProfile } from "../controller/user.controller.js";



const router = express.Router() ;

router.post("/sendmail",sendQuery) ;
router.post("/sendotp",sendOTP) ;
router.post("/signup", userSignup) ;
router.post("/signin",userLogin) ;

router.get("/profile",getProfile)

export default router ;