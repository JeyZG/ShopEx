import { 
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_REQUEST, 
    CREATE_ORDER_FAIL, 
    CLEAR_ERRORS, 
    MY_ORDERS_REQUEST, 
    MY_ORDERS_SUCCESS, 
    MY_ORDERS_FAIL ,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL
} from "../constants/orderConstants";

// Reducer para la interaccion con la creacion de una orden
export const newOrderReducer = (state = {}, action)=>{
    switch (action.type){

        case CREATE_ORDER_REQUEST:
            return{
                ...state,
                loading: true
            }
        case CREATE_ORDER_SUCCESS:
            return{
                loading:false,
                success: action.payload.success,
                order: action.payload
            }
        case CREATE_ORDER_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }

            default:
                return state;
        }
}

// Reducer para la interaccion con la visualizacion de las ordenes de un usuario logueado
export const myOrdersReducer = (state = {orders:[]}, action)=>{
    switch (action.type){

        case MY_ORDERS_REQUEST:
            return{
                loading: true
            }
        case MY_ORDERS_SUCCESS:
            return{
                loading:false,
                orders: action.payload
            }
        case MY_ORDERS_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }

        default:
            return state;
    }
}

// Reducer para la interaccion con la visualizacion de los detalles de una orden
export const orderDetailsReducer = (state = {order:{}}, action)=>{
    switch (action.type){

        case ORDER_DETAILS_REQUEST:
            return{
                loading: true
            }
        case ORDER_DETAILS_SUCCESS:
            return{
                loading:false,
                order: action.payload
            }
        case ORDER_DETAILS_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }

        default:
            return state;
    }
}