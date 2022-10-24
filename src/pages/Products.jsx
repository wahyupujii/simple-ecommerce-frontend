import React, { useEffect, useState } from 'react'
import { products } from '../constants'
import { CardProduct } from '../components';
import styled from 'styled-components';

const CardWrapper = styled.div`
	display: flex;
	flex: 1;
	flex-wrap: wrap;
	width: 100%;
	justify-content: space-evenly;
	box-sizing: border-box;
	flex-direction: row;
	overflow: auto;
	@media (max-width: 700px) {
		flex-direction: column;
	}
`;

export default function Products() {
	const [dataProducts, setDataProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		products
			.getAll()
			.then(res => {
				setDataProducts(res.data)
				setLoading(false)
			})
	}, [])

	return (
		<div>
			<h1 style={{
				margin: '50px',
			}}>Katalog Produk</h1>
			{
				loading ? (<div>Loading</div>) : (
					<CardWrapper>
						{
							dataProducts.map((product, index) => {
								return (
									<CardProduct key={index} data={product} />
								)
							})
						}
					</CardWrapper>
				)
			}
		</div>
	)
}
