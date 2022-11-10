import './App.css';
import React from 'react';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Home } from "./components/Home";
import { ProductDetails } from './components/products/ProductDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';
import Cart from './components/cart/Cart';
import ProductEdit from './components/products/ProductEdit';
import Login from './components/user/Login';

function App() {
	return (
		<Router>
			<div className="App">
				{/*Carga del Header*/}
				<Header />
				
				{/*Carga de las diferentes rutas*/}
				<div className='container container-fluid'>
					<Routes>
						{/* Abre el contenido de Home.js en las rutas / y /Home */}
						{['', 'Home'].map(path => <Route path={path} element={<Home />} />)}
						
						{/* Abre el contenido de productDetails.js en las rutas /producto/id */}
						<Route path="/producto/:id" element={<ProductDetails />}/>

						{/* Abre el contenido de Dashboard.js en las rutas /dashboard */}
						<Route path="/dashboard" element={<Dashboard />}/>

						{/* Abre el contenido de ProductList.js en las rutas /listaProductos */}
						<Route path="/listaProductos" element={<ProductsList />}/>

						{/* Abre el contenido de NewProduct.js en las rutas /nuevoProducto */}
						<Route path="/nuevoProducto" element={<NewProduct />}/>

						{/* Abre el contenido de ProductEdit.js en las rutas /producto/modificar */}
						<Route path="/editar/producto/:id" element={<ProductEdit />}/>

						{/* Abre el contenido de Cart.js en las rutas /carrito */}
						<Route path="/carrito" element={<Cart />}/>

						{/* Abre la pagina con los productos resultantes del buscador segun una palabra clave */}
						<Route path="/search/:keyword" element={<Home />}/>

						{/* Abre la pagina para hacer el login de usuario */}
						<Route path="/login" element={<Login />}/>
						
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
