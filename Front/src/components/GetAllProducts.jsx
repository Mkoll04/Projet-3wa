import axios from "axios"
import {NavLink} from "react-router-dom"
import {useEffect, useContext} from "react"
import {BASE_URL, BASE_IMAGE} from "../tools/constante.js"
import {StoreContext} from "../tools/context.js"
import AddProducts from "./AddProducts.jsx"

const GetAllProducts = () => {
    
   
    const [state, dispatch] = useContext(StoreContext)
    
    useEffect(() => {
        axios.get(`${BASE_URL}/getAllProducts`)
        .then(res => {
            dispatch({type:"INIT_PRODUCTS",payload:res.data.data.result})
            
        })
        .catch(err => console.log(err))
    },[dispatch])
    
    const deleteProducts =  (id) => {
     axios.post(`${BASE_URL}/deleteProductsByID`,{id})
     .then(
         dispatch({type:"UPDATE_PRODUCT",payload:state.allProducts.filter(e => e.id !== id)}))
        
    }
    console.log(state)
    return (
        <div>
            <AddProducts />
            <div className="wrapper">
            
                {state.allProducts.map((product, i) => {
                
                    return(
                    
                        <div key={i}>
                            <h2>Nom produit : {product.name}</h2>
                            <img src={`${BASE_IMAGE}/${product.url}`} alt={`${product.name}`} className="image-product" />
                            <p>Description produit : {product.description}</p>
                            <p>prix produit : {product.price} €</p>
                            <p>categories : {product.categorie} </p>
                            <button onClick={() => deleteProducts(product.id)}>Supprimer ce produit</button>
                            <p><NavLink to={`/editProducts/${product.id}`}>Modifier ce produit: "{product.name}"</NavLink></p>
                            <p><NavLink to={`/editPictures/${product.id}`}>Modifier la photo</NavLink></p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default GetAllProducts



