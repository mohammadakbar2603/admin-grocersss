import React, { useState } from 'react';
import { IoChevronUpCircle } from 'react-icons/io5';
import './ItemCard.css';
import styled from 'styled-components';

export const Button = styled.div`
position: fixed;
    width: 100%;
    left: 88%;
    bottom: 15%;
    height: 20px;
    font-size: 4rem;
    z-index: 1;
    cursor: pointer;
    color: #D70F64;
`

const Top = () => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <Button>
            <IoChevronUpCircle onClick={scrollToTop}
                style={{ display: visible ? 'inline' : 'none' }} />
        </Button>
    );
}

export default Top;
