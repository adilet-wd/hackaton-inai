import 'bootstrap/dist/css/bootstrap.css';
import './styles/App.scss';
import './styles/nullstyles.scss';
import { Route, Routes, useLocation} from "react-router-dom";
import AuthProvider from "./App/auth/authProvider.tsx";

import Layout from "./Components/Layout/Layout.tsx";
import Home from "./Pages/Home/Home.tsx";
import PrivateRoute from "./App/auth/PrivateRoute.tsx";
import Login from "./Pages/Login/Login.tsx";
import Account from "./Pages/Account/Account.tsx";
import Register from "./Pages/Register/Register.tsx";
import Group from "./Pages/Group/Group.tsx";
import {useEffect} from "react";
import Groups from "./Pages/Groups/Groups.tsx";

// Дизайн
// https://www.figma.com/design/2KnxvPD8ktnmoNMbgz4tzj/Lemon?node-id=1-775&node-type=frame&t=VW0yr0CtTqvcCykc-0


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

    function RedirectToExternal() {
        useEffect(() => {
            window.location.href = "http://10.66.13.2:9000";
        }, []);

        return null;
    }

    return (
      <>
          <AuthProvider>
              <Routes>
                  <Route path="/" element={<Layout />}>
                      <Route path='/' element={<Home />} />
                      <Route path='/auth/login' element={<Login/>}/>
                        <Route path='/auth/register' element={<Register/>}/>
                      <Route path='/groups/:id' element={<Group/>}></Route>
                      <Route path='/groups/' element={<Groups />} />
                      <Route path="/banner" element={<RedirectToExternal />} />
                      <Route element={<PrivateRoute />}>
                          <Route path="/account" element= {<Account />} />
                      </Route>
                      <Route path='*' element={<h1 className={"text-center"}>Not Found</h1>} />
                  </Route>
              </Routes>
          </AuthProvider>
      </>
  )
}

export default App
