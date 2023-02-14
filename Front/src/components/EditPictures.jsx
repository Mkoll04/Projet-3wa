import {Fragment} from 'react'
import {BASE_URL} from "../tools/constante.js"
import axios from 'axios'
import {useState, useEffect} from "react"
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const UploadFile = () => {
    const navigate = useNavigate();
    const [productsData, setProductsData] = useState({
        id:''
    })
    
    const {id} = useParams()
    
    useEffect(() => {
        axios.post(`${BASE_URL}/getProductsByID`,{id}) 
        .then(res => {
            console.log(res)
            setProductsData(res.data.data.result[0])
        })
    },[id]);
    const submit = (e) => {
        e.preventDefault()
        
        const dataFile = new FormData();
        const files = {...e.target.image.files};
        
        // console.log(files)
        
        dataFile.append('caption', productsData.name)
        dataFile.append('products_id', productsData.id)
        // L'image
        dataFile.append('files', files[0], files[0].name)
        // console.log(dataFile)
        axios.post(`${BASE_URL}/editPictures`, dataFile)
        .then((res)=> {
            console.log(res)
            res.data.response && console.log('succesfully upload');
            navigate("/getAllProducts")
        })
        .catch((err) => {
            console.log(err)
        })
    } 
    
    return (
        <Fragment>
            <h1>Ajouter image</h1>
            <form onSubmit={submit} encType="multipart/form-data">
                <label name='image'>
                
                    <input type='file' name='image'/>
                    <input type='submit' value='Submit'/>
                </label>
            </form>
        </Fragment>
    )
}

export default UploadFile

// <input type="text" name="caption" onChange={handleChange} value={productsData.caption} />