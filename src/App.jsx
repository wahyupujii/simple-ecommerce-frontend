import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navbar } from './components'
import { Home, Login, Register, Products, DetailProduct, Orders, UnpaidOrders, PaidOrders, Cart } from "./pages"

const App = () => {
	return (
		<>
			<Navbar />
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/products' element={<Products />} />
					<Route path='/detail-product/:id' element={<DetailProduct />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/orders' element={<Orders />} />
					<Route path='/orders/paid' element={<PaidOrders />} />
					<Route path='/orders/unpaid' element={<UnpaidOrders />} />

					{/* <Route path='/adminpage' element={<AdminPage />} /> */}
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App