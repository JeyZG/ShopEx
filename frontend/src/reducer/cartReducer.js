import { 
    ADD_TO_CART, 
    REMOVE_ITEM_CART,
    SAVE_SHIPPING_INFO
} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {

        case ADD_TO_CART:
            // Se recibe la info del items desde el payload flotante (estado temporal)
            const item = action.payload;
            // Verificamos si ese item existe ya en el carrito...
            const isItemExist = state.cartItems.find(i => i.product === item.product)

            // si existe regresa un estado y los items del carrito separados...
            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.product === isItemExist.product ? item : i)
                }
            // Si no existe regresa us estado y agrega el producto a la lista de productos del carrito
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case REMOVE_ITEM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i.product !== action.payload)
            }
        
        case SAVE_SHIPPING_INFO:
            return{
                ...state,
                shippingInfo: action.payload
            }

        default:
            return state
    }
}