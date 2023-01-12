import React from "react"
const StoreContext = React.createContext([]);

const initialState = {
    count:0
}

export {StoreContext, initialState}