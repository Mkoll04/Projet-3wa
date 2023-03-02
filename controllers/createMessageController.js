import BDD from "../model/BDD.js"
import Message from "../model/Message.js"


export default async (req, res) => {
     const {content, users_id} = req.body
    try {
        const myBDD = new BDD()
        const message = new Message(myBDD)
        const data = await message.createMessage({content, users_id})
        
        res.json({data})
    }catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}