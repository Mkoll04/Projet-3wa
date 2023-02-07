import BDD from "../model/BDD.js"
import Products from "../model/Products.js"


export default async (req, res) => {
     const {name, description, price, categories_id} = req.body
    try {
        const myBDD = new BDD()
        const products = new Products(myBDD)
        const data = await products.create({name, description, price, categories_id})
        res.json({data})
    }catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}