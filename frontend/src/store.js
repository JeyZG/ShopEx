import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsReducer, productDetailsReducer } from './reducer/productsReducer';
import { authReducer, forgotPasswordReducer, userReducer } from './reducer/userReducer';
import { cartReducer } from './reducer/cartReducer';

const reducer = combineReducers({
    products:productsReducer,
    productDetails:productDetailsReducer,
    auth:authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer
});

let initialState = {

    // Se crea la memoria temporal para el carrito de compras
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : []
    }
};

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;