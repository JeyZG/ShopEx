import axios from 'axios'
import { 
    ADD_TO_CART, 
    REMOVE_ITEM_CART, 
    SAVE_SHIPPING_INFO 
} from '../constants/cartConstants'

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    // Extraemos la informacion del producto
    const { data } = await axios.get(`/api/producto/${id}`)

    // Dispatch para el ADD TO CART
    dispatch({

        type: ADD_TO_CART,
        
        payload: {
            product: id,
            nombre: data.product.nombre,
            precio: data.product.precio,
            imagen: data.product.imagen[0].url,
            inventario: data.product.inventario,
            quantity
        }
    })

    // Seteamos en el LocalStorage del store.js el item añadido al carrito
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_ITEM_CART,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    })

    localStorage.setItem('shippingInfo', JSON.stringify(data))

}