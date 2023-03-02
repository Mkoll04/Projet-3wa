import axios from "axios"
import {NavLink, Navigate} from "react-router-dom"
import {useEffect, useContext, useState} from "react"
import {BASE_URL, BASE_IMAGE} from "../tools/constante.js"
import {StoreContext} from "../tools/context.js"

const Cart = () => {
    
    // const [getCart, setGetCart] = useState([])
    const [state, dispatch] = useContext(StoreContext)
    
    useEffect(() => {
        if(state.cart.length === 0 && state.user.order_id){
            axios.post(`${BASE_URL}/getCart`,{orders_id:state.user.order_id})
            .then(res => {
                dispatch({ type: "INIT_CART", payload: res.data.data.cartProduct})
            })
            .catch(err => console.log(err))
        }
    },[state.user])
    
    console.log(state)
    
    const deleteCart =  (products_id,orders_id) => {
        console.log({products_id, cart:state.cart})
        axios.post(`${BASE_URL}/deleteCart`,{products_id,orders_id})
        .then( () => {
            const data = state.cart.filter(e => e.id !== products_id)
            dispatch({
                type:"INIT_CART",
                payload:data
            })
        })
    }
    console.log(state.cart.length)
    return (
        <div>
            <div className="card-wrapper">
            
            
                {state.cart.map((product, i) => {
                const id = product.products_id ? product.products_id : product.id
                    return(
                        <div key={i} className="card">
                            <h2>{product.name}</h2>
                            <NavLink to={`/products/${id}`}>
                            <img src={`${BASE_IMAGE}/${product.url}`} alt={`${product.name}`} className="image-product" />
                            </NavLink>
                            <p>{product.description}</p>
                            <p>{product.price} €</p>
                            <button onClick={() => deleteCart(id,product.orders_id)}>Supprimer ce produit du panier</button>
                            
                        </div>
                        
                    )
                })}
            </div>
            {state.cart.length >= 1 && (
            <NavLink to={state.user.adress ? '/commandeSuccess' : `/adress`}>
                <button>Valider votre panier </button>
            </NavLink>
            )}
            {state.cart.length < 1 && (
            <h2>Votre panier est vide</h2>
            )}
        </div>
    )
}

export default Cart