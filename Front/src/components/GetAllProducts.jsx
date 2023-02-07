import axios from "axios"
import {NavLink} from "react-router-dom"
import {useState, useEffect} from "react"
import {BASE_URL} from "../tools/constante.js"

const GetAllProducts = () => {
    const [getProducts, setGetProducts] = useState([])
    
    useEffect(() => {
        axios.get(`${BASE_URL}/getAllProducts`)
        .then(res => setGetProducts(res.data.data.result))
        .catch(err => console.log(err))
    },[])
    
    const deleteProducts = (id) => {
        console.log(id)
        axios.post(`${BASE_URL}/deleteProductsByID`,{id})
    }
    
    return (
        <div>
            {getProducts.map((product, i) => {
                return(
                    <div key={i}>
                        <p>Nom produit : {product.name}</p>
                        <p>Description produit : {product.description}</p>
                        <p>prix produit : {product.price} €</p>
                        <p>categories : {product.categories_id} </p>
                        <button onClick={() => deleteProducts(product.id)}>Supprimer ce produit</button>
                        <p><NavLink to={`/editProducts/${product.id}`}>modifier: {product.name}</NavLink></p>
                    </div>
                )
            })}
        </div>    
    )
}

export default GetAllProducts



// <button onClick={() => deletedArticle(article.id)}>X</button>

// setGetProducts(res.data.result)