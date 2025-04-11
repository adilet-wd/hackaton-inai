import "./Footer.scss";
import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container container">
                <div className="footer__column">
                    <Link to="#">About Us</Link>
                    <Link to="#">Promotions</Link>
                    <Link to="#">Discounts</Link>
                    <Link to="#">Partners</Link>
                </div>
                <div className="footer__column">
                    <Link to="#">Cooperation</Link>
                    <Link to="#">Technical Support</Link>
                    <Link to="#">FAQ</Link>
                    <Link to="#">Terms of Use</Link>
                </div>
                <div className="footer__column footer__contacts">
                    <div className="footer__subtitle">Contacts</div>
                    <a href="#">+996 (557) 66 22 91</a>
                    <a href="#">+996 (500) 29 55 64</a>
                    <div className="footer__subtitle">Address</div>
                    <div>St. Kiev 323</div>
                </div>
            </div>
        </footer>
    )
}
