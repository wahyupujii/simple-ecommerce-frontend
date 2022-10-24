import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { orders } from "../constants";
import axios from "axios";

const Button = styled.button`
    background: ${(props) => props.primary ? 'palevioletred' : '#ff3c2e'};
    color: #fff;
    font-size: 1em;
    padding: 0.25em 1em;
    border-radius: 3px;
    cursor: pointer;
    text-align: right;
    border: none;
    @media (max-width: 700px) {
        margin: .5rem 0 .5rem 0;
    }
`;

export default function UnpaidOrders() {
    let navigate = useNavigate();
    const [orderUnpaid, setOrderUnpaid] = useState({});
    const [productUnpaid, setProductUnpaid] = useState([]);
    const [loading, setLoading] = useState(true)

    const [fotoBukti, setFotoBukti] = useState(null)

    useEffect(() => {
        orders
            .unpaid()
            .then(res => {
                setOrderUnpaid(res.data.order);
                setProductUnpaid(res.data.product);
                setLoading(false);
            })
            .catch(() => {
                setOrderUnpaid(null);
                setLoading(false);
            })
    }, [])

    const convertToRupiah = (angka) => {
        let rupiah = '';
        let angkarev = angka.toString().split('').reverse().join('');
        for (let i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
        return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
    }

    const handleImageChange = (event) => {
        let files = event.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            setFotoBukti(e.target.result);
        }
    }

    const payOrder = (e, orderID) => {
        e.preventDefault();
        orders
            .proofPayment({
                proof_payment: fotoBukti,
                order_id: orderID
            })
            .then(() => {
                navigate('/orders');
            })
            .catch(err => console.log(err))
    }

    const deleteOrder = (orderUnpaidID) => {
        let check = confirm("Apakah yakin ingin menghapus orderan ? ");

        if (check) {
            axios.delete(`http://localhost:3000/orders/delete`, {
                data: {
                    order_id: orderUnpaidID
                }
            })
                .then(() => {
                    alert("berhasil menghapus orderan")
                    navigate("/orders")
                })
        }
    }

    return (
        <div>
            <h1>Unpaid Orders</h1>
            <Button primary style={{ margin: '20px 0' }} onClick={() => navigate('/orders')}>Kembali</Button>
            {
                loading ? (
                    <span>Loading ... </span>
                ) :
                    (
                        orderUnpaid === null ? (
                            <span>Belum ada pesanan</span>
                        ) : (
                            <>
                                <div style={styles.containerCard}>
                                    <div style={styles.title}>
                                        <h4>Pesanan : <span style={{ color: 'palevioletred' }}>{orderUnpaid.id}</span></h4>
                                        <div style={{ width: '200px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <h5 style={{ color: 'palevioletred' }}>Belum Dibayar</h5>
                                            <Button onClick={() => deleteOrder(orderUnpaid.id)}>Hapus</Button>
                                        </div>
                                    </div>
                                </div>

                                {
                                    productUnpaid.map((product, index) => {
                                        return (
                                            <div key={index} style={styles.cardProduct}>
                                                <img style={{ width: '100px', height: '100px' }} src={`http://localhost:3000/${product.image}`} alt="product image" />
                                                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', height: '50px', justifyContent: 'space-evenly' }}>
                                                    <h4> {product.name}</h4>
                                                    <h4 style={{ color: 'salmon' }}> {convertToRupiah(product.price)} </h4>
                                                </div>
                                                <p>Quantity : {product.count}</p>
                                                <h4> {convertToRupiah(product.total_price)}</h4>
                                            </div>
                                        )
                                    })
                                }

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', alignItems: 'center' }}>
                                    <div style={{ textAlign: 'left' }}>
                                        <label>Upload bukti pembayaran : </label> <br />
                                        <form onSubmit={(event) => payOrder(event, orderUnpaid.id)} encType="multipart/form-data">
                                            <input type="file" onChange={handleImageChange} />
                                            <Button primary type="submit">Simpan</Button>
                                        </form>
                                    </div>
                                    <h4>Total : <span style={{ color: 'palevioletred' }}>{convertToRupiah(orderUnpaid.ammount)}</span></h4>
                                </div>
                            </>
                        )
                    )
            }
        </div>
    )
}

const styles = {
    containerCard: {
        boxShadow: '0px 0px 5px lightgray',
        padding: '20px',
        boxSizing: 'border-box',
        marginBottom: '20px',
    },
    cardProduct: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        boxShadow: '0px 0px 5px lightgray',
        padding: '10px',
        marginTop: '10px',
        justifyContent: 'space-between'
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}