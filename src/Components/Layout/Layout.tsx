import { Outlet } from 'react-router-dom';
import Footer from "../Footer/Footer.tsx";
import Header from "../Header/Header.tsx";

const Layout = () => {
    return (
        <>
                <Header></Header>
                <main className='page_block'>
                    <Outlet></Outlet>
                </main>
                <Footer></Footer>
        </>
    );
}

export default Layout;
