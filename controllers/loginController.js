import {generateToken} from "../config/token.js"
import BDD from "../model/BDD.js"
import User from "../model/User.js"

const generateResponse = async (userDataSQL) => {
    console.log(userDataSQL)
    // ID du role Admin en BDD
    const ADMIN_ROLE_ID = 1
     
    // verrifie si le user est admin return true OR false
   
    const admin = userDataSQL.roles_id === ADMIN_ROLE_ID
    
    const userData = { 
        id:userDataSQL.id,
        email:userDataSQL.email,
        first_name:userDataSQL.first_name,
        last_name:userDataSQL.last_name,
        roles_id:userDataSQL.roles_id,
        order_id:userDataSQL.order_id,
        adress:userDataSQL.address,
        user:true,
        admin

    }
    
    try {
        
        const token = await generateToken(userData)
        return {response:userData, admin, token}
    } catch(err){
        console.log(err)
        return
    }
}
export default async (req, res) => {
    const {email,password} = req.body
    try {
        const myBDD = new BDD()
        const user = new User(myBDD)
        const result = await user.login({email, password})
        if(!result.data){
            return res.status(500).json({response:result})
        }
        const address = await user.getAddress(result.data.id)
        const response = await generateResponse({...result.data, address:address.result})
        res.json(result.response ? {response} : {response:null})
    }catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}