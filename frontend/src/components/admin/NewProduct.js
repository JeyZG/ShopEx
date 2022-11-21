import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newProduct, clearErrors } from '../../actions/productsActions'
import { NEW_PRODUCT_RESET } from '../../constants/productsConstants'
import { useNavigate } from 'react-router-dom'


const NewProduct = () => {

    const navigate = useNavigate();
    const [nombre, setNombre] = useState('')
    const [marca, setMarca] = useState('')
    const [precio, setPrecio] = useState(0)
    const [descripcion, setDescripcion] = useState('')
    const [categoria, setCategoria] = useState('')
    const [inventario, setInventario] = useState(0)
    const [vendedor, setVendedor] = useState('')
    const [imagen, setImagen] = useState([])
    const [imagenPreview, setImagenPreview] = useState([])

    const categorias = [
        "Accesorios",
        "Audio y video",
        "Cables y cargadores",
        "Celulares y tablets",
        "Computadores",
        "Zona gamer"
    ]

    const alert = useAlert();
    const dispatch = useDispatch();
    
    const {loading, error, success} = useSelector(state => state.newProduct)

    useEffect( () => {
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }

        if(success){
            navigate("/dashboard")
            alert.success("Producto registrado con exito!")
            dispatch({type: NEW_PRODUCT_RESET})
        }
    }, [dispatch, error, success, alert, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        
        const formData = new FormData();

        formData.set('nombre', nombre)
        formData.set('marca', marca)
        formData.set('precio', precio)
        formData.set('descripcion', descripcion)
        formData.set('categoria', categoria)
        formData.set('inventario', inventario)
        formData.set('vendedor', vendedor)

        imagen.forEach( img => {
            formData.append('imagen', img)
        })

        dispatch(newProduct(formData));
    }

    const onChange = e => {
        const files = Array.from(e.target.files)

        setImagenPreview([]);
        setImagen([]);

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagenPreview(oldArray => [...oldArray, reader.result])
                    setImagen(oldArray => [...oldArray, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })
        
    }

    return (
        <Fragment>
            <MetaData title={'Nuevo Producto'} />
            <div className="row">
                <div className="col-12 col-md-3">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-9">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Nuevo Producto</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Nombre</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="marca_field">Marca</label>
                                    <input
                                        type="text"
                                        id="marca_field"
                                        className="form-control"
                                        value={marca}
                                        onChange={(e) => setMarca(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Precio</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        value={precio}
                                        onChange={(e) => setPrecio(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                <label htmlFor="description_field">Descripción</label>
                                    <textarea className="form-control" 
                                    id="description_field" 
                                    rows="8" 
                                    value={descripcion} 
                                    onChange={(e) => setDescripcion(e.target.value)}></textarea>
                                    
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Categoria</label>
                                    <select className="form-control" 
                                    id="category_field" 
                                    value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                                        <option value="null" >Seleccione una opcion...</option>
                                        {categorias.map(categoria => (
                                            <option key={categoria} value={categoria} >{categoria}</option>
                                        ))}

                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Inventario</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        value={inventario}
                                        onChange={(e) => setInventario(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller_field">Vendedor</label>
                                    <input
                                        type="text"
                                        id="seller_field"
                                        className="form-control"
                                        value={vendedor}
                                        onChange={(e) => setVendedor(e.target.value)}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label>Imágenes</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='product_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Seleccione las imágenes
                                     </label>
                                    </div>
                                    {imagenPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="55" />
                                    ))}
                                </div>


                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={ loading ? true : false}
                                >
                                    Crear Producto
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default NewProduct