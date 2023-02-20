import inputCheck from "../config/inputCheck.js"

import bcrypt from "bcrypt"
class User {
    constructor(bdd){
        this.pool = bdd.pool
        this.asyncQuery = bdd.asyncQuery 
        this.saltRounds = 10
    }   
    
    async login({email, password}){
        try{
            const dataBDD = await this._emailExist(email) 
            
            if(!dataBDD[0]){
                return {response: "email ou mot de passe invalide"}
            }
            inputCheck(email)
            inputCheck(password)
            
            const passwordIsValide = await bcrypt.compare(password,dataBDD[0].password)
            console.log(passwordIsValide)
            
            if(passwordIsValide){
                return{response:passwordIsValide, data:dataBDD[0]}
            }
            
            return{response: "email ou mot de passe invalide"}
        } catch (err){
            return {error: err}
        }
            
    }
    
    async _emailExist(email){
        try {
            const sql = "SELECT email,password,first_name,last_name,roles_id FROM users WHERE email = ?"
            const response  = await this.asyncQuery(sql,[email])
            if(response.length > 0) return response
            return false
        } catch(err){
            return err
        }
    }
    
    async register(data){
        const {email,password,first_name,last_name} = data
        const sql = "INSERT INTO users (email,password,first_name,last_name,roles_id) VALUES (?,?,?,?,2)"
        
        if(password.length <= 8){
            return {response:'mdp trop court'}
        }
        
        try {
            // on verrifie si l'email existe en BDD
            const emailPresent = await this._emailExist(email)
        
            // error a la verrification de l'email
            if(emailPresent === undefined){
                return
            }
            
            // Email deja present en BDD 
            if(emailPresent === true) {
                return {response:'email deja present'}
            }
            
            // On hash le password
            const mpdHash = await bcrypt.hash(password,this.saltRounds)
            
            // on creer la liste des params pour add user
            const paramsSql = [ email, mpdHash, first_name, last_name]
            
            // on fait la requete
            const createUser = await this.asyncQuery(sql,paramsSql)
            
            // on retourn la reponse
            return {response:createUser}
        }catch(err){
            console.log(err)
            return
        }
        
    }
    
    async deleteAccount({id}){
        const sql = "DELETE FROM users WHERE id = ?"
        const paramsSql = [id]
        
        try {
            const result = await this.asyncQuery(sql, paramsSql)
            return result
        } catch(err){
            console.log(err)
            if(err) throw err
            
        }
    }
    
    async getAllUser(){
        const sql = "SELECT * FROM users"
        
        try {
            const result = await this.asyncQuery(sql)
            return result
        } catch(err){
            console.log(err)
            if(err) throw err
            
        }
    }
    
    async getByID({id}){
        const sql = "SELECT * FROM users WHERE id = ?"
        
        try {
            const result = await this.asyncQuery(sql, [id])
            return result
        } catch(err){
            console.log(err)
            if(err) throw err
            
        }
    }
}

export default User