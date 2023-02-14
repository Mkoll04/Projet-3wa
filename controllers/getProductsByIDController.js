import BDD from "../model/BDD.js"
import Products from "../model/Products.js"


export default async (req, res) => {
     const {id} = req.body
    
    try {
        const myBDD = new BDD()
        const products = new Products(myBDD)
        const data = await products.getById({id})
        res.json({data})
    }catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}


