import React from "react"
const StoreContext = React.createContext([]);

const initialState = {
    allProducts:[],
    
    user:{},
    Log_in: false,
    
    cart:[]

}

export {StoreContext, initialState}