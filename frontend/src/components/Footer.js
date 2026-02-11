import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>🛍️ E-Commerce</h3>
                        <p>Your one-stop shop for everything amazing. Quality products, fast shipping, and excellent customer service.</p>
                    </div>
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="/home">Home</a></li>
                            <li><a href="/cart">Cart</a></li>
                            <li><a href="/profile">My Account</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Contact Us</h4>
                        <p>📍 123 Tech Street, Silicon Valley</p>
                        <p>📧 support@ecommerce.com</p>
                        <p>📞 +1 (555) 123-4567</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} E-Commerce Platform. Built for Internship Project.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
