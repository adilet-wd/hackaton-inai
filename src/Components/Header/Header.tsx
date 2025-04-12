import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

// Источник - https://www.flaticon.com/free-icon/web_9940584?term=logo&page=1&position=54&origin=search&related_id=9940584
import logo from "../../assets/icons/logo.svg"

import './Header.scss';
import {useAuth} from "../../App/auth/authProvider.tsx";

const Header = () => {
    const auth = useAuth();

    return (
        <header className='header'>
            <Navbar key={'md'} expand={'lg'} className=" mb-3">
                <Container className='header-container'>
                    <Navbar.Brand href="/">
                        <img src={logo} alt="error" className='navLogo'/>
                        ТезКредит
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'md'}`} data-bs-theme="light"/>
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${'md'}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${'md'}`}
                        placement="end"
                    >
                        <Offcanvas.Body>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title><img src={logo} alt="error" className='title-logo'/></Offcanvas.Title>
                            </Offcanvas.Header>
                            <Nav className="justify-content-end navLinks">
                                <Nav.Link href="/">Главная</Nav.Link>
                                <Nav.Link href="/chat-bot">Вопрос ответ</Nav.Link>
                                {auth?.isAuthenticated ?
                                    <Nav.Link className="login-button" href="/account">Профиль</Nav.Link>:
                                    <Nav.Link className="login-button" href="/auth/login">Войти</Nav.Link>}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;