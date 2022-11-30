import React, { Fragment } from 'react'
import "../../App.css"
import { Link } from "react-router-dom"
import Search from './Search'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logoutUser } from '../../actions/userActions'

const Header = () => {
    const {cartItems} = useSelector(state => state.cart)
    const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading } = useSelector( state => state.auth )

    const logoutHandler = () => {
        dispatch(logoutUser());
        alert.success("Cierre de sesion exitoso!");
    }
    return (
        <Fragment>
            <nav className='navbar row'>
                <div className='col-12 col-md-3'>
                    <div className='navbar-brand ml-5'>
                        <Link to="/"><img src='../images/shopex_logo.png' alt='ShopEx Logo' width='100px'/></Link>
                    </div>
                </div>
                <div className='col-12 col-md-5 mt-2 mt-md-0'>
                    {/* Componente Buscador */}
                    <Search />
                </div>
                
                <div className='col-12 col-md-4 mt-4 mt-md-0 text-center'>
                    {/* Carrito de compras */}
                    <Link to="/carrito"><i className="fa fa-shopping-cart fa-2x text-white" aria-hidden="false"></i>
                        <span className="ml-1" id="cart_count">{cartItems.length}</span>
                    </Link>
                    
                    {/* Si el usuario esta logueado muestra nombre y menu, si no muestra boton Login */ }
                    { user ? (
                    
                        <div className="ml-4 dropdown d-inline">
                            <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button"
                                id="dropDownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <figure className='avatar avatar-nav'>
                                    <img
                                    src={user.avatar && user.avatar.url}
                                    alt={user && user.nombre}
                                    className='rounded-circle'></img>
                                </figure>
                                <span>{user && user.nombre}</span>
                            </Link>
                            <div className='dropdown-menu' aria-labelledby='dropDownMenu'>
                                {/* Mostrar dashboard solo si es usuario admin*/ }
                                { user && user.role === 'admin' && (
                                    <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                )}
                                {/* Mostrar myOrders solo si es usuario user*/ }
                                { user && user.role === 'user' && (
                                    <Link className="dropdown-item" to="/myOrders">Mis pedidos</Link>
                                )}
                                
                                <Link className="dropdown-item" to="/myAccount">Mi cuenta</Link>
                                <Link className="dropdown-item" to="/" onClick={logoutHandler}>Cerrar Sesion</Link>
                            </div>
                        </div>
                    ) : !loading && <Link to="/login" className='btn ml-4' id="login_btn">Login</Link>}
                </div>
            </nav>
        </Fragment>
    )
}

export default Header