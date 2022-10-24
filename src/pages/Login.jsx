import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { users } from '../constants';
import { setAuthorizationHeader } from '../config';

export default function Login() {
	let navigate = useNavigate();
	const [inputs, setInputs] = useState({});

	const submit = (e) => {
		e.preventDefault();

		if (inputs.email === "admin@gmail.com" && inputs.password === "admin") {
			sessionStorage.clear();
			sessionStorage.setItem("admin", true)
			navigate("/adminpage");
			return
		}

		sessionStorage.clear();
		users
			.login({ ...inputs })
			.then(res => {
				setAuthorizationHeader(res.data.token);
				sessionStorage.setItem("userLogin", JSON.stringify(res.data))
				window.location.pathname = '/';
			})
			.catch(err => console.log(err))
	}

	return (
		<div style={styles.loginContainer}>
			<h2>Login</h2>
			<form style={styles.formLogin} onSubmit={submit}>
				<div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '20px' }}>
					<label>Email</label>
					<input type="email" name='email' placeholder="Enter Email" style={styles.input} onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})} />
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '20px' }}>
					<label>Password</label>
					<input type="password" name='password' placeholder="Enter Password" style={styles.input} onChange={(e) => setInputs({...inputs, [e.target.name]: e.target.value})} />
				</div>
				<button style={styles.button} type="submit">LOGIN</button>
			</form>
			<p style={{ fontSize: '14px' }}>Belum memiliki akun ? <span style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => navigate('/register')} >Register</span></p>
		</div>
	)
}

const styles = {
	loginContainer: {
		maxWidth: '400px',
		margin: '20px auto',
		boxShadow: '0px 0px 10px lightgray',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '30px',
		boxSizing: 'border-box',
	},

	formLogin: {
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
