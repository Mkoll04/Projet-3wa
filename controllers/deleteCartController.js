import Cart from "../model/Cart.js"
import BDD  from "../model/BDD.js"


export default (req, res) => {
    const {products_id,orders_id} = req.body
    console.log(req.body)
    try{
        const myBdd = new BDD()
        const cart= new Cart(myBdd)
        const data = cart.deleteCart({products_id, orders_id})
        res.json({data})
    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
    
}