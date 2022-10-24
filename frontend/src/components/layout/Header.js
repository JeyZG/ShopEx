import React, { Fragment } from 'react'

const Header = () => {
  return (
    <Fragment>
        <nav className='navbar row'>
            <div className='col-12 col-md-3'>
                <div className='navbar-brand ml-5'>
                    <a href="/"><img src='./images/shopex_logo.png' alt='ShopEx Logo' width='100px'/></a>
                </div>
            </div>
            <div className='col-12 col-md-6 mt-2 mt-md-0'>
                <div className='input-group'>
                    <input 
                        type='text' 
                        id='search_field' 
                        className='form-control' 
                        placeholder='Que producto busca?'>
                    </input>
                    <div className='input-group-append'>
                        <button id='search-btn' className='btn'>
                            <i className='fa fa-search-plus fa-2x text-white' aria-hidden='true'></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className='col-12 col-md-3 mt-4 mt-md-0 text-center'>
                <button className='btn mr-5' id='login_btn'>Inicie sesion</button>
                <i className='fa fa-shopping-cart fa-2x text-white mx-2' aria-hidden='true'></i>
                <span id='cart_count' className='ml-1'>2</span>
            </div>
        </nav>
    </Fragment>
  )
}

export default Header