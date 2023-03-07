import axios from "axios"
import {NavLink} from "react-router-dom"
import {useEffect, useContext} from "react"
import {BASE_URL, BASE_IMAGE} from "../tools/constante.js"
import {StoreContext} from "../tools/context.js"
import { useNavigate } from "react-router-dom";

const GetProducts = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useContext(StoreContext)
    
    useEffect(() => {
        axios.get(`${BASE_URL}/getAllProducts`)
        .then(res => {
            dispatch({type:"INIT_PRODUCTS",payload:res.data.data.result})
        })
        .catch(err => console.log(err))
    },[dispatch])
  
    const addProductsToCart = (users_id,products) => {
        axios.post(`${BASE_URL}/addToCart`,{users_id,products_id:products.id})
        
        .then((res)=> {
                console.log(res)
                dispatch({type:'ADD_TO_CART', payload:products})
                navigate("/cart")
                
            })
            .catch((err) => {
                console.log(err)
            })
  }

    return (
        <div className="card-wrapper">
        
        
            {state.allProducts.map((product, i) => {
            
                return(
                    
                    <div key={i} className="card">
                        <h2>{product.name}</h2>
                        <NavLink to={`/products/${product.id}`}>
                        <img src={`${BASE_IMAGE}/${product.url}`} alt={`${product.name}`} className="image-product" />
                        </NavLink>
                        <p>{product.description}</p>
                        <p>{product.price} €</p>
                        <button onClick={() => addProductsToCart(state.user.id,product)} className ="card-button">Ajouter au panier</button>
                        
                    </div>
                    
                )
            })}
        </div>    
    )
}

export default GetProducts