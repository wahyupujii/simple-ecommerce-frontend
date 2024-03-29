import React, {memo} from 'react'
import styled from 'styled-components';
import { orders } from '../constants';
import { useNavigate } from 'react-router-dom';

const CardContainer = styled.div`
    width: 100%;
    text-align: left;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px lightgray;
`;

const Product = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Button = styled.button`
    background: palevioletred;
    color: #fff;
    font-size: 1em;
    margin: 2em 1rem 2rem 0;
    padding: 0.25em 1em;
    border-radius: 3px;
    cursor: pointer;
    text-align: right;
    @media (max-width: 700px) {
        margin: .5rem 0 .5rem 0;
    }
`;

function DetailPayment({ totalPrice }) {
    let navigate = useNavigate();

    const convertToRupiah = (angka) => {
        let rupiah = '';
        let angkarev = angka.toString().split('').reverse().join('');
        for (let i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
        return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
    }

    const goCheckout = () => {
        let orderID = JSON.parse(localStorage.getItem("order_id"))
        orders
            .checkout({
                order_id: orderID,
                payment_method: "GoPay",
                ammount: totalPrice
            })
            .then(() => {
                navigate("/orders")            
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <CardContainer>
                <h3>Ringkasan</h3>
                <hr />
                <br />
                <Product>
                    <span>Total Belanja</span>
                    <span>Rp. {convertToRupiah(totalPrice)}</span>
                </Product>
            </CardContainer>
            <CardContainer style={{ marginTop: '20px' }}>
                <h3 style={{ textAlign: 'left' }}>Alamat Pengiriman</h3>
                <textarea
                    placeholder="Masukkan alamat anda"
                    style={styles.textareaAddress}
                // onChange={(e) => setAddress(e.target.value)}
                ></textarea>
            </CardContainer>
            <Button onClick={() => goCheckout()}>Buat Pesanan</Button>
        </div>
    )
}

export default memo(DetailPayment)

const styles = {
    textareaAddress: {
        width: '100%',
        height: '70px',
        padding: '10px',
        boxSizing: 'border-box',
        resize: 'none',
        marginTop: '20px'
    },
}