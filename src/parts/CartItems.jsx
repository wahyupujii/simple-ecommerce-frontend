import React, { useEffect, useState } from 'react'
import { cart } from '../constants';
import { ItemCard } from "../parts"
import axios from "axios"

export default function CartItems({ dataProducts, setDataCount, handleTotalPrice }) {
    const orderID = JSON.parse(localStorage.getItem("order_id"));
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        getTotalPrice();

    }, [totalPrice, dataProducts])

    const getTotalPrice = () => {
        let total_price = 0;
        for (let i = 0; i < dataProducts.length; i++) {
            total_price += dataProducts[i].total_price;
        }
        setTotalPrice(total_price);
        handleTotalPrice(total_price)
    }

    const countData = (id, action) => {
        let url = "";
        action === "plus" ?
            url = "/cart/user-cart/add-count"
            :
            url = "/cart/user-cart/minus-count"

        cart
            .changeCount(url, {
                order_id: orderID,
                product_id: id
            })
            .then(res => {
                if (res.hasOwnProperty("data")) {
                    let product = dataProducts.filter(product => product.id === id);
                    let index = dataProducts.indexOf(product[0]);
                    product[0].count = res.data.count;
                    product[0].total_price = res.data.total_price
                    dataProducts[index] = product[0];
                }
                setDataCount();
            })
            .catch(err => {
                if (err.response.data.message === "exceed product quantity") {
                    alert("Jumlah yang diinginkan melebihi stok yang ada");
                }
            })
    }

    const deleteData = (id) => {
        axios.delete('http://localhost:3000/cart/user-cart', {
            data: {
                order_id: orderID,
                product_id: id
            }
        })
            .then(() => {
                setDataCount()
                // Swal.fire({
                //     icon: 'success',
                //     title: 'Berhasil menghapus produk dari keranjang'
                // })
                alert("berhasil menghapus produk dari keranjang")
            })
            .catch(() => {
                // Swal.fire({
                //     icon: 'error',
                //     title: 'Gagal menghapus produk dari keranjang'
                // })
                alert("gagal menghapus produk dari keranjang")
            })
    }

    return (
        <div>
            {
                dataProducts.length === 0 ? (
                    <span>Keranjang masih kosong</span>
                ) : (
                    dataProducts.map((item, index) => {
                        return (
                            <ItemCard
                                key={index}
                                item={item}
                                handleDelete={(productID) => deleteData(productID)}
                                handleCount={(productID, action) => countData(productID, action)}
                            />
                        )
                    })
                )
            }
        </div>
    )
}
