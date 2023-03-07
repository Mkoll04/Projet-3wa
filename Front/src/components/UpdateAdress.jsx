import {useState, useEffect, Fragment, useContext} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import {BASE_URL, BASE_IMAGE} from "../tools/constante.js"
import { useNavigate } from "react-router-dom";
import {inputCheck, checkInputValue} from "../tools/inputCheck.js"
import {StoreContext} from "../tools/context.js"

const UpdateAddress = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useContext(StoreContext)
    const {id} = useParams()
    
    const [address, setAddress] = useState({
        street: "",
        number: "",
        postal_code: "",
        city: ""
    })
    
    useEffect(() => {
        axios.post(`${BASE_URL}/getAddress`,{users_id:id})
            .then(res =>{ 
                const address = res.data.data.result[0]
                setAddress(address)
                
            })
            .catch(err => console.log(err))
    },[id])
    
   const handleChange = (e) => {
        const {name, value} = e.target
        if(name === "street"){
            if(!inputCheck(name)){
                alert("donnees incorrectes")
                return
            }
        }
        if (name === "number" ){
           if (!inputCheck(name,63)){
               alert("donnees incorrectes")
               return
           }
        }
        if (name ==="postal_code"){
            if(!inputCheck(name)){
                alert("donnees incorrectes")
                return
            }
        }
        if (name ==="city"){
            if(!inputCheck(name)){
                alert("donnees incorrectes")
                return
            }
        }
        setAddress({...address, [name]: value})
    
        }
        
        
    const submit = (e) =>{
        e.preventDefault()
        if(!checkInputValue(address.street)){
            alert("donnees incorrectes")
            return
        }
        if(!checkInputValue(address.number)){
            alert("donnees incorrectes")
            return
        }
        if(!checkInputValue(address.postal_code)){
            alert("donnees incorrectes")
            return
        }
        if(!checkInputValue(address.city)){
            alert("donnees incorrectes")
            return
        }
        axios.post(`${BASE_URL}/updateAdress`,{users_id:state.user.id, ...address})
        .then(() => {
           // a l'envoie dans le reducer
            dispatch({type:"UPDATE_ADDRESS",  payload:address})
            navigate(`/editUser/${state.user.id}`)
        })
        
    } 
    
    
    return (
        <Fragment>
            
                <form onSubmit={submit} >
                
                    <label>Changement du nom de la rue : 
                    <input type="text" placeholder='street' name='street' onChange={handleChange} value={address.street} />
                    </label>
                    <label>Changement du numéro de la rue :
                    <input type="text" placeholder='description' name='number' onChange={handleChange} value={address.number} />
                    </label>
                    <label>Changement du code postal : 
                    <input type="text" placeholder='price' name='postal_code' onChange={handleChange} value={address.postal_code} />
                    </label>
                    <label>Changement de la ville : 
                    <input type="text" placeholder='price' name='city' onChange={handleChange} value={address.city} />
                    </label>
                    <input type='submit' />
                </form>
        </Fragment>
    )
}

export default UpdateAddress