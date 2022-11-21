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
    OUTOFSTOCK_PRODUCTS_SUCCESS,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL
} from '../constants/productsConstants';

// Reducer para la interaccion con varios productos (Ver todos los productos con filtros y sin filtros)
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

// Reducer para la interaccion con los productos disponibles
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

// Reducer para la interaccion con los productos agotados
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

// Reducer para la interaccion con el detalle de un producto
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

// Reducer para la interaccion con la creacion de un producto
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

// Reducer para la interaccion con un producto (Actualizar y eliminar)
export const productReducer = ( state = {}, action) => {
    switch(action.type) {
        
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return{
                ...state,
                loading: true
            }
        
        case DELETE_PRODUCT_SUCCESS:
            return{
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case UPDATE_PRODUCT_SUCCESS:
            return{
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return{
                ...state,
                error: action.payload
            }
        
        case UPDATE_PRODUCT_RESET:
            return{
                ...state,
                isUpdated: false
            }
        
        case CLEAR_ERRORS:
            return{
                error: null
             }
        
        default:
            return state;
    }
}

// Reducer para la interaccion con la creacion de un nuevo review
export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {

        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

// Reducer para la interaccion con la visualizacion de reviews de un producto
export const productReviewsReducer = (state = { opiniones: [] }, action) => {
    switch (action.type) {

        case GET_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_REVIEWS_SUCCESS:
            return {
                loading: false,
                opiniones: action.payload
            }

        case GET_REVIEWS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

// Reducer para la interaccion con la eliminacion de reviews de un producto
export const reviewReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_REVIEW_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}