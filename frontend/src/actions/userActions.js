import axios from 'axios';

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants'

/* ************** AUTENTICACION DE USUARIOS ************** */

// Acciones para login de usuario
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        });

        // Para extraer la info de la coockie que viene en el header
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/login', {email, password}, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        });

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        });
    } 
}

// Acciones para registro de usuarios
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: REGISTER_USER_REQUEST
        });

        // Para extraer la info de la coockie que viene en el header
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const {data} = await axios.post('/api/usuario/registro', userData, config)

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        });

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        });
    } 
}
/* ******************************************************* */
// Limpiar errores
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
}
