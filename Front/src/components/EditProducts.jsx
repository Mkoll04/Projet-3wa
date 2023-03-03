import {useState, useEffect, Fragment, useContext} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import {BASE_URL, BASE_IMAGE} from "../tools/constante.js"
import { useNavigate } from "react-router-dom";
import {inputCheck, checkInputValue} from "../tools/inputCheck.js"
import {StoreContext} from "../tools/context.js"

const EditArticles = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useContext(StoreContext)
    const [productsByID, setProductsByID] = useState({
        name:'',
        description:'',
        price:'',
        categories_id:'',
        url:'',
        caption:'',
        id:''
    })
    const {id} = useParams()
    
    useEffect(() => {
        axios.post(`${BASE_URL}/getProductsByID`,{id})
            .then(res =>{ 
                console.log(res)
                setProductsByID(res.data.data.result[0])
            })
            .catch(err => console.log(err))
    },[id])
    
    const [categories, setCategories]=useState([{
        categorie:'',
        id:''
    }])
    
    useEffect(() => {
        axios.get(`${BASE_URL}/getCategories`)
        .then(res => setCategories(res.data.data.result))
    },[]);
    
    const handleChange = (e) => {
        const {name, value} = e.target
        if(name === "price"){
            if(!inputCheck(name) && isNaN(name) === true){
                alert("donnees incorrectes")
                return
            }
        }
        if (name === "name" ){
           if (!inputCheck(name,63)){
               alert("donnees incorrectes")
               return
           }
        }
        if (name ==="description"){
            if(!inputCheck(name)){
                alert("donnees incorrectes")
                return
            }
        }
        setProductsByID({...productsByID, [name]: value})
    
        }
        
        
    const submit = (e) =>{
        e.preventDefault()
        if(!checkInputValue(productsByID.name)){
            alert("donnees incorrectes")
            return
        }
        if(!checkInputValue(productsByID.description)){
            alert("donnees incorrectes")
            return
        }
        axios.post(`${BASE_URL}/editProducts`,{...productsByID})
        .then(() => {
            // on recupere la liste des produit
            let newProductsList = [...state.allProducts]
            // on retire le produit que l'on souhaite modifier
            newProductsList.filter((e) => e.id !== id)
            // on remet la liste des produits a jour
            newProductsList = [productsByID, ...newProductsList]
            // a l'envoie dans le reducer
            dispatch({type:"UPDATE_PRODUCT",  payload:newProductsList})
            navigate("/getAllProducts")
        })
        
    } 
    
    
    return (
        <Fragment>
            {productsByID.url !== "" && (
                <form onSubmit={submit} encType="multipart/form-data">
                <img src={`${BASE_IMAGE}/${productsByID.url}`} alt={`${productsByID.name}`} className="image-product" />
                    <label>Changement du nom du produit : 
                    <input type="text" placeholder='name' name='name' onChange={handleChange} value={productsByID.name} />
                    </label>
                    <label>Changement description du produit :
                    <input type="text" placeholder='description' name='description' onChange={handleChange} value={productsByID.description} />
                    </label>
                    <label>Changement du prix : 
                    <input type="text" placeholder='price' name='price' onChange={handleChange} value={productsByID.price} />
                    </label>
                    <label>Changement de la catégorie du produit : 
                    <select name='categories_id' value={productsByID.categories_id} onChange={handleChange} >
            
            {categories.map((categorie,i) => {
                    return(
                <option key={i} value={categorie.id}>{categorie.categorie}</option>
                )
            })}
                    </select>
                    </label>
                    <input type='submit' />
                </form>
            )}
        </Fragment>
    )
}

export default EditArticles