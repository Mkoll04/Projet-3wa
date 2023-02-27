import React from "react"
const StoreContext = React.createContext([]);

const initialState = {
    allProducts:[],
    user:{
        isLogged: false,
        isAdmin: false,
        id:null
    },
    cart:[]

}

export {StoreContext, initialState}