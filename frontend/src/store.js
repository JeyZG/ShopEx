import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {productsReducer, 
        productReducer, 
        productDetailsReducer, 
        avaliableProductsReducer, 
        newProductReducer, 
        outOfStockProductsReducer, 
        newReviewReducer, 
        productReviewsReducer, 
        reviewReducer } from './reducer/productsReducer';
import { authReducer,
         forgotPasswordReducer, 
         userReducer, 
         allUsersReducer, 
         userDetailsReducer } from './reducer/userReducer';
import { cartReducer } from './reducer/cartReducer';
import { allOrdersReducer, 
         myOrdersReducer, 
         newOrderReducer, 
         orderDetailsReducer, 
         orderReducer } from './reducer/orderReducer';

const reducer = combineReducers({
    products: productsReducer,
    product: productReducer,
    avaliableProducts: avaliableProductsReducer,
    outOfStockProducts:outOfStockProductsReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer
});

let initialState = {

    // Se crea la memoria temporal para el carrito de compras
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    }
};

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;