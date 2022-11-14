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

// Acciones para obtener el listado completo de productos, habilitado para aplicar filtros
export const getProducts = (currentPage = 1, keyword = '', precio) => async (dispath) => {
    try{
        dispath({type: ALL_PRODUCTS_REQUEST});
        
        // Cargar la info de los productos en la variable data que depende de los filtros que se hagan
        let link = `/api/productos?keyword=${keyword}&page=${currentPage}&precio[gte]=${precio[0]}&precio[lte]=${precio[1]}`
        const {data} = await axios.get(link);

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

// Acciones para obtener el detalle de un producto
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

// Limpiar los errores
export const clearErrors = () => async(dispath) => {
    dispath({
        type: CLEAR_ERRORS
    });
}