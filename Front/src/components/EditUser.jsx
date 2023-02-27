import {useState, useEffect, Fragment, useContext} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import {BASE_URL, BASE_IMAGE} from "../tools/constante.js"
import { useNavigate } from "react-router-dom";
import {inputCheck, checkInputValue} from "../tools/inputCheck.js"
import {StoreContext} from "../tools/context.js"

const EditArticles = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useContext(StoreContext)
    const [userByID, setUserByID] = useState({
        password:'',
        first_name:'',
        last_name:'',
        id:''
    })
    const {id} = useParams()
    
    useEffect(() => {
        axios.post(`${BASE_URL}/getUserById`,{id})
            .then(res =>{ 
                console.log(res)
                const data = res.data.data[0]
                data.password = ""
                data.id = id
                setUserByID(data)
            })
            .catch(err => console.log(err))
    },[id])
    
    const handleChange = (e) => {
        const {name, value} = e.target
        
        if (name === "password" ){
           if (!inputCheck(name)){
               alert("donnees incorrectes")
               return
           }
        }
        if (name ==="first_name"){
            if(!inputCheck(name,63)){
                alert("donnees incorrectes")
                return
            }
        }
        if (name ==="last_name"){
            if(!inputCheck(name,63)){
                alert("donnees incorrectes")
                return
            }
        }
        setUserByID({...userByID, [name]: value})
    
        }
        
        
    const submit = (e) =>{
        e.preventDefault()
        if(!checkInputValue(userByID.password)){
            alert("donnees incorrectes")
            return
        }
        if(!checkInputValue(userByID.first_name)){
            alert("donnees incorrectes")
            return
        }
        if(!checkInputValue(userByID.last_name)){
            alert("donnees incorrectes")
            return
        }
        axios.post(`${BASE_URL}/updateUser`,{...userByID})
        .then(() => {
            // on recupere la liste des produit
            let newUser = {...state.user}
            newUser = {userByID, ...newUser}
            // a l'envoie dans le reducer
            dispatch({type:"LOGIN",  payload:newUser})
            navigate("/")
        })
        
    } 
    
    
    return (
        <Fragment>
        <h2>Mon Profil</h2>
        <h3>Mes Informations</h3>
        <p>Prénom : {state.user.first_name}</p>
        <p>Nom : {state.user.last_name}</p>
        <p>Mail : {state.user.email}</p>
        <h2>Modifier votre profil</h2>
            {userByID.url !== "" && (
                <form onSubmit={submit} >
            
                    <label>Changement du mot de passe :
                    <input type="password" placeholder='new passsword' name='password' onChange={handleChange} value={userByID.password} />
                    </label>
                    <label>Changement du prénom : 
                    <input type="text" placeholder='new first name' name='first_name' onChange={handleChange} value={userByID.first_name} />
                    </label>
                    <label>Changement du nom : 
                    <input type="text" placeholder='new last name' name='last_name' onChange={handleChange} value={userByID.last_name} />
                    </label>
                    
                    <input type='submit' />
                </form>
            )}
        </Fragment>
    )
}

export default EditArticles