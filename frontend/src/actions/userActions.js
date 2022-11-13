import axios from 'axios';

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    CLEAR_ERRORS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL
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

// Acciones para carga de info de usuarios
export const loadUser = () => async (dispatch) => {
    try{
        dispatch({
            type: LOAD_USER_REQUEST
        });

        const {data} = await axios.get('/api/myAccount')

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        });
    }catch(error){
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        });
    }
}
/* ******************************************************* */

// Acciones para cerrar sesion de usuarios
export const logoutUser = () => async (dispatch) => {
    try{
        
        await axios.get('/api/logout')
        
        dispatch({
            type: LOGOUT_SUCCESS,
        });
    }catch(error){
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        });
    }
}
/* ******************************************************* */

// Acciones para actualizar info de usuarios
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ 
            type: UPDATE_PROFILE_REQUEST
        });

        const config={
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const {data} = await axios.put('/api/myAccount/updateProfile', userData, config)

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.user
        })
    }
    catch (error) { 
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

/* ******************************************************* */

// Acciones para actualizar el password
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ 
            type: UPDATE_PASSWORD_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.put('/api/myAccount/updatePassword', passwords, config)

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.user
        })
    }
    catch (error) { 
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}
/* ******************************************************* */

// Acciones para solicitar restablecer contraseña
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ 
            type: FORGOT_PASSWORD_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/forgotPassword', email, config)

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.user
        })
    }
    catch (error) { 
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}
/* ******************************************************* */

// Acciones para restablecer password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ 
            type: NEW_PASSWORD_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post(`/api/resetPassword/${token}`, passwords, config)

        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.user
        })
    }
    catch (error) { 
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}
/* ******************************************************* */

// Acciones para limpiar errores
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
}
/* ******************************************************* */