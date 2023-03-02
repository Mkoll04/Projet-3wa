import axios from "axios"
import {NavLink} from "react-router-dom"
import {useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import {BASE_URL, BASE_IMAGE} from "../tools/constante.js"


const GetProductsById = () => {
    
    const [productsByID, setProductsByID] = useState([])
    const {id} = useParams()
    
    useEffect(() => {
        axios.post(`${BASE_URL}/getProductsByID`,{id})
            .then(res =>{ 
                console.log(res)
                setProductsByID(res.data.data.result
                )
            })
            .catch(err => console.log(err))
    },[id])
    
console.log(productsByID)
    return (
        <div>
            <div className="wrapper">
            
                {productsByID.map((product, i) => {
                console.log(product)
                    return(
                    
                        <div key={i}>
                            <h2>{product.name}</h2>
                            <img src={`${BASE_IMAGE}/${product.url}`} alt={`${product.name}`} className="image-product" />
                            <p>{product.description}</p>
                            <p>{product.price} €</p>
                            <p>{product.categorie} </p>
                        </div>
                    )
                })}
            </div>
            <NavLink to={`/products`}>
                <button>Retour à la page broches et tableaux</button>
            </NavLink>
            <NavLink to={`/cart`}>
                <button>Retour à la page panier</button>
            </NavLink>
        </div>
    )
}

export default GetProductsById