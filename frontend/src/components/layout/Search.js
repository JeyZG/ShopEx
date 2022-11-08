import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Search = () => {
	
	const [keyword, setKeyword] = useState('')
	const navigate = useNavigate();

	const searchHandler = (e) => {
		// Que no busque con el valor por defecto, sino que espere valores
		e.preventDefault();

		// Si hay un cambio en keywords
		if(keyword.trim()){
			navigate(`/search/${keyword}`)
		}else{
		// Si no hay cambio y se presiona el boton se lleva al Home
			navigate('/')
		}

	}
	
	return (

		<form onSubmit={searchHandler}>
			<div className='input-group'>
				<input 
					type='text' 
					id='search_field' 
					className='form-control' 
					placeholder='Que producto busca?' 
					onChange={(e) => setKeyword(e.target.value)} />
			
				<div className='input-group-append'>
					<button id='search_btn' className='btn'>
						<i className='fa fa-search' aria-hidden='true'></i>
					</button>
				</div>
			</div>
		</form>
	);
}

export default Search