import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {useState, useEffect, useContext} from "react"
import { useNavigate } from "react-router-dom";
import {inputCheck, checkInputValue} from "../tools/inputCheck.js"
import {StoreContext} from "../tools/context.js"

const AddProducts = () => {
    
    const [state, dispatch] = useContext(StoreContext)
    
    const initialState = {
        name:'',
        description:'',
        price:'',
        categories_id:''
    }
    
    
    
    const [productsData, setProductsData] = useState(initialState)
    
    const [categories, setCategories]=useState([{
        name:'',
        id:''
        }])
    
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get(`${BASE_URL}/getCategories`)
        .then(res => setCategories(res.data.data.result))
    },[]);
    
    
    const handleChange = (e) => {
        const {name, value} = e.target
        if(name === "price"){
            if(!inputCheck(name)){
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
        setProductsData({...productsData,[name]:value})
        
    }
    
    const submit = (e) => {
        e.preventDefault()
        console.log(productsData)
        if(!checkInputValue(productsData.name)){
            alert("donnees incorrectes")
            return
        }
        if(!checkInputValue(productsData.description)){
            alert("donnees incorrectes")
            return
        }
        
        const dataFile = new FormData();
        const files = {...e.target.image.files};
        
        
        
        // ajouter d'autre input au formulaire
        dataFile.append('name', productsData.name)
        dataFile.append('description', productsData.description)
        dataFile.append('price', productsData.price)
        dataFile.append('categories_id', productsData.categories_id)
        
        // L'image
        dataFile.append('files', files[0], files[0].name)
        console.log(files)
        console.log(dataFile)
        axios.post(`${BASE_URL}/addProducts`, dataFile)
        .then((res)=> {
            // on creer une copie du state allProducts pour le mettre a jour
            const allProducts = [...state.allProducts]
            
            // les differente categorie en BDD
            const categorie = {1:"Broche",2:"Tableau"}
            
            // on creer l'objet qui represente un produit dans le Reducer
            // a partir de la reponse obtenu de Back
            const product = {...res.data.product}
            
            // on ajout les key manquante
            product.caption = product.name
            product.categorie = categorie[product.categories_id]
            
            // On ajout le nouveau produit a la liste des produit existant
            allProducts.push(product)
            
            // on envoie dans le Reducer
            dispatch({
                type:"UPDATE_PRODUCT",
                payload:allProducts
            })
            
            // on vide les inputs
            setProductsData(initialState)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    
    return(
        <div>
            <h2>Ajout d'un produit</h2>
            <form onSubmit={submit} encType="multipart/form-data">
                <label name='image' className="image-product">
                    <h3>Image du produit : </h3>
                    <input type='file' name='image'/>
                </label>    
                <label>
                    <h3>Le nom du produit : </h3>
                    <input type='text' placeholder='name' name='name' onChange={handleChange} value={productsData.name} />
                </label>
                <label>
                    <h3>Description du produit : </h3>
                    <input type='text' placeholder='description' name='description' onChange={handleChange} value={productsData.description} />
                </label>
                <label>
                    <h3>Prix du produit : </h3>
                    <input type='text' placeholder='price' name='price' onChange={handleChange} value={productsData.price} />
                </label>
                <label>
                    <h3> Categories: </h3>
                    <select name='categories_id' value={categories.id} onChange={handleChange} >
                        <option value="">Choisissez une catégorie</option>
                            {categories.map((categorie,i) => {
                            return(
                            <option key={i} value={categorie.id}>{categorie.categorie}</option>
                            )
                            })}
                    </select>
                </label> 
                <h3>Ajout du produit </h3>
                    <input type='submit' value="Créer un produit" />
            </form>  
        </div>    
    )
}

export default AddProducts