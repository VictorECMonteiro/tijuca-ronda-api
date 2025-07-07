const service = require("../services/setorService")
const serviceInstance = new service()


const createController = async (req,res)=>{
    let fresult = await serviceInstance.createInstance(req.body.nomeSetor)
    fresult === true? res.status(200).send({success: true}):res.status(400).send({success: false})
}

















module.exports = {createController};