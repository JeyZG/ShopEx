import './App.css';
import React from 'react';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
