import React, { useEffect, useRef, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {RegistrationData, useAuth} from "../../App/auth/authProvider.tsx";
import axios from "axios";

import { Button, Container, Form } from "react-bootstrap";
import unlockedPassword from "../../assets/icons/unlock-password.svg";
import lockedPassword from "../../assets/icons/lock-password.svg";
import xmarkFeedback from "../../assets/icons/xmarkFeedback.svg";
import "./Register.scss";

export default function Register() {
    const auth = useAuth();
    const navigate = useNavigate();

    /**
     * Состояние для хранения состояния регистрации
     * Если происходит ошибка, то в него помещается сообщение об ошибке*/
    const [ isRegisterSucceed, setIsRegisterSucceed] = useState<string>("");

    // *
    // Ссылка на поле ввода пароля */
    const passwordInputRef = useRef<HTMLInputElement>(null);

    /**
     * Состояние для хранения типа пароля */
    const [passwordType, setPasswordType] = useState("password");
    /**
     * Состояние для хранения иконки пароля */
    const [passwordIcon, setPasswordIcon] = useState(lockedPassword);

    /**
     * Состояние для хранения состояния запроса
     * */
    const [ isRequestSent, setIsRequestSent ] = useState(false);

    /**
     * Состояние для хранения валидации формы
     * */
    const [validated] = useState(false);

    /**
     * Состояние для хранения email пользователя
     * */
    const [emailForm, setEmailForm] = useState<string>("");

    /**
     * Состояние для хранения ошибок формы email
     * */
    const [emailFormErrors, setEmailFormErrors] = useState<string[]>([]);

    /**
     * Состояние для хранения username пользователя
     * */
    const [usernameForm, setUsernameForm] = useState<string>("");

    /**
     * Состояние для хранения ошибок формы username
     * */
    const [usernameFormErrors, setUsernameFormErrors] = useState<string[]>([]);

    /**
     * Состояние для хранения name пользователя
     * */
    const [nameForm, setNameForm] = useState<string>("");

    /**
     * Состояние для хранения ошибок формы name
     * */
    const [nameFormErrors, setNameFormErrors] = useState<string[]>([]);

    /**
     * Состояние для хранения surname пользователя
     * */
    const [surnameForm, setSurnameForm] = useState<string>("");

    /**
     * Состояние для хранения ошибок формы surname */
    const [surnameFormErrors, setSurnameFormErrors] = useState<string[]>([]);

    /**
     * Состояние для хранения password пользователя
     * */
    const [passwordForm, setPasswordForm] = useState<string>("");

    /**
     * Состояние для хранения ошибок формы password */
    const [passwordFormErrors, setPasswordFormErrors] = useState<string[]>([]);

    /**
     * Состояние для хранения повторения пароля пользователя
     * */
    const [repeatPasswordForm, setRepeatPasswordForm] = useState<string>("");

    /**
     * Состояние для хранения ошибок формы повторения пароля */
    const [repeatPasswordFormError, setRepeatPasswordFormError] = useState<string>("");

    const timeoutId = useRef<NodeJS.Timeout | null>(null);

    /**
     * Валидация email
     * @param {string} email - Почта пользователя
     * @return {boolean} - Возвращает true если email валиден, иначе false
     * */
    async function validateEmail(email: string) : Promise<boolean> {
        const errors = [];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push("Enter valid email");
        }
        if(errors.length === 0) {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
            timeoutId.current = setTimeout(async () => {
                if (isRequestSent === false) {
                    const isUsernameTaken = await checkIfEmailIsTaken(email);
                    if (isUsernameTaken == true) {
                        errors.push("Email is already taken");
                        setEmailFormErrors(["Email is already taken"]);
                    }
                }
            }, 1500);
        }
        setEmailFormErrors(errors);
        return errors.length === 0;
    };
    /**
     * Обработка изменения email
     * @param {React.ChangeEvent<HTMLInputElement>} e - Событие изменения (инпут)
     * */
    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>):void {
        setEmailForm(e.target.value);
        validateEmail(e.target.value);
    };
    /**
     * Есть ли пользователь с таким email
     * @param {string} email - Имя пользователя
     * @return {Promise<boolean>} - Возвращает true если пользователь существует, иначе false
     * */
    async function checkIfEmailIsTaken(email: string): Promise<boolean> {
        try {
            const userRequest = await axios.post(`${import.meta.env.VITE_API_URL}/auth/check-email/`, {email: email}, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return userRequest.data;
        } catch {
            return true;
        }
    }


    /**
     * Валидация username
     * @param {string} username - Имя пользователя
     * @return {Promise<boolean>} - Возвращает true если username валиден, иначе false
     * */
    async function validateUsername(username: string):Promise<boolean> {
        const errors = [];
        if (username.length == 0) {
            errors.push("Enter your username");
        }
        if (username.length > 16) {
            errors.push("Username should be less than 16 characters long");
        }
        if (/[^a-zA-Z0-9]/.test(username)) {
            errors.push("Only Latin letters and numbers are allowed");
        }

        if(errors.length === 0) {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
            timeoutId.current = setTimeout(async () => {
                if (isRequestSent === false) {
                    const isUsernameTaken = await checkIfUsernameIsTaken(username);
                    if (isUsernameTaken == true) {
                        errors.push("Username is already taken");
                        setUsernameFormErrors(["Username is already taken"]);
                    }
                }
            }, 1500);
        }

        setUsernameFormErrors(errors);
        return errors.length === 0;
    };
    /**
     * Обработка изменения username
     * @param {React.ChangeEvent<HTMLInputElement>} e - Событие изменения (инпут)
     * */
    function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>):void {
        setUsernameForm(e.target.value);
        validateUsername(e.target.value);
    };
    /**
     * Есть ли пользователь с таким username
     * @param {string} username - Имя пользователя
     * @return {Promise<boolean>} - Возвращает true если пользователь существует, иначе false
     * */
    async function checkIfUsernameIsTaken(username: string): Promise<boolean> {
        try {
            const userRequest = await axios.post(`${import.meta.env.VITE_API_URL}/auth/check-username/`, {username: username}, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return userRequest.data;
        } catch {
            return true;
        }
    }

    /**
     * Валидация name
     * @param {string} name - Имя пользователя
     * @return {boolean} - Возвращает true если name валиден, иначе false
     * */
    function validateName(name: string): boolean {
        const errors = [];

        if (name.length === 0) {
            errors.push("Enter your name");
        }
        if (name.length > 16) {
            errors.push("Name should be less than 16 characters long");
        }

        if (/[^a-zA-Zа-яА-Я]/.test(name)) {
            errors.push("Only Latin letters are allowed");
        }

        setNameFormErrors(errors);
        return errors.length === 0;
    };
    /**
     * Обработка изменения name
     * @param {React.ChangeEvent<HTMLInputElement>} e - Событие изменения (инпут)
     * */
    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>):void {
        setNameForm(e.target.value);
        validateName(e.target.value);
    };

    /**
     * Валидация surname
     * @param {string} surname - Фамилия пользователя
     * */
    function validateSurname(surname: string):boolean {
        const errors = [];

        if (surname.length === 0) {
            errors.push("Enter your surname");
        }
        if (surname.length > 20) {
            errors.push("Surname should be less than 20 characters long");
        }
        if (/[^a-zA-Zа-яА-Я]/.test(surname)) {
            errors.push("Only Latin letters are allowed");
        }

        setSurnameFormErrors(errors);
        return errors.length === 0;
    };
    /**
     * Обработка изменения surname
     * @param {React.ChangeEvent<HTMLInputElement>} e - Событие изменения (инпут)
     * */
    function handleSurnameChange(e: React.ChangeEvent<HTMLInputElement>):void {
        setSurnameForm(e.target.value);
        validateSurname(e.target.value);
    };

    /**
     * Валидация password
     * @param {string} password - Пароль пользователя
     * @return {boolean} - Возвращает true если password валиден, иначе false
     * */
    function validatePassword(password: string):boolean {
        const errors = [];

        if (password.length < 8) {
            errors.push("Password should be at least 8 characters long");
        }
        if (password.length > 30) {
            errors.push("Password should be less than 30 characters long");
        }
        if (!/[A-Z]/.test(password)) {
            errors.push("Password should contain at least 1 uppercase letter");
        }

        if (!/[a-z]/.test(password)) {
            errors.push("Password should contain at least 1 lowercase letter");
        }

        if (!/[0-9]/.test(password)) {
            errors.push("Password should contain at least 1 number");
        }

        setPasswordFormErrors(errors);
        return errors.length === 0;
    };
    /**
     * Обработка изменения password
     * @param {React.ChangeEvent<HTMLInputElement>} e - Событие изменения (инпут)
     * */
    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>):void {
        setPasswordForm(e.target.value);
        validatePassword(e.target.value);
    };

    /**
     * Валидация повторения пароля
     * @param {string} password - Пароль пользователя
     * */
    function validateRepeatPassword(password: string):boolean {
        if (password !== passwordForm) {
            setRepeatPasswordFormError("Passwords don't match");
            return false;
        }
        setRepeatPasswordFormError("");
        return true;
    };
    /**
     * Обработка изменения повторения пароля
     * @param {React.ChangeEvent<HTMLInputElement>} e - Событие изменения (инпут)
     * */
    function handleRepeatPasswordChange(e: React.ChangeEvent<HTMLInputElement>):void {
        setRepeatPasswordForm(e.target.value);
        validateRepeatPassword(e.target.value);
    };

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

    /**
     * Функция для обработки отправки формы
     * @param {React.FormEvent<HTMLFormElement>} event - Событие отправки формы
     * */
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const isEmailValid = await validateEmail(emailForm);
        const isUsernameValid = await validateUsername(usernameForm);
        const isNameValid = validateName(nameForm);
        const isSurnameValid = validateSurname(surnameForm);
        const isPasswordValid = validatePassword(passwordForm);
        const isRepeatPasswordValid = validateRepeatPassword(repeatPasswordForm);

        const dataToSubmit: RegistrationData = {
            username: formData.get("username") as string,
            email: formData.get("email") as string,
            surname: formData.get("surname") as string,
            name: formData.get("name") as string,
            password: formData.get("password") as string,
        };

        if(isEmailValid && isUsernameValid && isNameValid && isSurnameValid && isPasswordValid && isRepeatPasswordValid &&
            auth && auth.register) {
            const loggedIn = await auth.register(dataToSubmit);
            if(loggedIn) {
                navigate("/account");
            } else {
                setIsRequestSent(true);
                setIsRegisterSucceed("Registration failed, try later");
            }

        }

    }

    return (
        <Container className="register-container">
            <main className="register-component">
                <h1 className="register__title title text-center">Register</h1>
                <div className="register-form-wrapper">
                    <Form className="register__form" noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 register__group register__email" controlId="validationEmail">
                            <Form.Control
                                autoFocus={true}
                                className="register__input"
                                required
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                value={emailForm}
                                onChange={handleEmailChange}
                            />
                            <Form.Control.Feedback className="register__invalid-feedback" type="invalid">
                                {emailFormErrors ? emailFormErrors.map((error, index) => (
                                        <div key={index} className="invalid-feeback__item">
                                            <img src={xmarkFeedback} alt="" width={20} height={20}/>
                                            {error}
                                        </div>
                                    ))
                                    : null}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group
                            className="mb-3 register__group register__name"
                            controlId="validationUsername">
                            <Form.Control
                                className="register__input"
                                required
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={usernameForm}
                                onChange={handleUsernameChange}
                            />
                            <Form.Control.Feedback className="register__invalid-feedback" type="invalid">
                                {usernameFormErrors ? usernameFormErrors.map((error, index) => (
                                        <div key={index} className="invalid-feeback__item">
                                            <img src={xmarkFeedback} alt="" width={20} height={20}/>
                                            {error}
                                        </div>
                                    ))
                                    : null}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group
                            className="mb-3 register__group register__name"
                            controlId="validationName">
                            <Form.Control
                                className="register__input"
                                required
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={nameForm}
                                onChange={handleNameChange}
                            />
                            <Form.Control.Feedback className="register__invalid-feedback" type="invalid">
                                {nameFormErrors ? nameFormErrors.map((error, index) => (
                                        <div key={index} className="invalid-feeback__item">
                                            <img src={xmarkFeedback} alt="" width={20} height={20}/>
                                            {error}
                                        </div>
                                    ))
                                    : null}
                            </Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group
                            className="mb-3 register__group register__surname"
                            controlId="validationSurname">
                            <Form.Control
                                className="register__input"
                                required
                                type="text"
                                name="surname"
                                placeholder="Surname"
                                value={surnameForm}
                                onChange={handleSurnameChange}
                            />

                            <Form.Control.Feedback className="register__invalid-feedback" type="invalid">
                                {surnameFormErrors ? surnameFormErrors.map((error, index) => (
                                        <div key={index} className="invalid-feeback__item">
                                            <img src={xmarkFeedback} alt="" width={20} height={20}/>
                                            {error}
                                        </div>
                                    ))
                                    : null}
                            </Form.Control.Feedback>

                        </Form.Group>

                        <Form.Group
                            className="mb-3 register__group register__password"
                            controlId="validationPassword">
                            <div className="register__password-top">
                                <Form.Control
                                    className="register__input"
                                    required
                                    ref={passwordInputRef}
                                    type={passwordType}
                                    name="password"
                                    placeholder="Password"
                                    value={passwordForm}
                                    onChange={handlePasswordChange}
                                />
                                <img
                                    className="register__password-logo"
                                    onClick={toggleVisibility}
                                    src={passwordIcon}
                                    alt=""
                                />
                            </div>
                            <div className="register__password-bottom">
                                <Form.Control.Feedback className="register__invalid-feedback" type="invalid">
                                    {passwordFormErrors ? passwordFormErrors.map((error, index) => (
                                            <div key={index} className="invalid-feeback__item">
                                                <img src={xmarkFeedback} alt="" width={20} height={20}/>
                                                {error}
                                            </div>
                                        ))
                                        : null}
                                </Form.Control.Feedback>
                            </div>


                        </Form.Group>

                        <Form.Group
                            className="mb-3 register__group register__password"
                            controlId="validationPasswordRepeat">
                            <Form.Control
                                className="register__input"
                                required
                                ref={passwordInputRef}
                                type={passwordType}
                                name="password_confirm"
                                placeholder="Repeat password"
                                value={repeatPasswordForm}
                                onChange={handleRepeatPasswordChange}
                            />
                            <Form.Control.Feedback className="register__invalid-feedback" type="invalid">
                                {repeatPasswordFormError ?
                                    <div className="invalid-feeback__item">
                                        <img src={xmarkFeedback} alt="" width={20} height={20}/>
                                        {repeatPasswordFormError}
                                    </div> : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div className="register__succeed">
                            {isRegisterSucceed}
                        </div>
                        <Button className="register__button" type="submit">
                            Register
                        </Button>
                        <div className="register__option-voity">
                            Already have an account?&nbsp;<Link to="/auth/login"> Login</Link>
                        </div>
                    </Form>
                </div>
                <h4 className="register-signup"></h4>
            </main>
        </Container>
    )
}
