import React from 'react';
import './Navbar.css';

const Navbar = () => {
    let userLogin = JSON.parse(sessionStorage.getItem("userLogin"))
    let adminLoggedIn = sessionStorage.getItem("admin");

    const logout = () => {
        sessionStorage.clear();
        window.location.pathname = '/'
    }

    return (
        <>
            <nav className='navbarr'>
                <a
                    className='navbar-logo'
                    href='/'
                >
                    HapeKu
                </a>

                {
                    userLogin === null ? (
                        <ul className='nav-menu'>
                            <li className='nav-item'>
                                <a className='nav-links' href="/login">Login</a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-links highlight' href="/register">Register</a>
                            </li>
                        </ul>
                    ) : adminLoggedIn ? (
                        <ul className='nav-menu'>
                            <li className='nav-item'>
                                <a className='nav-links' href="/adminpage">
                                    CRUD Product
                                </a>
                            </li>

                            <li className='nav-item'>
                                <a className='nav-links' href="/verifikasi">
                                    Verifikasi
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-links highlight' onClick={logout}>
                                    Logout
                                </a>
                            </li>
                        </ul>
                    ) : userLogin !== null ? (
                        <ul className='nav-menu'>
                            <li className='nav-item'>
                                <a className='nav-links highlight' onClick={logout}>
                                    {userLogin.name}
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-links' href='/cart'>
                                    Keranjang
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-links' href='/orders'>
                                    Pesanan
                                </a>
                            </li>
                        </ul>
                    ) : (<div></div>)
                }
            </nav>
        </>
    );
}

export default Navbar;
