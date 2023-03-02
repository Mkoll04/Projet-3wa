import Home from "../components/Home.jsx"

import AddProducts from "../components/AddProducts.jsx"
import GetAllProducts from "../components/GetAllProducts.jsx"
import EditProducts from "../components/EditProducts.jsx"
import EditPictures from "../components/EditPictures.jsx"

import RegisterUser from "../components/RegisterUser.jsx"
import EditUser from "../components/EditUser.jsx"
import Login from "../components/Login.jsx"
import Logout from "../components/Logout.jsx"

import GetProducts from "../components/GetProducts.jsx"
import GetProductsById from "../components/GetProductsById.jsx"

import Cart from "../components/getCart.jsx"
import AddAdress from "../components/AddAdress.jsx"
import CommandeSuccess from "../components/CommandeSuccess.jsx"

import UpdateAddress from "../components/UpdateAdress.jsx"

import CreateMessage from "../components/CreateMessage.jsx"
import GetMessageByUser from "../components/GetMessageByUser.jsx"


import Error404 from "../components/Error404.jsx"

const routes = [
    {path:"/", component:<Home />},
    {path:"/addProducts",component:<AddProducts />, auth:"admin"},
    {path:"/getAllProducts",component:<GetAllProducts />},
    {path:"/editProducts/:id",component:<EditProducts />},
    {path:"/editPictures/:id",component:<EditPictures />},
    
    {path:"/registerUser",component:<RegisterUser />},
    {path:"/editUser/:id",component:<EditUser />},
    {path:"/login",component:<Login />},
    {path:"/logout",component:<Logout />},
   
    {path:"/products",component:<GetProducts />},
    {path:"/products/:id",component:<GetProductsById />},
    
    {path:"/cart",component:<Cart />},
    {path:"/adress", component: <AddAdress />},
    {path:"/commandeSuccess", component: <CommandeSuccess />},
    
    {path:"/updateAddress", component: <UpdateAddress />},
    
    {path:"/createMessage", component : <CreateMessage />},
    {path:"/getMessage", component : <GetMessageByUser />},
    
    {path:"*", component:<Error404 />}
]

export default routes

// auth:"admin"    


