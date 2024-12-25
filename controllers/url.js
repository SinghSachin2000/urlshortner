const shortid=require("shortid");
const URL = require("../models/url");

async function handlegeneratenewshorturl(req,res){
    const body=req.body;
    if(!body.url) return res.status(400).json({error:"url is required"})

        const shorid= shortid();
        await URL.create({
            shortId:shorid,
            redirectURL:body.url,
            visitHistory:[],
        });

        return res.render('home',{id:shortid})
        // return res.json({id:shorid});
}
async function handlegetanalytics(req, res) {
    try {
        const shortId = req.params.shortId;
        const result = await URL.findOne({ shortId });

        if (!result) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        return res.json({
            totalClicks: result.visitHistory.length, // Use `.length` without parentheses
            analytics: result.visitHistory,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports= {
    handlegeneratenewshorturl,
    handlegetanalytics
}