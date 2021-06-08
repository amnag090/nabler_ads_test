const express = require('express');
const router = express.Router();

const {create,getAll,getChannel,updateChannel,deleteChannel} = require('../controllers/channels');

router.post("/",create);
router.get("/",getAll);
router.get("/:slug",getChannel);

router.put("/:slug",updateChannel);
router.delete("/:slug",deleteChannel);


module.exports = router;

