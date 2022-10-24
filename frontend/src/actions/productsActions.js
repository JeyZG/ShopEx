import axios from 'axios';

import { 
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
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

// Clear errors
export const clearError = () => async(dispath) => {
    dispath({
        type: CLEAR_ERRORS
    });
}
