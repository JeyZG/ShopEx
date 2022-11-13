import React, { Fragment } from 'react'
import MetaData from '../layout/MetaData'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserProfile = () => {
	
	const { user, loading } = useSelector(state => state.auth)

	return (
		<Fragment>
            {loading ? <span className='loader'></span> : (
                <Fragment>
                    <MetaData title={"Mi perfil"} />

                    <h2 className="mt-5 ml-5">Mi Perfil</h2>
                    <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3">
                            <figure className='avatar avatar-profile'>
                                <img className="rounded-circle img-fluid" src={user.avatar.url} alt={user.nombre} />
                            </figure>
                            <Link to="/myAccount/updateProfile" id="edit_profile" className="btn btn-primary btn-block my-5">
                                Editar Perfil
                            </Link>
                        </div>

                        <div className="col-12 col-md-5">
                            <h4>Nombre Completo</h4>
                            <p>{user.nombre}</p>

                            <h4>Email</h4>
                            <p>{user.email}</p>

                            <h4>Registrado el: </h4>
                            <p>{String(user.fechaRegistro).substring(0, 10)}</p>

                            {user.role !== 'admin' && (
                                <Link to="/myOrders" className="btn btn-danger btn-block mt-5">
                                    Mis Pedidos
                                </Link>
                            )}

                            <Link to="/myAccount/updatePassword" className="btn btn-primary btn-block mt-3">
                                Cambiar contraseña
                            </Link>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
	)
}

export default UserProfile