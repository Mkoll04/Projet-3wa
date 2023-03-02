import BDD from "../model/BDD.js"
import Adress from "../model/Adress.js"


export default async (req, res) => {
    const {users_id, street, number, postal_code, city} = req.body
    console.log({users_id, street, number, postal_code, city})
    const myBDD = new BDD()
    const adress = new Adress(myBDD)
    
    try {
        const data = await adress.updateAdress({users_id, street, number, postal_code, city})
        res.json({data})
    }catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}