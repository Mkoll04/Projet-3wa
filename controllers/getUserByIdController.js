import BDD from "../model/BDD.js"
import User from "../model/User.js"


export default async (req, res) => {
     const {id} = req.body
    
    try {
        const myBDD = new BDD()
        const user = new User(myBDD)
        const data = await user.getUserByID({id})
        res.json({data})
    }catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}