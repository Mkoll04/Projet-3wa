import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
/*import React from "react"
import {StoreContext} from "./context.js"*/
import './App.css';
import Home from "./components/Home.jsx"
import Login from "./components/Login.jsx"
import UploadFile from "./components/UploadFile.jsx"
import Nav from "./components/Nav.jsx"
import AddProducts from "./components/AddProducts.jsx"
import GetAllProducts from "./components/GetAllProducts.jsx"
import EditProducts from "./components/EditProducts.jsx"
import Error404 from "./components/Error404.jsx"

function App() {
    //const  [state, dispatch] = React.useContext(StoreContext);
 
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element = {<Home />} />
                <Route path="/login" element = {<Login />} />
                <Route path="/upload" element = {<UploadFile />} />
                <Route path="/addProducts" element = {<AddProducts />} />
                <Route path="/getAllProducts" element = {<GetAllProducts />} />
                <Route path ="/editProducts/:id" element = {<EditProducts />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

