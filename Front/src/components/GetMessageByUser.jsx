import axios from "axios"
import {NavLink} from "react-router-dom"
import {useParams} from "react-router-dom"
import {useEffect, useState,useContext} from "react"
import {BASE_URL} from "../tools/constante.js"
import {StoreContext} from "../tools/context.js"
import { useNavigate } from "react-router-dom";

const GetMessageByUser = () => {
    
    const [messageByID, setMessageByID] = useState([])
    const {users_id} = useParams()
    const [state, dispatch] = useContext(StoreContext)
    const navigate = useNavigate();
    
    
    
    useEffect(() => {
        axios.post(`${BASE_URL}/getMessage`,{users_id:state.user.id})
            .then(res =>{ 
                setMessageByID(res.data.data)
            })
            .catch(err => console.log(err))
    },[users_id])
    
    const deleteMessage =  (id) => {
    
     axios.post(`${BASE_URL}/deleteMessage`,{id})
      .then(res => {
           
           navigate("/")
       })
        
    }

    return (
        <div>
            <div>
                <h3>Vos demandes :</h3>
                {messageByID.map((message, i) => {
                
                    return(
                    
                        <div key={i}>
                            <p>Votre message : {message.content} </p>
                            <button onClick={() => deleteMessage(message.id)}>Supprimer ce message</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default GetMessageByUser