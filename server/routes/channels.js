const express = require('express');
const router = express.Router();

const {create,getAll,getChannel,updateChannel,deleteChannel,getChannelViews} = require('../controllers/channels');

router.post("/",create);
router.get("/",getAll);
router.get("/:slug",getChannel);
router.get("/dashboard/channelViews",getChannelViews);

router.put("/:slug",updateChannel);
router.delete("/:slug",deleteChannel);



module.exports = router;

