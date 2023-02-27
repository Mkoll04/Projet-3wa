
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
        /* user:{
                    isLogged:true,
                    isAdmin:action.payload.admin,
                    ...action.payload
                }
                */
        case "LOGIN":
            return {
                ...state,
                user: {
                    ...action.payload,
                    isAdmin:action.payload.admin,
                    isLogged: true
                },
            }
        
        case "LOGOUT":
            return {
                ...state,
                user: {
                    id:null,
                    isLogged: false,
                    isAdmin:false
                }
            }        
        
        case "ADD_TO_CART":
            return{
                ...state,
                cart: [...state.cart, action.payload]
                
            }
            
        case "INIT_CART":
            return{
                ...state,
                cart: [...action.payload]
                
            }
        
        case "DELETE_CART":
            return{
                ...state,
                cart:[...state.cart, action.payload]
            }
        
        default:
            return state
    }
}

export {reducer}