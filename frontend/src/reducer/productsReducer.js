import { 
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    AVALIABLE_PRODUCTS_REQUEST,
    AVALIABLE_PRODUCTS_SUCCESS,
    AVALIABLE_PRODUCTS_FAIL,
    CLEAR_ERRORS,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_RESET,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    OUTOFSTOCK_PRODUCTS_REQUEST,
    OUTOFSTOCK_PRODUCTS_FAIL,
    OUTOFSTOCK_PRODUCTS_SUCCESS
} from '../constants/productsConstants';

export const productsReducer = ( state = { products : [] }, action) => {
    switch(action.type) {
        
        case ALL_PRODUCTS_REQUEST:
        case ADMIN_PRODUCTS_REQUEST:
            return{
                loading: true,
                products: []
            }
        
        case ALL_PRODUCTS_SUCCESS:
            
            return{
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resPerPage: action.payload.resPerPage,
                filteredProductsCount: action.payload.filteredProductsCount
            }
        
        case ADMIN_PRODUCTS_SUCCESS:
        return{
            loading: false,
            count: action.payload.count,
            products: action.payload.products
        }
        case ALL_PRODUCTS_FAIL:
        case ADMIN_PRODUCTS_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
             }
        
        default:
            return state;
    }
}

export const avaliableProductsReducer = ( state = {avaliableProducts : []}, action) => {
    
    switch(action.type) {
        case AVALIABLE_PRODUCTS_REQUEST:
            return{
                loading: true,
                avaliableProducts: []
            }
        
        case AVALIABLE_PRODUCTS_SUCCESS:
            return{
                loading: false,
                count: action.payload.count,
                avaliableProducts: action.payload.avaliableProducts
            }
        
        case AVALIABLE_PRODUCTS_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
             }
        
        default:
            return state;
    }
}

export const outOfStockProductsReducer = ( state = {outOfStockProducts : []}, action) => {
    
    switch(action.type) {
        case OUTOFSTOCK_PRODUCTS_REQUEST:
            return{
                loading: true,
                outOfStockProducts: []
            }
        
        case OUTOFSTOCK_PRODUCTS_SUCCESS:
            return{
                loading: false,
                count: action.payload.count,
                outOfStockProducts: action.payload.outOfStockProducts
            }
        
        case OUTOFSTOCK_PRODUCTS_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
             }
        
        default:
            return state;
    }
}

export const productDetailsReducer = ( state = { product: {}}, action) => {
    switch(action.type) {
        
        case PRODUCT_DETAILS_REQUEST:
            return{
                ...state,
                loading: true
            }
        
        case PRODUCT_DETAILS_SUCCESS:
            return{
                loading: false,
                product: action.payload.product
            }
        
        case PRODUCT_DETAILS_FAIL:
            return{
                ...state,
                error: action.payload
            }
        
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
             }
        
        default:
            return state;
    }
}

export const newProductReducer = (state = { product: {} }, action) => {
    switch(action.type){

        case NEW_PRODUCT_REQUEST:
            return{
                ...state,
                loading: true,
            }
        
        case NEW_PRODUCT_SUCCESS:
            return{
                loading: false,
                success: action.payload.success,
                product: action.payload.product
            }
        
        case NEW_PRODUCT_RESET:
            return{
                ...state,
                success: false,
                loading: false
            }
        
        case NEW_PRODUCT_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
                }
        default:
            return state;
    }
}