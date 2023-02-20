import BDD from "../model/BDD.js"
import User from "../model/User.js"

export default async (req, res) => {
     const {email,password,first_name,last_name} = req.body
    try {
        const myBDD = new BDD()
        const user = new User(myBDD)
        const data = await user.register({email,password,first_name,last_name})
        res.json({data})
    }catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}