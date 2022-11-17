import './App.css';
import React, { useEffect } from 'react';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Home } from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './store';
import { ProductDetails } from './components/products/ProductDetails';
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';
import Cart from './components/cart/Cart';
import Login from './components/user/Login';
import Register from './components/user/Register';
import UserProfile from './components/user/UserProfile';
import { UpdateProfile } from './components/user/UpdateProfile';
import { UpdatePassword } from './components/user/UpdatePassword';
import { ForgotPassword } from "./components/user/ForgotPassword"
import { NewPassword } from './components/user/NewPassword';
import { AvaliableProducts } from './components/admin/AvaliableProducts';
import { OutOfStockProducts } from './components/admin/OutOfStockProducts';
import { loadUser } from './actions/userActions';
import ProtectedRoute from './routes/ProtectedRoute';
import { UpdateProduct } from './components/admin/UpdateProduct';
import { Shipping } from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import Success from './components/cart/Success';
import { ListOrder } from './components/order/ListOrder';
import OrderDetails from './components/order/OrderDetails';

function App() {

	useEffect( () => {
		store.dispatch(loadUser())
	}, [])

	return (
		<Router>
			<div className="App">
				{/*Carga del Header*/}
				<Header />
				
				{/*Carga de las diferentes rutas*/}
				<div className='container container-fluid'>
					<Routes>
						{/* Abre el contenido de Home.js en las rutas /,  /Home y /search/:keyword */}
						{['', 'Home', 'search/:keyword'].map(path => <Route path={path} element={<Home />} />)}
						
						{/* Abre la pagina con los productos resultantes del buscador segun una palabra clave */}
						{/* <Route path="/search/:keyword" element={<Home />}/> */}

						{/* Abre el contenido de ProductDetails.js en la ruta /producto/id */}
						<Route path="/producto/:id" element={<ProductDetails />}/>

						{/* Abre el contenido de ProductList.js en la ruta /listaProductos */}
						<Route path="/listaProductos" element={<ProductsList />}/>

						{/* Abre el contenido de Cart.js en las rutas /carrito */}
						<Route path="/carrito" element={<Cart />}/>

						{/* Abre la pagina para hacer el login de usuario */}
						<Route path="/login" element={<Login />}/>

						{/* Abre la pagina para hacer el registro de usuario */}
						<Route path="/register" element={<Register />}/>

						{/* Abre la pagina para solicitar restablecer password del usuario */}
						<Route path="/forgotPassword" element={<ForgotPassword />}/>
            			
						{/* Abre la pagina para restablecer password del usuario */}
						<Route path="/resetPassword/:token" element={<NewPassword />}/>

						{/* ****** RUTAS PROTEGIDAS ****** */}

						{/* ****** USUARIOS LOGUEADOS ****** */}

						{/* Abre la pagina para ver perfil del usuario */}
						<Route path="/myAccount" element={<ProtectedRoute><UserProfile /></ProtectedRoute>}/>
						
						{/* Abre la pagina para actualizar perfil del usuario */}
						<Route path="/myAccount/updateProfile" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>}/>

						{/* Abre la pagina para actualizar el password del usuario */}
						<Route path="/myAccount/updatePassword" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>}/>
						
						{/* Abre el contenido de Shipping.js en las rutas /shipping*/}
						<Route path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>} />

						{/* Abre el contenido de ConfirmOrder.js en las rutas /order/confirm*/}
						<Route path="/order/confirm" element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />

						{/* Abre el contenido de OrderDetails.js en las rutas /order/id*/}
						<Route path="/order/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />

						{/* Abre el contenido de Payment.js en las rutas /payment*/}
						<Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />

						{/* Abre el contenido de Payment.js en las rutas /success*/}	
						<Route path="/success" element={<ProtectedRoute><Success /></ProtectedRoute>} />
						
						{/* ****** SOLO USERS ****** */}

						{/* Abre el contenido de ListOrder.js en las rutas /myOrders*/}
						<Route path="/myOrders" element={<ProtectedRoute isAdmin={false}><ListOrder /></ProtectedRoute>} />

						{/* ****** SOLO ADMIN ****** */}
						
						{/* Abre el contenido de Dashboard.js en la ruta /dashboard */}
						<Route path="/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>}/>

						{/* Abre el contenido de AvaliableProductList.js en las rutas /productosDisponibles */}
						<Route path="/productosDisponibles" element={<ProtectedRoute isAdmin={true}><AvaliableProducts /></ProtectedRoute>}/>

						{/* Abre el contenido de OutOfStockProductList.js en las rutas /productosAgotados */}
						<Route path="/productosAgotados" element={<ProtectedRoute isAdmin={true}><OutOfStockProducts /></ProtectedRoute>}/>
					
						{/* Abre el contenido de NewProduct.js en las rutas /nuevoProducto */}
						<Route path="/nuevoProducto" element={<ProtectedRoute isAdmin={true}><NewProduct /></ProtectedRoute>}/>

						{/* Abre el contenido de UpdateProduct.js en las rutas /editar/producto/id */}
						<Route path="/editar/producto/:id" element={<ProtectedRoute isAdmin={true}><UpdateProduct /></ProtectedRoute>} />

						{/* Forma Habitual
						<Route path="/" element={<Home />}/>
						<Route path="/Home" element={<Home />}/>
						*/}
					</Routes>
				</div>
				
				{/*Carga del Footer*/}
				<Footer />
			</div>
		</Router>
	);
}

export default App;
