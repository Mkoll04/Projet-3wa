import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {useState, useContext, useEffect} from "react"
import {inputCheck, checkInputValue} from "../tools/inputCheck.js"
import {StoreContext} from "../tools/context.js"
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
    
    const navigate = useNavigate();
    const [state, dispatch] = useContext(StoreContext)
    const [check, setCheck] = useState(false)
    const [userAdress, setUserAdress] = useState({
        users_id:'',
        street:'',
        number:'',
        postal_code:'',
        city:''
        
        
    })
    
    const handleChange = (e) => {
        const {name, value} = e.target
        if(name === "street"){
            if(!inputCheck(name)){
                alert("donnees incorrectes")
                return
            }
        }
        if (name === "number" ){
           if (!inputCheck(name,63) && isNaN(userAdress.number) === true){
               alert("donnees incorrectes")
               return
           }
        }
        if (name ==="postal_code"){
            if(!inputCheck(name,63) && isNaN(userAdress.postal_code) === true){
                alert("donnees incorrectes")
                return
            }
        }
        if (name ==="city"){
            if(!inputCheck(name,63)){
                alert("donnees incorrectes")
                return
            }
        }
        setUserAdress({...userAdress,[name]:value})
    }
    
    const submit = (e) => {
        e.preventDefault()
        if(!checkInputValue(userAdress.street)){
            alert("donnees incorrectes")
            return
        }
        if(!checkInputValue(userAdress.number) && isNaN(userAdress.number) === true){
            alert("donnees incorrectes")
            return
        }
        if(!checkInputValue(userAdress.postal_code) && isNaN(userAdress.postal_code) === true){
            alert("donnees incorrectes")
            return
        }
        if(!checkInputValue(userAdress.city)){
            alert("donnees incorrectes")
            return
        }
        axios.post(`${BASE_URL}/addAddress`,{
           users_id:state.user.id,
           street : userAdress.street,
           number: userAdress.number,
           postal_code: userAdress.postal_code,
           city: userAdress.city,
       })
       .then(res => {
           console.log(res)
           dispatch({type:"UPDATE_ADDRESS",  payload:userAdress})
           setCheck(true)
       })
    }
    
    useEffect(() => {
        if(check){
            navigate("/commandeSuccess")
        }
    },[check])
    
    
    return(
        <form onSubmit={submit}>
            <fieldset>
                <legend>Adresse pour la livraison</legend>
                <label>Rue : </label>
                    <input type='text' placeholder='Nom de la rue ...' name='street' onChange={handleChange} value={userAdress.street} />
                <label>Num??ro de la rue : </label>   
                    <input type='text' placeholder='Num??ro de la rue ...' name='number' onChange={handleChange} value={userAdress.number} />
                <label>Code Postal : </label>
                    <input type='text' placeholder='code postal ...' name='postal_code' onChange={handleChange} value={userAdress.postal_code} />
                <label>Ville : </label>
                    <input type='text' placeholder='Ville ...' name='city' onChange={handleChange} value={userAdress.city} />
             </fieldset>      
            <input type='submit' value='Enregistrer mon adresse' />
        </form>    
    )
}

export default RegisterUser