import {StoreContext} from "../tools/context.js"
import {useEffect, useContext, useState} from "react"
import axios from "axios"
import {BASE_URL, BASE_IMAGE} from "../tools/constante.js"
import {useNavigate, NavLink } from "react-router-dom";

const CommandeSuccess = () => {
    // vider le panier => Reducer + BDD
    const [state, dispatch] = useContext(StoreContext)
    console.log(state)
    
    const navigate = useNavigate();

    
    
    
    const deleteCart = () => {
        console.log({cart:state.cart})
        axios.post(`${BASE_URL}/deleteCart`,{orders_id: state.user.order_id})
        .then( () => {
            dispatch({type:"DELETE_CART"})
            alert("Votre commande a bien été prise en compte et sera traitée dans les meilleurs délais")
            navigate("/")
        })
    }
 
    return (
        <div>
            <div>
                <h3>Confirmation de votre adresse de livraison : </h3>
                    <p>Rue :{state.user.adress.number} {state.user.adress.street} </p>
                    <p>Ville: {state.user.adress.postal_code}  {state.user.adress.city}</p>
                    <button onClick={() => navigate(`/editUser/${state.user.id}`)}>Modifier votre adresse de livraison</button>
            </div>
            <div>
            <h3>Récapitulatif du panier</h3>
            {state.cart.map((product,i) => {
                    return(
                    <div key={i}>
                <p>{product.name} {product.price}€</p>
                <img src={`${BASE_IMAGE}/${product.url}`} alt={`${product.caption}`} className="image-product" />
                </div>
                )
            })}
            </div>
            <button onClick={deleteCart}>Confirmer et valider la commande</button>
        </div>    
    )
}

export default CommandeSuccess