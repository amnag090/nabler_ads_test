const express = require('express');
const router = express.Router();

const {create,getAll,getChannel,updateChannel,deleteChannel,getChannelViews,getChannelSpends} = require('../controllers/channels.controller');

router.post("/",create);
router.get("/",getAll);
router.get("/:slug",getChannel);
router.get("/dashboard/channelViews",getChannelViews);
router.get("/dashboard/channelSpends",getChannelSpends);

router.put("/:slug",updateChannel);
router.delete("/:slug",deleteChannel);



module.exports = router;

