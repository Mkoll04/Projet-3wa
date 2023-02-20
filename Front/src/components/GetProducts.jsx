import axios from "axios"
import {NavLink} from "react-router-dom"
import {useEffect, useContext} from "react"
import {BASE_URL, BASE_IMAGE} from "../tools/constante.js"
import {StoreContext} from "../tools/context.js"

const GetProducts = () => {
    
    // const [getProducts, setGetProducts] = useState([])
    const [state, dispatch] = useContext(StoreContext)
    
    useEffect(() => {
        axios.get(`${BASE_URL}/getAllProducts`)
        .then(res => {
            dispatch({type:"INIT_PRODUCTS",payload:res.data.data.result})
            //setGetProducts(res.data.data.result)
        })
        .catch(err => console.log(err))
    },[dispatch])
    
    const AddProductsToCart =  (id) => {
        console.log(id)
     axios.post(`${BASE_URL}/getProductsByID`,{id})
     .then(
         dispatch({type:"ADD_TO_CART",payload:state.cart}))
       
    }
console.log(state)
    return (
        <div className="wrapper">
        
        
            {state.allProducts.map((product, i) => {
            console.log(product)
                return(
                    
                    <div key={i}>
                        <h2>{product.name}</h2>
                        <NavLink to={`/products/${product.id}`}>
                        <img src={`${BASE_IMAGE}/${product.url}`} alt={`${product.name}`} className="image-product" />
                        </NavLink>
                        <p>{product.description}</p>
                        <p>{product.price} €</p>
                        <p>{product.categorie} </p>
                        <button onClick={() => AddProductsToCart(product.id)}>Ajouter au panier</button>
                        
                    </div>
                    
                )
            })}
        </div>    
    )
}

export default GetProducts