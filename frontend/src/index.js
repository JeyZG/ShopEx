import React from "react";
import ReactDOM from "react-dom/client";
//import 'mdb-react-ui-kit/dist/css/mdb.min.css';         // Quitar esto para restablecer diseño anterior
//import "@fortawesome/fontawesome-free/css/all.min.css"; // Quitar esto para restablecer diseño anterior
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { Toaster } from 'react-hot-toast';

// Configuracion de opciones para mostrar mensaje de alerta en pantalla
const options = {
  timeout: 4000,
  position: positions.TOP_CENTER,
  transitions: transitions.FADE,
  offset: '20px'
  
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
	<AlertProvider template={AlertTemplate} {...options}>
	<Toaster
		position="top-center"
		reverseOrder={false}
		gutter={8}
		containerClassName=""
		containerStyle={{}}
		toastOptions={{
			// Define default options
			className: '',
			duration: 5000,
			style: {
			background: '#363636',
			color: '#fff',
			},

			// Default options for specific types
			success: {
				duration: 3000,
				theme: {
					primary: 'green',
					secondary: 'black',
				},
			},
			
		}}
		/>
	  <App />
	</AlertProvider>
  </Provider>
);
