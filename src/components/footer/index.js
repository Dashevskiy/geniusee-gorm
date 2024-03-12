import React from 'react';
import './index.css';

const Footer = () => {
    return (
        <div className='footer-container'>
            <ul className='footer-items'>
                <li className='footer-item'>About</li>
                <li className='footer-item'>Contact</li>
                <li className='footer-item'>Address</li>
                <li className='footer-item'>Blog</li>
                <li className='footer-item'>Career</li>
            </ul>
            
            <ul className='footer-items'>
                <li className='footer-item'>Catalog</li>
                <li className='footer-item'>Social</li>
                <li className='footer-item'>Reviews</li>
            </ul>
        </div>
    )
}

export default Footer;