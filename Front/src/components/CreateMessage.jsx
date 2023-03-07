import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {useState, useContext} from "react"
import {inputCheck, checkInputValue} from "../tools/inputCheck.js"
import {StoreContext} from "../tools/context.js"
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
    
    const navigate = useNavigate();
    const [state, dispatch] = useContext(StoreContext)
    const [message, setMessage] = useState({
        content:'',
        users_id:''
        
        
        
    })
    
    
    const handleChange = (e) => {
        const {name, value} = e.target
        if(name === "content"){
            if(!inputCheck(name)){
                alert("donnees incorrectes")
                return
            }
        }
        
        setMessage({...message,[name]:value})
    }
    
    const submit = (e) => {
        e.preventDefault()
        if(!checkInputValue(message.content)){
            alert("donnees incorrectes")
            return
        }
        
        axios.post(`${BASE_URL}/createMessage`,{
           content:message.content,
           users_id:state.user.id
          
       })
       .then(res => {
           alert("Votre message a bien été envoyé")
           navigate("/")
       })
    }
    
    
    return(
        <div>
        <h2>Formulaire de contact</h2>
            <form onSubmit={submit} className="contact-form">
                   <label>
                      <p>Si vous avez une demande, écrivez un message ci-dessous.</p>
                      <textarea name="content" rows={4} cols={40} onChange={handleChange} value={message.content} />
                    </label>
                       
                <input type='submit' value='Envoyer mon message' />
            </form> 
        </div>
    )
}

export default RegisterUser