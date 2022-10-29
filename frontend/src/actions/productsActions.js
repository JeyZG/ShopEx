import axios from 'axios';

import { 
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/productsConstants';

export const getProducts = () => async (dispath) => {
    try{
        dispath({type: ALL_PRODUCTS_REQUEST});
        // Cargar la info de los productos en la variable data
        const {data} = await axios.get('/api/productos');
        dispath({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        });
    }   catch(error){
        dispath({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        });
    }
}

export const getProductDetails = (id) => async (dispath) => {
    try{
        dispath({type: PRODUCT_DETAILS_REQUEST});
        // Cargar la info de los productos en la variable data
        const {data} = await axios.get(`/api/producto/${id}`);
        dispath({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        });
    }   catch(error){
        dispath({
            type:PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        });
    }
}

// Clear errors
export const clearErrors = () => async(dispath) => {
    dispath({
        type: CLEAR_ERRORS
    });
}
