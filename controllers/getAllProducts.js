import BDD from "../model/BDD.js"
import Products from "../model/Products.js"


export default async (req, res) => {
    const {name, description, price, categories_id, url, caption} = req.body
     try {
        const myBDD = new BDD()
        const products = new Products(myBDD)
        const data = await products.getAll({name, description, price, categories_id, url , caption})
        res.json({data})
     }catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}