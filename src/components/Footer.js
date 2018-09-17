import React from 'react';
import wallet from '../assets/wallet.svg';

const Footer = () => {
    return(
    <div className="footer cointainer-fluid">
        <img className="footer__icon" src={wallet} alt="wallet icon"/>
        <p className="footer__poweredBy">Powered By
            <a href="https://coinmarketcap.com/" target="_blank" className="poweredBy"> CoinMarketCap</a>
        </p>

        <p className="footer__text">Copyright&#169; 2018 Cryptolio All Rights Reserved</p>
    </div>
    );
};

export default Footer;