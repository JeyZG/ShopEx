import axios from 'axios';
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
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    OUTOFSTOCK_PRODUCTS_REQUEST,
    OUTOFSTOCK_PRODUCTS_SUCCESS,
    OUTOFSTOCK_PRODUCTS_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
} from '../constants/productsConstants';

// Acciones para obtener el listado completo de productos, habilitado para aplicar filtros
export const getProducts = (currentPage = 1, keyword = '', precio) => async (dispatch) => {
    try{
        dispatch({
            type: ALL_PRODUCTS_REQUEST
        });
        
        // Cargar la info de los productos en la variable data que depende de los filtros que se hagan
        let link = `/api/productos?keyword=${keyword}&page=${currentPage}&precio[gte]=${precio[0]}&precio[lte]=${precio[1]}`
        
        const { data } = await axios.get(link);

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        });
    }   catch(error){
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        });
    }
}

// Acciones para obtener el listado de productos disponibles, sin aplicar filtros
export const getAvaliableProducts = () => async (dispatch) => {
    try{
        dispatch({
            type: AVALIABLE_PRODUCTS_REQUEST
        });
        
        // Cargar la info de los productos disponibles
        const {data} = await axios.get('/api/avaliableProducts');

        dispatch({
            type: AVALIABLE_PRODUCTS_SUCCESS,
            payload: data
        });
    }   catch(error){
        dispatch({
            type: AVALIABLE_PRODUCTS_FAIL,
            payload: error.response.data.message
        });
    }
}

// Acciones para obtener el listado de productos disponibles, sin aplicar filtros
export const getOutOfStockProducts = () => async (dispatch) => {
    try{
        dispatch({
            type: OUTOFSTOCK_PRODUCTS_REQUEST
        });
        
        // Cargar la info de los productos agotados
        const {data} = await axios.get('/api/outOfStockProducts');

        dispatch({
            type: OUTOFSTOCK_PRODUCTS_SUCCESS,
            payload: data
        });
    }   catch(error){
        dispatch({
            type: OUTOFSTOCK_PRODUCTS_FAIL,
            payload: error.response.data.message
        });
    }
}

// Acciones para obtener el detalle de un producto
export const getProductDetails = (id) => async (dispatch) => {
    try{
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        });
        
        // Cargar la info de los productos en la variable data
        const {data} = await axios.get(`/api/producto/${id}`);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        });
    }   catch(error){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        });
    }
}

// Acciones para agregar un producto nuevo
export const newProduct = ( productData ) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_PRODUCT_REQUEST
        });

        const config = {
            header: { 'Content-Type': 'multipart/form-data'}
        }

        const { data } = await axios.post('/api/producto/nuevo', productData, config)

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type:NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        });
    }
}

// Acciones para ver la lista de productos sin filtros
export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_PRODUCTS_REQUEST
        });

        const { data } = await axios.post('/api/admin/productos')

        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message
        });
    }
}

// Acciones para eliminar un producto
export const deleteProduct = (id) => async(dispatch)=>{
    try{
        dispatch ({
            type: DELETE_PRODUCT_REQUEST
        });
        
        const {data} = await axios.delete(`/api/producto/${id}`)

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })
    } catch(error){
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Acciones para actualizar un producto
export const updateProduct = (id, productData) => async (dispatch) =>{
    try{
        dispatch ({
            type: UPDATE_PRODUCT_REQUEST
        });

        const config={
            headers: {
                "Content-Type": "application/json"
            }
        }
        const {data} = await axios.put(`/api/producto/${id}`, productData, config)

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch(error){
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Acciones para registar una review
export const newReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ 
            type: NEW_REVIEW_REQUEST 
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put('/api/producto/review/new', reviewData, config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

// Limpiar los errores
export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
}