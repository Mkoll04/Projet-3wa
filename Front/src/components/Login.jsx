import {useContext, useState, Fragment} from "react"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"
import {StoreContext} from "../tools/context.js"
import Logout from "./Logout.jsx"
import {inputCheck, checkInputValue} from "../tools/inputCheck.js"

const Login = () => {
    const [state, dispatch] = useContext(StoreContext);
    const initialState = {email:'',password:''}
    const [info, setInfo] = useState(initialState)
    const [messageErr, setMessageErr] = useState("")
    
    const handleChange = (e) => {
        setMessageErr("")
        const {name,value} = e.target
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
        setInfo({...info, [name]:value})
    }
    
    const submit = (e) => {
        e.preventDefault()
        if(!checkInputValue(info.email)){
            alert("donnees incorrectes")
            return
        }
        if(!checkInputValue(info.password)){
            alert("donnees incorrectes")
            return
        }
        axios.post(`${BASE_URL}/login`,{ email:info.email,password:info.password,})
            .then(res => {
                if(res.data.response) {
                    dispatch({ type: "LOGIN", payload: res.data.response.data})
                    console.log(res.data.response)
                    localStorage.setItem('jwtToken', res.data.response.token)
                    axios.defaults.headers.common['Authorization'] = 'Bearer '+res.data.response.token
                    setInfo(initialState)
                }
            })
            .catch(err => {
                if(err.response.status === 500){
                    console.clear()
                }
                setMessageErr(err.response.data.response.response)
            })
    }
    
    console.log(state)
    
    return(
        <Fragment>
            {state.Log_in === false && (
                <div>
                    <h3>Connectez-vous</h3>
                    <form onSubmit={submit}>
                        <label>Adresse mail:</label>
                        <input type='text' name='email' value={info.email} onChange={handleChange} placeholder='email' />
                        <label>Mot de Passe : </label>
                        <input type='password' name='password' value={info.password} onChange={handleChange} placeholder='password' />
                        <input type="submit" value="connexion" />
                        {messageErr.length > 0 && <p>{messageErr}</p>}
                    </form>
                </div>
            )}
            {state.Log_in === true && (
                <div>
                <p>Bonjour {state.user.first_name} {state.user.last_name} </p>
                    <Logout />
                </div>
            )}
        </Fragment>
    )
}

export default Login