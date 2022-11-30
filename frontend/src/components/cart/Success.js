import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'


export const Success = () => {

    const { loading } = useSelector( state => state.newOrder)

    return (
        <Fragment>
				{/* Aqui cargamos un loader mientras se extraen todos los productos de la base de datos */}
				{loading ? ( <span className="loader"></span>) : (
                    <Fragment>

                    <MetaData title={'Order Success'} />
        
                    <div className="row justify-content-center">
                        <div className="col-6 mt-5 text-center">
                            <img className="my-5 img-fluid d-block mx-auto" src="/images/orderOk.jpeg" alt="Exito!" width="200" height="200" />
        
                            <h2>Su orden ha sido registrada con éxito, pronto estaremos en contacto</h2>
        
                            <Link to="/" className="btn btn-success ml-4">Volver al inicio</Link>
                        </div>
        
                    </div>
        
                </Fragment>
                )}
        </Fragment>
        
    )
}

export default Success;