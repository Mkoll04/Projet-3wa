import BDD from "../model/BDD.js"
import Products from "../model/Products.js"


export default async (req, res) => {
    const {caption,products_id,files} = req.body
    try {
        const myBDD = new BDD()
        const products = new Products(myBDD)

        const data2 = await products.editPictures({products_id,url:files,caption})
        res.json({data2})
    }catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}