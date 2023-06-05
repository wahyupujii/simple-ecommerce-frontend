import React, { useEffect, useState } from 'react'
import axios from "axios"
import { products } from "../constants"
import { AdminProductCards } from "../parts"

const AdminPage = () => {
    const [inputs, setInputs] = useState({});
    const [dataProduct, setDataProduct] = useState([]);
    const [dataCount, setDataCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        products
            .getAll()
            .then(res => {
                setDataProduct(res.data)
                setDataCount(res.data.length)
                setLoading(false)
            })
            .catch(() => {
                setDataProduct(null);
                setLoading(false);
            })
    }, [dataCount])

    const handleInputChange = (event) => {
        let files = event.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            setInputs({ ...inputs, image: e.target.result });
        }
    }

    const sendData = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/products', inputs)
            .then(result => {
                if (result.status === 200) {
                    setDataCount(dataCount + 1);
                    setInputs({})
                    e.target.reset();
                }
            })
            .catch(err => console.log(err))
    }


    return (
        <div>
            <div style={styles.container}>
                <div style={styles.content}>
                    <form style={styles.form} onSubmit={sendData} encType="multipart/form-data">
                        <h2>Input Data Product</h2>
                        <input name="name" type="text" placeholder="Nama Product" onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })} />
                        <textarea name="description" rows="10" type="text" placeholder="Deskripsi Product" onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })} />
                        <input name="price" type="number" placeholder="Harga" onChange={(e) => setInputs({ ...inputs, [e.target.name]: parseInt(e.target.value) })} />
                        <label>
                            Images &nbsp; &nbsp;
                            <input name="image" multiple="multiple" type="file" placeholder="Images" onChange={handleInputChange} />
                        </label>
                        <input name="quantity" type="number" placeholder="Quantity" onChange={(e) => setInputs({ ...inputs, [e.target.name]: parseInt(e.target.value) })} />
                        <button style={styles.button} type="submit">Save</button>
                    </form>

                    <div style={styles.product}>
                        {
                            loading ?
                                (
                                    <span>Loading</span>
                                ) : dataProduct === null ? (
                                    <span>Produk masih kosong</span>
                                ) :
                                    (
                                        dataProduct.map((data) => (
                                            <AdminProductCards data={data} />
                                        ))
                                    )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const styles = {
    container: {
        width: '80%',
        margin: 'auto',
        textAlign: 'center',
        boxSizing: 'border-box',
    },
    content: {
        display: 'flex',
        height: '80vh',
        justifyContent: 'space-between'
    },

    form: {
        marginTop: '20px',
        width: '40%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        boxShadow: '0px 0px 10px lightgray',
        textAlign: 'center',
        padding: '10px',
        boxSizing: 'border-box',
        overflow: 'hidden',
    },

    button: {
        background: 'palevioletred',
        color: '#fff',
        fontSize: '1em',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '5px'
    },

    product: {
        marginTop: '20px',
        boxSizing: 'border-box',
        width: '58%',
        height: '100%',
        boxShadow: '0px 0px 10px lightgray',
        overflow: 'auto',
    }
}

export default AdminPage
