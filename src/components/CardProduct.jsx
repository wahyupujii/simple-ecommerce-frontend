import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import { useNavigate } from 'react-router-dom'

const Card = styled.div`
	width: 20%;
	max-height: 800px;
	margin: 10px;
	box-sizing: border-box;
	border-radius: 10px;
	box-shadow: 0px 0px 10px lightgray;
	padding: 0px 0px 10px 0px;
	cursor: pointer;
	@media (max-width: 700px) {
		margin: 15px auto;
		width: 90%;
	}
`;

const CardInfo = styled.div`
	height: 40%;
	padding: 10px 20px;
	text-align: left;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	font-size: 1.2em;
	overflow: auto;
	@media (max-width: 700px) {
		justify-content: space-evenly;
	}
`;

export default function CardProduct({ data }) {
	let navigate = useNavigate();

	const convertToRupiah = (angka) => {
		let rupiah = '';
		let angkarev = angka.toString().split('').reverse().join('');
		for (let i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
		return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
	}

	return (
		<Card key={data.id} onClick={() => navigate(`/detail-product/${data.id}`)}>
			<img
				style={{
					width: '100%',
					boxSizing: 'border-box',
					height: '60%',
					borderRadius: '10px',
				}}
				src={data.image.split(":")[0] === "https" ? data.image : `http://localhost:3000/${data.image}`}
			/>
			<CardInfo>
				<p style={{ fontWeight: 'bold' }}>{data.name} </p>
				<p style={{ fontSize: '16px', color: '#d30000' }}>{convertToRupiah(data.price)}</p>
				<p style={{ fontSize: '14px', color: '#d30000' }}>Stok : {data.quantity}</p>
			</CardInfo>
		</Card>
	)
}
