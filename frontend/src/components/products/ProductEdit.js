import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from "../layout/MetaData"
import { useParams } from 'react-router-dom'
import { getProductDetails, clearErrors} from '../../actions/productsActions'
import { useAlert} from 'react-alert'
import { Carousel } from 'react-bootstrap'


export const ProductEdit = () => {
	// El nombre del estado, al final de la linea sale del nombre del metodo en el reducer -> productDetails
	const {loading, product, error} = useSelector(state => state.productDetails)
	const {id} =useParams();
	const dispatch= useDispatch();
	const alert= useAlert();
	
	useEffect( () => {
	
		dispatch(getProductDetails(id))
	
		if (error){
			alert.error(error);
			dispatch(clearErrors())
		}

	}, [dispatch, alert, error, id])

	return (
		<Fragment>
			{loading ? <span className='loader'></span> : (
				<Fragment>
					<MetaData title={product.nombre}></MetaData>
                    <h2 className="mt-5">Editar producto</h2>
					<div className='row d-flex justify-content-around'>
						<div className='col-12 col-lg-5 img-fluid mt-5' id="imagen_producto">
							<Carousel pause='hover'>
								{product.imagen && product.imagen.map(img =>(
								<Carousel.Item key={img.public_id}>
									<img className="d-block w-100" src={"../../"+img.url} alt={product.nombre}></img>
								</Carousel.Item>
								))}
							</Carousel>
						</div>

						<div className='col-12 col-lg-5 mt-5'>
							<h3>{product.nombre}</h3>
							<p id="product_id">ID # {product._id}</p>
							<hr />

							<div className='rating-outer'>
								<div className="rating-inner" style={{width: `${(product.calificacion/5)*100}%`}}></div>
							</div>
							<span id="No_de_reviews" className='ml-2'>({product.numCalificaciones} Reviews)</span>
							<hr />
                            <p>Estado: <span id="stock_stado" className={product.inventario>0 ? 'greenColor':'redColor'}>{product.inventario>0 ? "Disponible": "Agotado"}</span></p>
							<hr />
							<h4 className="mt-2">Descripción:</h4>
							<p>{product.descripcion}</p>
							<hr />
							<p id="vendedor">Vendido por: <strong>{product.vendedor}</strong></p>
							<button id="btn_review" type="button" className="btn btn-primary mt-4" 
							data-toggle="modal" data-target="#ratingModal">Editar!</button>
							
						
							{/*Mensaje emergente para dejar opinion y calificacion*/}
							<div className="row mt-2 mb-5">
								<div className="rating w-50">
									<div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog"
									aria-labelledby='ratingModalLabel' aria-hidden="true">
										<div className="modal-dialog" role="document">
											<div className="modal-content">
												<div className="modal-header">
												<h5 className="modal-title" id="ratingModalLabel">Enviar Review</h5>
												<button type="button" className='close' data-dismiss="modal" aria-label='Close'>
													<span aria-hidden="true">&times;</span>
												</button>
												</div>
												<div className="modal-body">
													<ul className="stars">
														<li className="star"><i className="fa fa-star"></i></li>
														<li className="star"><i className="fa fa-star"></i></li>
														<li className="star"><i className="fa fa-star"></i></li>
														<li className="star"><i className="fa fa-star"></i></li>
														<li className="star"><i className="fa fa-star"></i></li>
													</ul>
												
													<textarea name="review" id="review" className="form-control mt3"></textarea>

													<button className="btn my-3 float-right review-btn px-4 text-white" 
													data-dismiss="modal" aria-label="Close">Enviar</button>
												
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
		
	)
}

export default ProductEdit