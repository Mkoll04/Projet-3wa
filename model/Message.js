import inputCheck from "../config/inputCheck.js"
class Message {
    constructor(bdd){
        this.pool = bdd.pool
        this.asyncQuery = bdd.asyncQuery 
    }
    
    async createMessage({content, users_id}){
        const sql = "INSERT INTO messages (content, users_id) VALUES (?,?)"
        
        const paramsSql = [content, users_id]
        if(!inputCheck(content)){
            return
        }
        
            
        
        try{
            const result = await this.asyncQuery(sql,paramsSql)
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    async getMessageById({users_id}){
        const sql = "SELECT content, users_id, id FROM messages WHERE users_id= ? "
        try {
            const result = await this.asyncQuery(sql, [users_id])
            return result
        } catch(err){
            console.log(err)
            if(err) throw err
            
        }
    }
    
    async deleteMessage({id}){
        const sql = "DELETE FROM messages WHERE id = ?"
        try{
            const result = await this.asyncQuery(sql,[id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
        
        
    }
    
    
}

export default Message