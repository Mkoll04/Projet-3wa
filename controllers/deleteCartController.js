import Cart from "../model/Cart.js"
import BDD  from "../model/BDD.js"


export default (req, res) => {
    const {orders_id} = req.body
    try{
        const myBdd = new BDD()
        const cart= new Cart(myBdd)
        const data = cart.deleteCart({orders_id})
        res.json({data})
    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
    
}