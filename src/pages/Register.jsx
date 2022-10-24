import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { users } from '../constants'

export default function Register() {
    let navigate = useNavigate();
    const [inputs, setInputs] = useState({});

    function submit(e) {
        e.preventDefault();
        if (inputs.password === inputs.confirm) {
            const { confirm, ...others } = inputs;
            users
                .register({
                    ...others
                })
                .then(res => {
                    sessionStorage.setItem("userLogin", JSON.stringify(res.data));
                    window.location.pathname = '/'
                })
        } else {
            alert("password tidak sama")
        }
    }

    return (
        <div style={styles.registeContainer}>
            <h2>Register</h2>
            <form style={styles.formRegister} onSubmit={submit}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '20px' }}>
                    <label>Username</label>
                    <input type="text" name='name' placeholder="Enter Username" style={styles.input} onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '20px' }}>
                    <label>Email</label>
                    <input type="email" name='email' placeholder="Enter Email" style={styles.input} onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '20px' }}>
                    <label>Password</label>
                    <input type="password" name='password' placeholder="Enter Password" style={styles.input} onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '20px' }}>
                    <label>Verify Password</label>
                    <input type="password" name='confirm' placeholder="Enter Pasword" style={styles.input} onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })} />
                </div>
                <button style={styles.button} type="submit">REGISTER</button>
            </form>
            <p style={{ fontSize: '14px' }}>Sudah memiliki akun ? <span style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => navigate('/login')} >Login</span></p>
        </div>
    )
}

const styles = {
    registeContainer: {
        maxWidth: '400px',
        margin: '20px auto',
        boxShadow: '0px 0px 10px lightgray',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px',
        boxSizing: 'border-box',
    },

    formRegister: {
        display: 'flex',
        width: '70%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },

    input: {
        margin: '3px 0px',
        boxSizing: 'border-box',
        padding: '5px',
    },

    button: {
        backgroundColor: '#333',
        color: 'white',
        padding: '5px',
        boxSizing: 'border-box',
        cursor: 'pointer',
        width: '100%',
    }
}