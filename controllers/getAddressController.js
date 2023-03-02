import BDD from "../model/BDD.js"
import Adress from "../model/Adress.js"


export default async (req, res) => {
     const {users_id} = req.body
    
    try {
        const myBDD = new BDD()
        const adress = new Adress(myBDD)
        const data = await adress.getAddressbyUser({users_id})
        res.json({data})
    }catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}