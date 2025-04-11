import React, {createContext} from "react";
import {LoginData, RegistrationData, UserData} from "./authProvider.tsx";

/**
*Интерфейс для контекста авторизации
* @property {string} accessToken Токен доступа
* @property {React.Dispatch<React.SetStateAction<string>>} setAccessToken - Установка токена доступа
* @property {string} refreshToken - Токен обновления
* @property { React.Dispatch<React.SetStateAction<string>>} setRefreshToken - Установка токена обновления
 * @property {(token: string) => Promise<String>} refreshAccessToken - Функция для обновления токена доступа
 * @property {(data: LoginData) => void} login - Функция для входа пользователя
 * @property {(data: RegistrationData) => void} register - Функция для регистрации пользователя
 * @property {() => void} logOut - Функция для выхода пользователя
 * @property {UserData} user - Данные пользователя
 * @property {boolean} isAuthenticated -  Авторизован ли пользователь на сайте
*/
interface AuthContextType {
    accessToken?: string;
    setAccessToken?: React.Dispatch<React.SetStateAction<string>>;
    refreshToken?: string;
    setRefreshToken?: React.Dispatch<React.SetStateAction<string>>;
    refreshAccessToken?: (token: string) => Promise<string>;
    login?: (data: LoginData) => Promise<boolean>;
    register?: (data: RegistrationData) => Promise<boolean>;
    logOut?: () => void;
    user?: UserData | null;
    isAuthenticated?: boolean;
}


/**
 * Создание контекста авторизации
 * */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;