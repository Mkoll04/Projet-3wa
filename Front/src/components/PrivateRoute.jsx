import {Navigate, useLocation} from "react-router-dom"
import {StoreContext} from "../tools/context.js"
import {BASE_URL} from "../tools/constante.js"
import {useEffect, useContext, useState} from 'react'
import axios from 'axios'

const PrivateRoute = ({children, auth = null}) => {
    // permet de recuperer le pathname ex: http://najs02.ide.3wa.io:3000/login => /login
    const location = useLocation().pathname;
    const [loading, setLoading] = useState(true)
    /** 
    * On recupere user qui se trouve dans notre state 
    * du reducer grace au destructuring
    **/
    const [{user}, dispatch] = useContext(StoreContext)
    
    useEffect(() => {
        // on verifie que l'utilisateur n'est pas deja connecté
        if(user.id === null){
          // on recupere le token dans le localStorage
          const jwtToken = window.localStorage.getItem("jwtToken")
          // Si on a un token
          if (jwtToken) {
            // on met le token 
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`
            // on verrifie le token puis on sauvegarde les donner dans le reducer
            axios.get(`${BASE_URL}/relogged`)
            .then(res =>dispatch({type:"LOGIN", payload:res.data.result}))
            .catch(e => console.log(e))
          } else { setLoading(false) }
        }
    },[])
  
    // permet de bloquer le chargement des composent si l'utilisateur n'est pas logged ou que le route est securiser
    useEffect(() => { if (user.id || !auth) setLoading(false) },[user, location])
    
    // On recupere les variable qui permette de savoir si l'utilisateur est connecter et/ou admin
    const {isAdmin, isLogged} = user;
    
    // On verrifie si a route est reserver au admin 
    const isLimitedToAdmin = auth === "admin";
    // On verrifie si a route est reserver au utilisateur connecter
    const isLimitedToConnected = auth === "user";
    
    // si il n'y a pas de restriction sur cette route
    const isPublic = auth === null
  
    /* 
    * Si la route est reserver aux admin et qu'il est connecter en tant qu'admin
    * OU
    * Si la route est reserver aux utilisateur et qu'il est connecter
    */
    const isUserAuthorized = isPublic || (isLimitedToAdmin && isAdmin) || (isLimitedToConnected && isLogged);

    if(loading) return <p>Loading</p>
  
    return isUserAuthorized ? children : <Navigate to="/login" />;
}


export default PrivateRoute