import {INITIATE_PRODUCTS,INITIATE_USER} from "../Actions/actions.js";

const initialState={
    products:[],
    user:null
}

function reducer(state=initialState,action){
    switch(action.type){
        case INITIATE_PRODUCTS:
        {   const products=action.payload
            console.log('reducer logs',products)
            return{
                ...state,products:products.products
            }
        }
        case INITIATE_USER:
        {   const user=action.payload
            console.log('reducer logs',user)
            return{
                ...state,user:user
            }
        }

    }
}

export default reducer;