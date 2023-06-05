import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { products, orders, cart } from '../constants'
import styled from 'styled-components'

const Button = styled.button`
    width: 150px;
    background: ${(props) => props.cart ? 'palevioletred' : 'transparent'};
    color: ${(props) => props.cart ? '#fff' : 'palevioletred'};
    font-size: 1em;
    margin: 2em 1rem 2rem 0;
    padding: 0.25em 1em;
    border-radius: 3px;
    cursor: pointer;
    text-align: center;
    border-width: 2px;
    border-style: ${(props) => props.cart ? 'none' : 'palevioletred'} ;
    border-color: ${(props) => props.cart ? 'none' : 'palevioletred'} ;
    @media (max-width: 700px) {
      margin: .5rem 0 .5rem 0;
    }
`;

export default function DetailProduct() {
	const [product, setProduct] = useState({})
	const [loading, setLoading] = useState(true)

	let navigate = useNavigate('/products');
	let { id } = useParams();

	useEffect(() => {
		products
			.getOne(id)
			.then(res => {
				setProduct(res.data)
				setLoading(false)
			})
	}, [])

	const convertToRupiah = (angka) => {
		let rupiah = '';
		let angkarev = angka.toString().split('').reverse().join('');
		for (let i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
		return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
	}

	const addToCart = (product, orderID) => {
		cart
			.addCart({
				order_id: orderID,
				product_id: product.id,
				price: product.price
			})
			.then(() => alert("Berhasil ditambahkan ke keranjang"))
			.catch(() => alert("Produk sudah ada di keranjang"))
	}

	const makeOrder = (product) => {
		orders
			.create()
			.then(res => {
				addToCart(product, res.data)
				localStorage.setItem("order_id", res.data)
			})
			.catch((err) => {
				if (err.response?.data?.message === "pending orders found") {
					return alert("Ada pesanan yang belum diverifikasi, coba lagi nanti")
				}

				navigate('/login')
			})
	}

	return (
		<div>
			{
				loading ? (<div>Loading</div>) : (
					<>
						<div style={{ padding: '50px 100px', boxSizing: 'border-box' }}>
							<div style={styles.card}>
								<div style={styles.thumbnail}>
									{/* gambar thumbnail */}
									<img style={styles.imgThumbnail} src={product.image.split(":")[0] === "https" ? product.image : `http://localhost:3000/${product.image}`} />

								</div>
								<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '60%' }}>
									<table>
										<tbody>
											<tr>
												<td>Nama</td>
												<td>&nbsp;:&nbsp;</td>
												<td><h3>{product.name}</h3></td>
											</tr>
											<tr>
												<td>Harga</td>
												<td>&nbsp;:&nbsp;</td>
												<td style={{ color: 'salmon' }}>{convertToRupiah(product.price)}</td>
											</tr>
											<tr>
												<td>Deskripsi</td>
												<td>&nbsp;:&nbsp;</td>
												<td>{product.description}</td>
											</tr>
											<tr>
												<td>Stok</td>
												<td>&nbsp;:&nbsp;</td>
												<td>{product.quantity}</td>
											</tr>
										</tbody>
									</table>
									<div>
										<Button cart onClick={() => makeOrder(product)}>Masukkan ke keranjang</Button>
										<Button onClick={() => navigate("/products")}>Kembali ke katalog</Button>
									</div>
								</div>
							</div>
						</div>
					</>
				)
			}
		</div>
	)
}

const styles = {
	card: {
		maxWidth: '100%',
		boxShadow: '0px 0px 10px lightgray',
		boxSizing: 'border-box',
		height: '400px',
		display: 'flex'
	},
	thumbnail: {
		boxSizing: 'border-box',
		width: '40%',
	},
	imgThumbnail: {
		width: '100%',
		height: '80%',
		padding: '20px',
		boxSizing: 'border-box',
	},
	anotherImg: {
		height: '20%',
		boxSizing: 'border-box',
		display: 'flex',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		padding: '5px 5px 10px 5px'
	},
	anotherImgItem: {
		width: '25%',
		height: '80%',
		boxSizing: 'border-box',
		boxShadow: '0px 0px 10px lightgray',
	}
}