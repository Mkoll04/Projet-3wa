import BDD from "../model/BDD.js"
import Products from "../model/Products.js"


export default async (req, res) => {
     const {name, description, price, categories_id, files} = req.body
    try {
        const myBDD = new BDD()
        const products = new Products(myBDD)
        const data = await products.create({name, description, price, categories_id})
        const product_id = data.result.insertId
        const data3 = await products.createPictures({product_id,url:files,caption:name})
        res.json({data, data3})
    }catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}