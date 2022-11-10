import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'

const Login = () => {
  return (
    <Fragment>
        <MetaData title={'Inicio de sesión'} />
        <div className='row wrapper'>
            <div className='col-10 col-lg-5'>
                <form className='shadow-lg'>
                    <h1 className='mb-3 text-center'>Inicio de sesión</h1>
                    {/* Campo para email */}
                    <div className='form-group'>
                        <label htmlFor='email_field'>Correo electronico</label>
                        <input type='email' id='email_field' className='form-control'></input>
                    </div>
                    {/* Campo para password */}
                    <div className='form-group'>
                        <label htmlFor='password_field'>Contraseña</label>
                        <input type='password' id='password_field' className='form-control'></input>
                    </div>
                    {/* Link para Olvido de contraseña */}
                    <Link to='/forgotPassword' className='float-right mb-4'>Olvidé mi contraseña</Link>
                    {/* Boton para login */}
                    <button id='login_button' type='submit' className='btn btn-block py-3'>Login</button>
                    {/* Link para registrarse */}
                    <hr />
                    <Link to='/usuario/registro' className='float-right mb-3 text-danger'>No tienes una cuenta? Registrate</Link>
                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default Login