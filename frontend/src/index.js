import React from "react";
import ReactDOM from "react-dom/client";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';         // Quitar esto para restablecer diseño anterior
import "@fortawesome/fontawesome-free/css/all.min.css"; // Quitar esto para restablecer diseño anterior
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";


// Configuracion de opciones para mostrar mensaje de alerta en pantalla
const options = {
  timeout: 3000,
  position: positions.BOTTOM_CENTER,
  transitions: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>
);
