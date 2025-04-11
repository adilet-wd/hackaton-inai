import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import unlockedPassword from "../../assets/icons/unlock-password.svg";
import lockedPassword from "../../assets/icons/lock-password.svg";
import {useAuth} from "../../App/auth/authProvider.tsx";
import {Link, useNavigate} from "react-router-dom";
import './Login.scss';
export default function Login() {
    const auth = useAuth();
    const navigate = useNavigate();
    
    /**
     * Ссылка на поле ввода пароля */
    const passwordInputRef = useRef<HTMLInputElement>(null);
    /**
     * Состояние для хранения типа пароля */
    const [passwordType, setPasswordType] = useState<string>("password");
    /**
     * Состояние для хранения иконки пароля */
    const [passwordIcon, setPasswordIcon] = useState<string>(lockedPassword);

    /**
     * Состояние для хранения данных пользователя */
    const [input, setInput] = useState({
        username: "",
        password: "",
    });

    /**
     * Состояние для хранения существования пользователя
     * Если данные входа неправильные, то в него помещается сообщение об ошибке*/
    const [ userExistence, setUserExistence] = useState<string>("");

    /**
     * Изменение видимости пароля */
    useEffect(() => {
        if (passwordInputRef.current && passwordInputRef.current.type === "text") {
            setPasswordIcon(unlockedPassword);
        } else if (
            passwordInputRef.current &&
            passwordInputRef.current.type === "password"
        ) {
            setPasswordIcon(lockedPassword);
        }
    }, [passwordInputRef.current?.type]);

    /**
     * Редирект на страницу Профиля, если пользователь уже вошел */
    useEffect(() => {
        if (auth?.isAuthenticated) {
            navigate("/account");
        }
    }, [auth?.isAuthenticated]);

    /**
     * Функция для обработки отправки формы
     * @param {React.FormEvent<HTMLFormElement>} e - Событие отправки формы
     * */
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>):Promise<void>  {
        e.preventDefault();

        if (input.username !== "" && input.password !== "" && auth && auth.login) {
            const loggedIn = await auth.login({ username: input.username, password: input.password });
            if (loggedIn) {
                navigate("/account");
            } else {
                setUserExistence("Credentials don't match");
            }
        }
    };

    /**
     * Функция для обработки ввода данных
     * @param {React.ChangeEvent<HTMLInputElement>} e - Событие изменения поля ввода(инпут)
     * */
    function handleInput (e: React.ChangeEvent<HTMLInputElement>):void {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /**
     * Функция для изменения видимости пароля */
    function toggleVisibility():void {
        if (passwordInputRef.current) {
            if (passwordType === "password") {
                setPasswordType("text");
                setPasswordIcon(unlockedPassword);
            } else {
                setPasswordType("password");
                setPasswordIcon(lockedPassword);
            }
        }
    }

    return (
        <Container className="login-container">
            <main className="login-component">
                <h1 className="login__title title text-center">Login</h1>
                <div className="login-form-wrapper">
                    <Form className="login__form " noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="validationMail">
                            <Form.Control
                                className="login__input"
                                required
                                type="username"
                                name="username"
                                placeholder="Username"
                                autoFocus={true}
                                onChange={handleInput}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3 login__password"
                            controlId="validationPassword">
                            <Form.Control
                                className="login__input"
                                required
                                ref={passwordInputRef}
                                type={passwordType}
                                name="password"
                                placeholder="Password"
                                onChange={handleInput}
                            />
                            <img
                                className="login__password-logo"
                                onClick={toggleVisibility}
                                src={passwordIcon}
                                alt=""
                            />
                        </Form.Group>
                        <div className="login-options__user-existance">
                            {userExistence}
                        </div>
                        <Button className="login__button" type="submit">
                            Войти
                        </Button>
                        <div className="login-options__haveaccount">
                            Don't have account?&nbsp;<Link className="login-options__haveaccount2" to="/auth/register"> Register</Link>
                        </div>
                    </Form>
                </div>
            </main>
        </Container>
    )

}
