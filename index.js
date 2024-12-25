  const express = require("express");
  const app=express();
  const urlRoute = require("./routes/url");
  const { connectToMongoDb }=require("./config/database")
 const URL = require("./models/url");
 const staticRouter= require('./routes/staticRouter');

 const path =require("path");

  const PORT =8001;

  app.use(express.json());//json data ko parse krne ke liye
  app.use(express.urlencoded({extended:false}))//form data ko parse krne ke liye

  connectToMongoDb('mongodb+srv://sachinit1708:guMxbmif6xXW9Zu4@cluster0.rxpdf.mongodb.net/urlshortner').then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

  app.use("/url",urlRoute);
  app.use("/",staticRouter);
   
  app.set("view engine", "ejs"); //express ko bta rahe hai ki view engine ejs hai 

  app.set("views",path.resolve("./views"));//and jo ejs ki file hai wo views wale folder me hai ye bta rha hai ye line

  // app.get("/test",async (req,res)=>{
  //   const allurls = await URL.find({});
  //   return res.render("home",{
  //     urls:allurls,
  //   })
  // })
  app.get("/url/:shortId",async (req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({shortId},{$push:{
      visitHistory:{
        timestamp:Date.now()
      }
    },})
    res.redirect(entry.redirectURL);
  });


  app.listen(PORT,()=>console.log(`server started at port ${PORT}`));


  // guMxbmif6xXW9Zu4