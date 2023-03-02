import {useContext} from "react"
import {StoreContext} from "../tools/context.js"
import axios from "axios"

import { useNavigate } from "react-router-dom";

const Logout = () => {
    const [state, dispatch] = useContext(StoreContext);
    const navigate = useNavigate();
    
    const submit = (e) => {
        e.preventDefault()
        localStorage.removeItem('jwtToken')
        
        delete axios.defaults.headers.common['Authorization']
        dispatch({ type: "LOGOUT" })
        console.log(state)
        navigate("/")
        console.log(state)
    }
    
    
    
    return(
        <div>
        <h3>Voulez vous vous déconnecter ?</h3>
        <form onSubmit={submit}>
            <input type="submit" value="déconnexion" />
        </form>
        </div>
    )
}

export default Logout