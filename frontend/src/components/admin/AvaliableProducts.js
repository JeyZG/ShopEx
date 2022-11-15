import React, { Fragment, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import {getAvaliableProducts} from '../../actions/productsActions'

export const AvaliableProducts = () => {
    const { loading, avaliableProducts, error} = useSelector( state => state.avaliableProducts)
    const alert = useAlert();
    const dispatch = useDispatch();

    useEffect( () => {
        
        if (error){
            return alert.error(error)
        }

        dispatch(getAvaliableProducts())
    }, [dispatch, alert, error])

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'Nombre',
                    field: 'nombre',
                    sort: 'asc'
                },
                {
                    label: 'Precio',
                    field: 'precio',
                    sort: 'asc'
                },
                {
                    label: 'Inventario',
                    field: 'inventario',
                    sort: 'asc'
                },
                {
                    label: 'Vendedor',
                    field: 'vendedor',
                    sort: 'asc'
                },
                {
                    label: 'Acciones',
                    field: 'actions',
                },
            ],
            rows: []
        }

        avaliableProducts.forEach(product => {
            data.rows.push({
                nombre: product.nombre,
                precio: `$ ${product.precio}`,
                inventario: product.inventario,
                vendedor: product.vendedor,
                actions:    <Fragment>
                                <Link to={`/producto/${product._id}`} className="btn btn-primary py-1 px-2 mr-2">
                                    <i className="fa fa-eye"></i>
                                </Link>
                                <Link to={`/editar/producto/${product._id}`} className="btn btn-warning py-1 px-2 mr-2">
                                    <i class="fa fa-pencil"></i>
                                </Link>
                                <Link to="/" className="btn btn-danger py-1 px-2">
                                    <i className="fa fa-trash"></i>
                                </Link>
                            </Fragment>
            })
        })
        
        return data;
        
    }

    return (
        <Fragment>
            <MetaData title={'Productos disponibles'} />
            <div className="row">
                <div className="col-12 col-md-3">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-9">
                    <Fragment>
                        <h1 className="my-5 text-center">Productos Disponibles</h1>

                        {loading ? <span className='loader'></span> :(
                            <MDBDataTable
                                data={setProducts()}
                                className="px-3 text-center"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default AvaliableProducts;
