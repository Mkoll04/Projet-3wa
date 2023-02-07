import {pool} from "../config/database.js"

export default (req, res) => {
    const {name, description, price, id} = req.body
    const sql = "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?"
    const paramsSQL = [name, description, price, id]
    pool.query(sql,paramsSQL,(err, result) => {
        if(err) throw err
        res.json({result})
    })
}