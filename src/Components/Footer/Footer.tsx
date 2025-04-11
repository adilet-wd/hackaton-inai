import "./Footer.scss";
import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container container">
                <div className="footer__column">
                    <Link to="#">О нас</Link>
                    <Link to="#">Сотрудничество</Link>
                    <Link to="#">Наши партнеры</Link>
                </div>
                <div className="footer__column">
                    <Link to="#">Техническая поддержка</Link>
                    <Link to="#">FAQ</Link>
                    <Link to="#">Условия пользования</Link>
                </div>
                <div className="footer__column footer__contacts">
                    <div className="footer__subtitle">Контакты</div>
                    <a href="#">+996 (557) 66 22 91</a>
                    <a href="#">adilet@gmail.com</a>
                    <div className="footer__subtitle">Адрес</div>
                    <div>Ул. Киевская 194/2</div>
                </div>
            </div>
        </footer>
    )
}
