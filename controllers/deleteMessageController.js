import Message from "../model/Message.js"
import BDD  from "../model/BDD.js"


export default (req, res) => {
    const {id} = req.body
    try{
        const myBdd = new BDD()
        const message= new Message(myBdd)
        const data = message.deleteMessage({id})
        res.json({data})
    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
    
}