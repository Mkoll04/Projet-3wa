const reducer = (state, action) =>{
    switch(action.type){
        case 'Incr':
            return {
                ...state,
                count:state.count+1
            }
                
        case 'Decr':

                
            return {
                ...state,
                count:state.count-1
            }

        default:
            return state;
    }
}

export {reducer}