const router=require('express').Router()
const Conversation = require('../models/Conversation');


//start conversation
router.post("/",async (req,res)=>{
	try{
		
		// const cc = await Conversation.find((c)=>{
		// 	if((c[0]==req.body.senderId && c[1]==req.body.receiverId)||(c[1]==req.body.senderId && c[0]==req.body.receiverId)) { return true}
		// 	else { return false}
		// })
		const newConversation= await new Conversation({
			members:[req.body.senderId, req.body.receiverId],
		})
		const savedConversation=await newConversation.save()
		res.status(200).json(savedConversation)
	}
	catch(error){
		res.status(500),json(error)
	}
})
//get conversation
router.get("/:userId",async(req,res)=>{
	try {
		const conversation=await Conversation.find({
			members: { $in: [req.params.userId] },
		})
		res.status(200).json(conversation)
	} catch (error) {
		res.status(500).json(error)
	}
})

module.exports = router;