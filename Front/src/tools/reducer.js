
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
        case "UPDATE_USER":
            return{
                ...state,
                user:{
                    ...state.user,
                    adress:action.payload
                }
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
            // on creer une copie de travail
            const data = state.cart
            // on verifie si le produit est deja dans le panier
            const isInCart = data.find(e => e.id === action.payload.id)
            // si il est pas dans le panier on l'ajoute
            if(!isInCart) data.push(action.payload)
            return{
                ...state,
                cart: data
                
            }
            
        case "INIT_CART":
            return{
                ...state,
                cart: [...action.payload]
                
            }
            
        case "REMOVE_CART":
            return{
                ...state,
                cart:[action.payload]
            }
        
        case "DELETE_CART":
            return{
                ...state,
                cart:[]
            }
        case "UPDATE_ADDRESS":
            return{
                ...state,
                user:{
                    ...state.user,
                    adress:action.payload
                }
            }
        default:
            return state
    }
}

export {reducer}