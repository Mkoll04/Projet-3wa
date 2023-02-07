import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {useState} from "react"

const AddProducts = () => {
    const [productsData, setProductsData] = useState({
        name:'',
        description:'',
        price:'',
        categories_id:''
    })
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setProductsData({...productsData,[name]:value})
    }
    
    const submit = (e) => {
        e.preventDefault()
        axios.post(`${BASE_URL}/addProducts`,{
           name : productsData.name,
           description: productsData.description,
           price: productsData.price,
           categories_id: productsData.categories_id
           
       })
    }
    
    
    return(
        <form onSubmit={submit}>
            <input type='text' placeholder='name' name='name' onChange={handleChange} value={productsData.name} />
            <input type='text' placeholder='description' name='description' onChange={handleChange} value={productsData.description} />
            <input type='text' placeholder='price' name='price' onChange={handleChange} value={productsData.price} />
            <input type='text' placeholder='categories' name='categories_id' onChange={handleChange} value={productsData.categories_id} />
            <input type='submit' />
        </form>    
    )
}

export default AddProducts