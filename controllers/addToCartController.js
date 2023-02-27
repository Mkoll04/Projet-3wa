import BDD from "../model/BDD.js"
import Cart from "../model/Cart.js"


export default async (req, res) => {
     const {users_id, products_id} = req.body
    try {
        const myBDD = new BDD()
        const cart = new Cart(myBDD)
        const data2 = await cart.addToCart({users_id, products_id})
        res.json({data2})
    }catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}