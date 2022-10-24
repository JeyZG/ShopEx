import React, { Fragment, useEffect } from 'react'
import Metadata from './layout/Metadata'
import { useDispatch } from 'react-redux'
import { getProducts } from '../actions/productsActions'

export const Home = () => {

	const dispath = useDispatch() ;
	useEffect(()=>{
		dispath(getProducts());
	}, [dispath]);

  	return (
		<Fragment>
			<Metadata title="La tecnologia a tu alcance"></Metadata>
			<center><h1 className='mt-3' id='encabezado_productos'>Ultimos Productos</h1></center>
			<section id='productos' className='container mt-5'>
				<div className='row'>
					{/* Primer producto */}
					<div className='col-sm-12 col-md-6 col-lg-3 my-3'>
						<div className='card p-3 rounded'>
							<img className='card-img-top mx-auto mx-auto' src='./images/detodito.png' alt='Detodito Natural' />
							<div className='card-body d-flex flex-column'>
								<h5 id='titulo_producto'><a href='http://localhost:3000'>De Todito Natural 400gr</a></h5>
								<div className='rating mt-auto'>
									<div className='rating-outer'>
										<div className='rating-inner'>
										</div>    
									</div>
									<span className='ml-3' id='No_de_opiniones'>15 reviews</span>
								</div>
								<p className='card-text'>$2.500</p>
								<a href='http://localhost:3000' id='view_btn' className='btn btn-block'>Ver detalle</a>
							</div>
						</div>
					</div>
					{/* Segundo producto */}
					<div className='col-sm-12 col-md-6 col-lg-3 my-3'>
						<div className='card p-3 rounded'>
							<img className='card-img-top mx-auto mx-auto' src='./images/lavado.png' alt='Lavado sencillo' />
							<div className='card-body d-flex flex-column'>
								<h5 id='titulo_producto'><a href='http://localhost:3000'>Lavado sencillo de automovil</a></h5>
								<div className='rating mt-auto'>
									<div className='rating-outer'>
										<div className='rating-inner'>
										</div>    
									</div>
									<span className='ml-3' id='No_de_opiniones'>55 reviews</span>
								</div>
								<p className='card-text'>$12.000</p>
								<a href='http://localhost:3000' id='view_btn' className='btn btn-block'>Ver detalle</a>
							</div>
						</div>
					</div>
					{/* Tercer producto */}
					<div className='col-sm-12 col-md-6 col-lg-3 my-3'>
						<div className='card p-3 rounded'>
							<img className='card-img-top mx-auto mx-auto' src='./images/plumillas.png' alt='Plumillas 14"' />
							<div className='card-body d-flex flex-column'>
								<h5 id='titulo_producto'><a href='http://localhost:3000'>Plumillas Bosch 14"</a></h5>
								<div className='rating mt-auto'>
									<div className='rating-outer'>
										<div className='rating-inner'>
										</div>    
									</div>
									<span className='ml-3' id='No_de_opiniones'>5 reviews</span>
								</div>
								<p className='card-text'>$22.800</p>
								<a href='http://localhost:3000' id='view_btn' className='btn btn-block'>Ver detalle</a>
							</div>
						</div>
					</div>
					{/* Cuarto producto */}
					<div className='col-sm-12 col-md-6 col-lg-3 my-3'>
						<div className='card p-3 rounded'>
							<img className='card-img-top mx-auto mx-auto' src='./images/sonax.png' alt='Cera Sonax' />
							<div className='card-body d-flex flex-column'>
								<h5 id='titulo_producto'><a href='http://localhost:3000'>Cera Sonax Premium Wax</a></h5>
								<div className='rating mt-auto'>
									<div className='rating-outer'>
										<div className='rating-inner'>
										</div>    
									</div>
									<span className='ml-3' id='No_de_opiniones'>55 reviews</span>
								</div>
								<p className='card-text'>$12.000</p>
								<a href='http://localhost:3000' id='view_btn' className='btn btn-block'>Ver detalle</a>
							</div>
						</div>
					</div>
				</div>
			</section>

		</Fragment>
  )
}

export default Home