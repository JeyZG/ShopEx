import React, { Fragment } from 'react';
import Metadata from '../layout/Metadata';

export const ProductDetails = () => {
  return (
    <Fragment>
        <Metadata title="Detalle del producto"></Metadata>
        <div className='row d-flex justify-content-around mt-3'>
            <div className='col-12 col-lg-5 img-fluid' id='imagen_producto'>
                <img src='./../images/products/04.jpg' alt='Imagen del producto' height={450} width={450} />
            </div>
            <div className='col-12 col-lg-5 mt-5'>
                <h3>Titulo productos # 4</h3>
                <p id='product_id'>Producto # 32516516</p>
            </div>
        </div>
    </Fragment>
  )
}