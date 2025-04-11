import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthContext from "./authContext";
import axios from "axios";

/**
 * Интерфейс для данных входа в систему
 * @property {string} username - Имя пользователя
 * @property {string} password - Пароль пользователя
 */
export interface LoginData {
    username: string;
    password: string;
}

export interface RegistrationData {
    name: string;
    username: string;
    surname: string;
    email: string;
    password: string;
}

/**
 * Интерфейс данных пользователя получаемых с бд
 * @property {string} email - Электронная почта пользователя
 * @property {number} id - Уникальный идентификатор пользователя
 * @property {string} password - Пароль пользователя
 * @property {string} role - Роль пользователя в системе
 * @property {string} username - Имя пользователя
 */
export interface UserData {
    email: string;
    id: number;
    password: string;
    role: string;
    username: string;
}


/**
 * Компонент для авторизации пользователя
 * @param {React.ReactNode} children - Дочерние компоненты
 * @return {JSX.Element} - Компонент для авторизации пользователя
 */
const AuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const navigate = useNavigate();

    /**
     * Состояние для хранения данных пользователя * */
    const [user, setUser] = useState<UserData | null>(null);
    /**
     *  Состояние для хранения токена доступа*/
    const [accessToken, setAccessToken] = useState<string>(localStorage.getItem("bricsAccessToken") || "");
    /**
     * Состояние для хранения токена обновления*/
    const [refreshToken, setRefreshToken] = useState<string>(localStorage.getItem("bricsRefreshToken") || "");
    /**
     * Состояние для хранения аутентификации пользователя*/
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        const storedValue = localStorage.getItem("isAuthenticatedOnBrics");
        return storedValue === "true";
    });

    /**
     * Функция для регистрации пользователя
     * @param {RegistrationData} data - Данные для регистрации
     * @return {Promise<boolean>} - Возвращает true если пользователь успешно зарегистрирован, иначе false
     */
    async function register(data: RegistrationData): Promise<boolean> {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register/`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const res = response.data;
            if (!res) return false;

            if(response.status === 201) {
                const userRequest = await axios.get(`${import.meta.env.VITE_API_URL}/user/myProfile/`, {
                    headers: {
                        "Authorization": `Bearer ${res.accessToken}`,
                    },
                });
                const userData = userRequest.data;
                if (!userData) return false;

                setUser(userData);
                setIsAuthenticated(true);
                setAccessToken(res.accessToken);
                setRefreshToken(res.refreshToken);
                localStorage.setItem("isAuthenticatedOnBrics", "true");
                localStorage.setItem("bricsAccessToken", res.accessToken);
                localStorage.setItem("bricsRefreshToken", res.refreshToken);
                return true;
            }

            return false;
        } catch {
            console.error("Registration failed. Try again later.");
            return false;
        }
    }

    /**
     * Функция для выполнения входа пользователя
     * @param {LoginData} data - Данные для входа
     * @return {Promise<boolean>} - Возвращает true если пользователь успешно вошел, иначе false
     */
    async function login (data: LoginData): Promise<boolean> {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login/`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const res = response.data;
            if (!res) return false;

            const userRequest = await axios.get(`${import.meta.env.VITE_API_URL}/user/myProfile/`, {
                headers: {
                    "Authorization": `Bearer ${res.accessToken}`,
                },
            });
            const userData = userRequest.data;
            if (!userData) return false;

            setUser(userData);
            setIsAuthenticated(true);
            setAccessToken(res.accessToken);
            setRefreshToken(res.refreshToken);
            localStorage.setItem("isAuthenticatedOnBrics", "true");
            localStorage.setItem("bricsAccessToken", res.accessToken);
            localStorage.setItem("bricsRefreshToken", res.refreshToken);
            return true;

        } catch {
            console.error("Unauthorized: Invalid username or password");
            return false;
        }
    }

    /**
     * Функция для выполнения выхода пользователя
     */
    const logOut = (): void => {
        setUser(null);
        setIsAuthenticated(false);
        setAccessToken("");
        setRefreshToken("");
        localStorage.removeItem("bricsAccessToken");
        localStorage.removeItem("bricsRefreshToken");
        localStorage.removeItem("isAuthenticatedOnBrics");
        navigate("/auth/login");
    };

    async function refreshAccessToken(token: string) {

        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/refresh/`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            const res = response.data;

            if (!res) return "";
            setAccessToken(res.accessToken);
            localStorage.setItem("bricsAccessToken", res.accessToken);
            return res.accessToken;

        } catch {
            console.error("Unauthorized: Invalid username or password");
            return "";
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated,accessToken, setAccessToken, refreshToken, refreshAccessToken, setRefreshToken, login, logOut, register, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};