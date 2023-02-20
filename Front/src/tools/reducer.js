
const reducer = (state, action) =>{
    switch(action.type){
        
        case 'INIT_PRODUCTS' :
            return{
                ...state,
                allProducts:action.payload
            }
        
        case 'UPDATE_PRODUCT' :
            return{
                ...state,
                allProducts:action.payload
            }
        
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
                Log_in: true
            }
        
        case "LOGOUT":
            return {
                ...state,
                user: {},
                Log_in: false
            }        
        
        case "ADD_TO_CART":
            return{
                ...state,
                cart:action.payload
            }
        
        
        
        default:
            return state
    }
}

export {reducer}