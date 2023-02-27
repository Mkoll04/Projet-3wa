import BDD from "../model/BDD.js"
import Products from "../model/Products.js"


export default async (req, res) => {
     const {name, description, price,categories_id, id} = req.body
    try {
        const myBDD = new BDD()
        const products = new Products(myBDD)
        const data = await products.update({name, description, price,categories_id, id})
        res.json({data})
    }catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}

// export default (req, res) => {
//     const {name, description, price, id} = req.body
//     const sql = "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?"
//     const paramsSQL = [name, description, price, id]
//     pool.query(sql,paramsSQL,(err, result) => {
//         if(err) throw err
//         res.json({result})
//     })
// }