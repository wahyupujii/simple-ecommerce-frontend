import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { products } from "../constants";
import Banner from "../assets/banner-iphone.jpg"

import { CardProduct } from '../components';

const Jumbotron = styled.div`
    width: 100%;
    height: 80vh;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
`

const Container = styled.div`
    width: 80%;
    margin: auto;
    text-align: center;
    box-sizing: border-box;
`;

const CardWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-evenly;
    box-sizing: border-box;
    flex-direction: row;
    margin: 50px 0px;
    @media (max-width: 450px) {
        flex-direction: column;
    }
    @media (max-width: 950px) {
        flex-wrap: wrap;
    }
`;

const Footer = styled.div`
    width: 100%;
    text-align: center;
    background-color: #333;
    color: #fff;
    margin-top: 50px;
    padding: 20px;
    box-sizing: border-box;
`


export default function Home() {
    let navigate = useNavigate();

    return (
        <div>
            <Container>
                <Jumbotron>
                    <div style={styles.tulisan}>
                        <h3 style={{lineHeight: '2'}}>
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </h3>
                    </div>
                    <div style={styles.gambar} ></div>
                </Jumbotron>
                <button style={styles.buttonStyle} onClick={() => navigate('/products')}>See Products ...</button>
            </Container>
            <Footer>Copyright Informatics Engineering</Footer>
        </div>
    )
}

const styles = {
    buttonStyle: {
        border: '2px solid red'
    },
    tulisan: {
        width: '50%',
        textAlign: 'left',
        display: 'flex',
        padding: '0px 30px',
        boxSizing: 'border-box',
        alignItems: 'center'
    },

    gambar: {
        width: '50%',
        backgroundImage: `url(${Banner})`,
        // border: '2px solid blue',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }
}

{/* <div>
    <h1>
        Welcome {userLogin ? userLogin.name : 'Home'}
    </h1>
    {
        userLogin ? (
            <>
                <button style={styles.buttonStyle} onClick={() => sessionStorage.clear()}>Logout</button>
                <button style={styles.buttonStyle} onClick={() => navigate('/orders')}>Orders</button>
            </>
        ) : (
            <button style={styles.buttonStyle} onClick={() => navigate('/login')}>Login</button>
        )
    }
    <button style={styles.buttonStyle} onClick={() => navigate('/products')}>See Products</button>
</div> */}