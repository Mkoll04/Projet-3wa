import inputCheck from "../config/inputCheck.js"
import numberInputCheck from "../config/numberInputCheck.js"

class Adress {
    constructor(bdd){
        this.pool = bdd.pool
        this.asyncQuery = bdd.asyncQuery 
    }
    
    async createAdress({users_id, street, number, postal_code, city}){
        const sql = "INSERT INTO address (users_id, street, number, postal_code, city) VALUES (?,?,?,?,?)"
        
        const paramsSql = [users_id, street, number, postal_code, city]
        if (!inputCheck(street) || !inputCheck(number,63) || 
        !numberInputCheck(number) || !inputCheck(postal_code,63) || 
        !numberInputCheck(postal_code) || !inputCheck(city,63)){
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
    
    async getAddressbyUser({users_id}){
        const sql = "SELECT  street, number, postal_code, city FROM address WHERE users_id = ?"
        try{
            const result = await this.asyncQuery(sql,[users_id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    async updateAdress({users_id, street, number, postal_code, city}){
        const sql = "UPDATE address SET street = ?, number = ?, postal_code = ? , city= ? WHERE users_id = ?"
        
        const paramsSql = [ street, number, postal_code, city, users_id]
        inputCheck(street)
        inputCheck(number, 63)
        inputCheck(postal_code, 63)
        inputCheck(city, 63)
        try{
            const result = await this.asyncQuery(sql,paramsSql)
            console.log(result)
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
}

export default Adress