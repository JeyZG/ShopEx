import React, { Fragment, useEffect } from 'react'
import Metadata from './layout/Metadata'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productsActions'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'

export const Home = () => {
	// TODO: Corregir el state.products
	const { loading, productos, error } = useSelector( state => state.products)
	const alert = useAlert();

	const dispath = useDispatch() ;
	useEffect( () => {

		if (error){
			return alert.error();
		}

		dispath(getProducts());
	}, [dispath]);

  	return (
		<Fragment>
			{/* Aqui cargamos un loader mientras se extraen todos los productos de la base de datos */}
			{loading ? <span class="loader"></span> : (
				<Fragment>
					<Metadata title="La tecnologia a tu alcance"></Metadata>
					<center><h1 className='mt-3' id='encabezado_productos'>Ultimos Productos</h1></center>
					<section id='productos' className='container mt-3'>
						<div className='row'>
							{/* Mapeo de la info que viene del arreglo de productos y la repite tantas veces sea necesario*/}
							{productos && productos.map (producto => (
								<div key={producto._id} className='col-sm-12 col-md-6 col-lg-3 my-3'>
									<div className='card text-center border-danger p-3 rounded'>
										<img className='card-img-top mx-auto' src={producto.imagen[0].url} alt={producto.nombre} title={producto.nombre} />
										<div className='card-body d-flex flex-column'>
											<h5 id='titulo_producto'><Link to={`/producto/${producto._id}`}>{producto.nombre}</Link></h5>
											<div className='rating mt-auto'>
												<div className='rating-outer'>
													<div className='rating-inner' style={{width:`${(producto.calificacion/5)*100}%`}}>
													</div>    
												</div>
												<span className='ml-1' id='No_de_opiniones'>{producto.numCalificaciones} reviews</span>
											</div>
											<p className='card-text'>{producto.marca}</p>
											<p className='card-text'>$ {producto.precio}</p>
											<Link to={`/producto/${producto._id}`} id='view_btn' className='btn btn-block'>Ver detalle</Link>
										</div>
									</div>
								</div>
							))}
						</div>
					</section>
				</Fragment>
			)}
		</Fragment>
  )
}

export default Home