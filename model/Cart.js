import inputCheck from "../config/inputCheck.js"

class Cart{
    constructor(bdd){
        this.pool = bdd.pool
        this.asyncQuery = bdd.asyncQuery 
    }
    
    async userHaveOrder(users_id){
        const sql = 'SELECT id FROM orders WHERE users_id = ?'
        const result = await this.asyncQuery(sql,[users_id])
        console.log(result)
        // l'utilisateur a deja un order
        if(result[0]){
            return result[0].id
        }
        
        // l'utilisateur n'a pas d'order
        const sqlCreate = 'INSERT INTO orders SET users_id = ?'
        const create = await this.asyncQuery(sqlCreate, [users_id])
        return create.insertId
    }
    
    /*
        orders => id | user_id
        products_order => products_id | order_id
    */
    
    async addToCart({products_id, users_id}){
        const order_id = await this.userHaveOrder(users_id)
        
        const sql ="INSERT INTO products_order (products_id,orders_id) values (?,?)"
        const paramsSql = [products_id,order_id]
        try{
            const result = await this.asyncQuery(sql, paramsSql)
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
        
    }
    
    async getCart(orders_id){
    
        // on recupere l'id des produits qui ce trouve dans le panier de l'utilisataeur 
        const sqlCart = "SELECT products_id FROM products_order WHERE orders_id = ?"
        const paramsCart = [orders_id]
        const cart = await this.asyncQuery(sqlCart, paramsCart)
        
        // on recupere la liste de tout les produit 
        const sqlProduct = `SELECT products.*, pictures.url, pictures.caption, products_order.products_id, orders_id,pictures.products_id
                            FROM products 
                            INNER JOIN pictures 
                            ON pictures.products_id = products.id
                            INNER JOIN products_order
                            ON products_order.products_id = products.id`
                            
        const product = await this.asyncQuery(sqlProduct)
        
        // on extrait les id des produit pour les mettre dans un tableau
        const idProduct = []
        
        cart.forEach((e) => {
            idProduct.push(e.products_id)
        })    
        
        // on filtre les produit pour ne garder que ce qui son dans le panier de notre utilisateur
        const cartProduct = product.filter(e => idProduct.includes(e.id))
        
        // on retourn le panier des produit 
        const result = {cartProduct}
        
        return result
    }
    
    async deleteCart({orders_id}){
        const sql = "DELETE FROM products_order WHERE orders_id =?"
        const paramsCart = [orders_id]
        try{
            const result = await this.asyncQuery(sql,paramsCart)
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
}
export default Cart