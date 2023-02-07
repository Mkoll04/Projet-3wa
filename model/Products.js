//	id	name	description prix stock
class Products {
    constructor(bdd){
        this.pool = bdd.pool
        this.asyncQuery = bdd.asyncQuery 
    }
    
    async create({name, description, price, categories_id}){
        const sql = "INSERT INTO products (name, description, price, categories_id) VALUES (?,?,?,?)"
        const paramsSql = [name, description, price, categories_id]
        
        try{
            const result = await this.asyncQuery(sql,paramsSql)
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    async getById({id}){
        const sql = "SELECT * FROM products WHERE id = ?"
        
        try{
            const result = await this.asyncQuery(sql,[id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    
    async getAll(){
        const sql = "SELECT * FROM products"
        
        try{
            const result = await this.asyncQuery(sql)
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    async update({name, description, price, id}){
        const sql = "UPDATE products SET name = ?, description = ?, prix = ?, WHERE id = ?"
        const paramsSql = [name, description, price, id]
        
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
}

export default Products