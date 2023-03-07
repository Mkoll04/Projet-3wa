import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {useState} from "react"
import {inputCheck, checkInputValue} from "../tools/inputCheck.js"
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
    const [userData, setUserData] = useState({
        email:'',
        password:'',
        first_name:'',
        last_name:''
    })
    
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const {name, value} = e.target
        if(name === "email"){
            if(!inputCheck(name)){
                alert("donnees incorrectes")
                return
            }
        }
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
        setUserData({...userData,[name]:value})
    }
    
    const submit = (e) => {
        e.preventDefault()
        if(!checkInputValue(userData.email)){
            alert("donnees incorrectes")
            return
        }
        if(!checkInputValue(userData.password)){
            alert("donnees incorrectes")
            return
        }
        if(!checkInputValue(userData.first_name)){
            alert("donnees incorrectes")
            return
        }
        if(!checkInputValue(userData.last_name)){
            alert("donnees incorrectes")
            return
        }
        axios.post(`${BASE_URL}/registerUser`,{
           email : userData.email,
           password: userData.password,
           first_name: userData.first_name,
           last_name:userData.last_name
        }).then((res)=> {
            navigate("/login")
        })
    }
    
    
    return(
        <form onSubmit={submit}>
            <fieldset>
                <legend>Informations de connexion</legend>
                <label>Enter your email : </label>
                    <input type='email' placeholder='email' name='email' onChange={handleChange} value={userData.email} />
                <label>Enter your password : </label>   
                    <input type='password' placeholder='password' name='password' onChange={handleChange} value={userData.password} />
                <label>Enter your first name : </label>
                    <input type='text' placeholder='first name' name='first_name' onChange={handleChange} value={userData.first_name} />
                <label>Enter your last name : </label>
                    <input type='text' placeholder='last name' name='last_name' onChange={handleChange} value={userData.last_name} />
             </fieldset>      
            <input type='submit' value='Créer mon compte' />
        </form>    
    )
}

export default RegisterUser