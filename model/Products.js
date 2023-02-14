import inputCheck from "../config/inputCheck.js"
class Products {
    constructor(bdd){
        this.pool = bdd.pool
        this.asyncQuery = bdd.asyncQuery 
    }
    
    async create({name, description, price, categories_id}){
        const sql = "INSERT INTO products (name, description, price, categories_id) VALUES (?,?,?,?)"
        
        const paramsSql = [name, description, price, categories_id]
        inputCheck(name, 63)
        inputCheck(description)
        try{
            const result = await this.asyncQuery(sql,paramsSql)
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    async getById({id}){
        const sql = "SELECT products.id, products.name, products.price, products.description, products.categories_id,pictures.url,pictures.caption FROM products JOIN pictures ON pictures.products_id = products.id WHERE products.id = ?"
        
        try{
            const result = await this.asyncQuery(sql,[id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    
    async getAll(){
        const sql = "SELECT products.id, products.name, products.price, products.description, products.categories_id, categories.categorie,pictures.url,pictures.caption  FROM products INNER JOIN categories ON categories.id = products.categories_id  INNER JOIN pictures ON pictures.products_id=products.id" 
        
        try{
            const result = await this.asyncQuery(sql)
            return {result}
        } catch(err){
            console.log(err)
            return err
        }  
    }
    
    async update({name, description, price, categories_id, id}){
        const sql = "UPDATE products SET name = ?, description = ?, price = ?, categories_id = ? WHERE id = ?"
        const paramsSql = [name, description, price, categories_id, id]
        inputCheck(name, 63)
        inputCheck(description)
        try{
            const result = await this.asyncQuery(sql,paramsSql)
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    


    async deleted({id}){
        const sql = "DELETE products WHERE id = ?"
        
        try{
            const result = await this.asyncQuery(sql,[id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    async getCategories(){
        const sql ="SELECT * FROM categories"
        
        try{
            const result = await this.asyncQuery(sql)
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    async createPictures({url, caption, product_id}){
    const sqlPicture = 'INSERT INTO pictures (products_id,url,caption) VALUES (?,?,?)'
    const paramsSql = [product_id,url,caption]
    try{
        const result = await this.asyncQuery(sqlPicture,paramsSql)
            return {result}
    }catch(err){
            console.log(err)
            return err
        }
    
    
    // const {files, name} = req.body
    // const result = await asyncQuery(sqlPicture,[files])
    // res.json({result})
    }
}

export default Products