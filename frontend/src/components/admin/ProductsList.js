import React, { Fragment, useEffect } from 'react'
import { MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBDataTable } from 'mdbreact'
//import { MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBDatatable } from 'mdb-react-ui-kit'
//import { MDBDatatable } from 'mdb-react-ui-kit';
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { clearErrors, deleteProduct, getAdminProducts } from '../../actions/productsActions'
//import CurrencyFormat from 'react-currency-format'

export const ProductsList = () => {
    
    const alert= useAlert();
    const dispatch = useDispatch();

    const { loading, products, error} = useSelector(state=> state.products)
    
    
    const deleteProductHandler = (id)=> {
        const response = window.confirm("Esta seguro de querer borrar este producto?")
        if (response){
            dispatch(deleteProduct(id));
            alert.success("Producto eliminado correctamente!");
            window.location.reload(false);
        }
    }

    useEffect(() => {
        
        dispatch(getAdminProducts);

        if (error){
            alert.error(error)
            dispatch(clearErrors());
        }

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

        products.forEach(product => {
            data.rows.push({
                nombre: product.nombre,
                //precio: <CurrencyFormat value={product.precio} displayType={"text"} thousandSeparator={true} prefix={"$"} renderText={(value) => `${value}`}/>,
                precio: `$ ${product.precio}`,
                inventario: product.inventario,
                vendedor: product.vendedor,
                actions:    <Fragment>
                                <Link to={`/producto/${product._id}`} className="btn btn-primary py-1 px-2 mr-2">
                                    <i className="fa fa-eye"></i>
                                </Link>
                                {/* <Link to={`/editar/producto/${product._id}`} className="btn btn-warning py-1 px-2 mr-2">
                                    <i className="fa fa-pencil"></i>
                                </Link> */}
                                <Link to={`/editar/producto/${product._id}`} className="btn btn-warning py-1 px-2">
                                    <i className="fa fa-pencil"></i>
                                </Link>
                                {/* <Link to="/" className="btn btn-danger py-1 px-2">
                                    <i className="fa fa-trash"></i>
                                </Link> */}
                                <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </Fragment>
            })
        })

        return data;
    }

    return (
        <Fragment>
            <MetaData title={'Lista de productos'} />
            <div className="row">
                <div className="col-12 col-md-3">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-9">
                    <Fragment>
                        {loading ? ( <span className="loader"></span>) : (
                            <MDBCard className='mt-2'>
                                <MDBCardHeader>
                                    <MDBCardTitle>
                                        <h1 className="text-center">Productos Registrados</h1>
                                    </MDBCardTitle>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBDataTable
                                        data={setProducts()}
                                        className="px-2 text-center"
                                        bordered
                                        striped
                                        hover
                                        maxHeight='520px'
                                        maxWidth='520px'
                                    />
                                </MDBCardBody>
                            </MDBCard>
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}
export default ProductsList
