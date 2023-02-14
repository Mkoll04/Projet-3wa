import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import {inputCheck, checkInputValue} from "../tools/inputCheck.js"

const AddProducts = () => {
    const [productsData, setProductsData] = useState({
        name:'',
        description:'',
        price:'',
        categories_id:''
    })
    
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
        
        console.log(files)
        
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
            console.log(res)
            res.data.response && console.log('succesfully upload');
            navigate("/getAllProducts")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    
    return(
        <form onSubmit={submit} encType="multipart/form-data">
        <h1>Ajouter image</h1>
                <label name='image'>
                <input type='file' name='image'/>
                </label>    
            <label>Le nom du produit : 
                <input type='text' placeholder='name' name='name' onChange={handleChange} value={productsData.name} />
            </label>
            <label>Description du produit : 
                <input type='text' placeholder='description' name='description' onChange={handleChange} value={productsData.description} />
            </label>
            <label>Prix du produit : 
                <input type='text' placeholder='price' name='price' onChange={handleChange} value={productsData.price} />
            </label>
            <label> Categories:
            <select name='categories_id' value={categories.id} onChange={handleChange} >
            <option value="">Choisissez une catégorie</option>
            {categories.map((categorie,i) => {
                    return(
                <option key={i} value={categorie.id}>{categorie.categorie}</option>
                )
            })}
            
                
                
            </select>
            </label> 
            <input type='submit' />
        </form>    
    )
}

export default AddProducts