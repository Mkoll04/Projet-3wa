import BDD from "../model/BDD.js"
import Cart from "../model/Cart.js"


export default async (req, res) => {
    const {orders_id} = req.body
    try {
        const myBDD = new BDD()
        const cart = new Cart(myBDD)
        const data = await cart.getCart(orders_id)
        res.json({data})
    }catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}