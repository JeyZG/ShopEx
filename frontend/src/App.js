import './App.css';
import React from 'react';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Home } from "./components/Home";
import { ProductDetails } from './components/products/ProductDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/admin/Dashboard';

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

						{/* Abre el contenido de Dashboard.js en las rutas /admin/dashboard */}
						<Route path="/admin/dashboard" element={<Dashboard />}/>
						
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
