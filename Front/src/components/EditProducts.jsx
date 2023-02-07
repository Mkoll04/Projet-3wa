import {useState, useEffect, Fragment} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"

const EditArticles = () => {
    const [productsByID, setProductsByID] = useState(null)
    const {id} = useParams()
    
    useEffect(() => {
        axios.post(`${BASE_URL}/getProductsByID`,{id})
            .then(res => setProductsByID(res.data.result[0]))
            .catch(err => console.log(err))
    },[id])
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setProductsByID({...productsByID, [name]: value})
    }
    
    const submit = (e) =>{
        e.preventDefault()
        axios.post(`${BASE_URL}/editProducts`,{...productsByID})
    } 
    
    return (
        <Fragment>
            {productsByID !== null && (
                <form onSubmit={submit}>
                    <input type="text" placeholder='name' name='name' onChange={handleChange} value={productsByID.name} />
                    <input type="text" placeholder='description' name='description' onChange={handleChange} value={productsByID.description} />
                    <input type="text" placeholder='price' name='price' onChange={handleChange} value={productsByID.price} />
                    <input type='submit' />
                </form>
            )}
        </Fragment>
    )
}

export default EditArticles