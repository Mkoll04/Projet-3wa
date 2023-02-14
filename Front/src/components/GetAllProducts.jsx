import axios from "axios"
import {NavLink} from "react-router-dom"
import {useState, useEffect} from "react"
import {BASE_URL, BASE_IMAGE} from "../tools/constante.js"


const GetAllProducts = () => {
    
    const [getProducts, setGetProducts] = useState([])
    
    useEffect(() => {
        axios.get(`${BASE_URL}/getAllProducts`)
        .then(res => setGetProducts(res.data.data.result))
        .catch(err => console.log(err))
    },[])
    
    const deleteProducts =  (id) => {
        console.log(id)
     axios.post(`${BASE_URL}/deleteProductsByID`,{id})
     .then(setGetProducts(getProducts.filter(e => e.id !== id)))
        
    }
    console.log(getProducts)
    return (
        <div>
        
            {getProducts.map((product, i) => {
            console.log(product)
                return(
                
                    <div key={i}>
                        <h2>Nom produit : {product.name}</h2>
                        <img src={`${BASE_IMAGE}/${product.url}`} alt={`${product.name}`} />
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
    )
}

export default GetAllProducts



// <button onClick={() => deletedArticle(article.id)}>X</button>

// setGetProducts(res.data.result)