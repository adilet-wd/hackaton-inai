import 'bootstrap/dist/css/bootstrap.css';
import './styles/App.scss';
import './styles/App.css';

import './styles/nullstyles.scss';
import { Route, Routes, useLocation} from "react-router-dom";
import AuthProvider from "./App/auth/authProvider.tsx";

import Layout from "./Components/Layout/Layout.tsx";
import Home from "./Pages/Home/Home.tsx";
import PrivateRoute from "./App/auth/PrivateRoute.tsx";
import Login from "./Pages/Login/Login.tsx";
import {useEffect} from "react";
import Chat from "./Components/Chat/Chat.tsx";

function App() {
    const location = useLocation();

    /**
    * При переходе на новую страницу скроллит вверх и закрывает бургер
     * */
    useEffect(() => {
        window.scrollTo(0, 0);
        if (!document.querySelector(".navbar-toggler")?.classList.contains("collapsed")){
            (document.querySelector(".navbar-toggler") as HTMLElement).click();
        }
    }, [location]);


    return (
      <>
          <AuthProvider>
              <Routes>
                  <Route path="/" element={<Layout />}>
                      <Route path='/' element={<Home />} />
                      <Route path='/chat-bot' element={<Chat/>} />
                      <Route path='/auth/login' element={<Login/>}/>
                      <Route element={<PrivateRoute />}>
                      </Route>
                      <Route path='*' element={<h1 className={"text-center"}>Not Found</h1>} />
                  </Route>
              </Routes>
          </AuthProvider>
      </>
  )
}

export default App
