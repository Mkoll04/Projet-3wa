import BDD from "../model/BDD.js"
import Adress from "../model/Adress.js"

export default async (req, res) => {
     const {users_id, street, number, postal_code, city} = req.body
    try {
        const myBDD = new BDD()
        const adress = new Adress(myBDD)
        const data = await adress.createAdress({users_id, street, number, postal_code, city})
        console.log(data)
        res.json({data})
    }catch(err) {
        console.log(err);
        res.sendStatus(500).json({error:err})
    }
}