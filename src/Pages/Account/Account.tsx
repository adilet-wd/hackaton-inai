import {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";

import {useAuth} from "../../App/auth/authProvider.tsx";
import axios from "axios";
import './Account.scss'
import {Link} from "react-router-dom";
import AccountTaskCard from "../../Components/AccountTaskCard/AccountTaskCard.tsx";


interface User {
    id?: number;
    username?: string,
    email?: string,
    name?: string,
    surname?: string,
    rating?: number,
    Subscribe: Subscriber[];
    tasks: Task[];
}

interface Task {
    complete_user: string;
    completed: boolean;
    description: string;
    group_id: number;
    group_title: string;
    id: number;
    title: string;
}
interface Subscriber {
    group_id?: string;
    group_title?: string;
}

function Account() {
    const auth = useAuth();

    const [activeTab, setActiveTab] = useState('info');
    const [user, setUser] = useState<User | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [groups, setGroups] = useState<Subscriber[]>([]);

    // Обновление состояния вкладок при изменении хэша
    useEffect(() => {
        window.onhashchange = () => {
            setActiveTab(window.location.hash.substring(1));
        };
    }, []);

    /*  Получение данных пользователя  при входе на страницу*/
    useEffect(() => {
        if(auth?.accessToken){
            getProfile(auth.accessToken).then((data) => {
                setUser(data);
                setGroups(data.Subscribe);
                setTasks(data.tasks);
                removeCompletedTasks();
            });
        }
    }, []);

    function removeCompletedTasks() {
        setTasks(prevTasks => prevTasks.filter(task => !task.completed));
    }


    /**
     * Получение профиля пользователя
     * @param {string} token - Токен доступа пользователя
     */
    async function getProfile(token: string): Promise<User> {
        try {
            const userRequest = await axios.get(`${import.meta.env.VITE_API_URL}/user/myProfile/`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            return userRequest.data;
        }
        catch (error) {

            if (axios.isAxiosError(error) && error.response) {
                const status = error.response.status;

                if(status == 401
                    && auth?.refreshToken && auth?.refreshAccessToken) {
                    const accessToken = await auth?.refreshAccessToken(auth?.refreshToken);
                    if(accessToken) {
                        try {
                            const userRequest = await axios.get(`${import.meta.env.VITE_API_URL}/user/myProfile/`, {
                                headers: {
                                    "Authorization": `Bearer ${accessToken}`,
                                },
                            });
                            return userRequest.data;
                        } catch {
                            console.error("An unexpected error occurred");
                            return {id: 0, Subscribe: [], tasks: [], username: "Undefined", email: "", surname: "", name: ""};
                        }
                    }
                    else {
                        logOut();
                        return {id: 0, Subscribe: [], tasks: [], username: "Undefined", email: "", surname: "", name: ""};
                    }
                }
                else {
                    console.error("An unexpected error occurred");
                    return {id: 0, Subscribe: [], tasks: [], username: "Undefined", email: "", surname: "", name: ""};

                }
            }
            else {
                console.error("An unexpected error occurred");
                return {id: 0, Subscribe: [], tasks: [], username: "Undefined", email: "", surname: "", name: ""};
            }
        }
    }

    /**
     *  Выход из аккаунта */
    function logOut():void{
        if (auth && auth.logOut) {
            auth.logOut();
        }
    }

    /**
     *  хэш URL при изменении вкладки
    * @param {string} tab - Название вкладки
     */
    function handleTabChange(tab: string) {
        setActiveTab(tab);
        window.location.hash = tab;
    };
    /**
     * Обработка изменения ввода данных
     * @param {keyof User} property - Свойство пользователя
     * @param {string | number} value - Значение свойства
     */
    function handleInputChange(property: keyof User, value: string | number) {
        setUser((prevUser) => {
            if (prevUser) {
                return { ...prevUser, [property]: value };
            }
            return prevUser;
        });
        // console.log(user);
    }

    function handleTaskDelete(taskId: number) {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }

    return (
        <Container className={"myProfile-container"}>
            <div className={"myProfile"}>
                <div className={"myProfile-left"}>

                    <button
                        className={[activeTab === 'info' ? 'active' : '', "myProfile-left__button"].join(' ')}
                        onClick={() => handleTabChange('info')}>
                        <div className={'myProfile-account myProfile-icon'}>Account</div>
                    </button>

                    <button
                        className={[activeTab === 'data' ? 'active' : '', "myProfile-left__button"].join(' ')}
                        onClick={() => handleTabChange('data')}>
                        <div className={'myProfile-data myProfile-icon'}>Data</div>
                    </button>

                    <button
                        className={[activeTab === 'groups' ? 'active' : '', "myProfile-left__button"].join(' ')}
                        onClick={() => handleTabChange('groups')}>
                        <div className={'myProfile-groups myProfile-icon'}>Groups</div>
                    </button>

                    <button
                        className={[activeTab === 'tasks' ? 'active' : '', "myProfile-left__button"].join(' ')}
                        onClick={() => handleTabChange('tasks')}>
                        <div className={'myProfile-tasks myProfile-icon'}>Tasks</div>
                    </button>

                </div>
                <div className={"myProfile-right"}>
                    {activeTab === 'info' && <>
                        <div className={"myProfile-right__info"}>
                            <div className={"myProfile-right__info-title"}>
                                Personal information
                            </div>
                            <table className={"myProfile-right__info-inputs"}>
                                <tbody>
                                <tr className={"myProfile-right__info-input"}>
                                    <td className="myProfile-right__info-column1">Username</td>
                                    <td className="myProfile-right__info-column2">
                                        <input className={"myProfile-right__information"} type="text" name="username"
                                               value={user?.username || ""} readOnly={true}
                                               onChange={(e) => handleInputChange('username', e.target.value)}></input>
                                    </td>
                                </tr>
                                <tr className={"myProfile-right__info-input"}>
                                    <td className="myProfile-right__info-column1">Email</td>
                                    <td className="myProfile-right__info-column2">
                                        <input className={"myProfile-right__information"} type="text" name="email"
                                               value={user?.email || ""} readOnly={true}
                                               onChange={(e) => handleInputChange('email', e.target.value)}></input>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <button className={"myProfile-right__logout"} onClick={logOut}>LogOut</button>
                    </>}
                    {activeTab === 'data' && <>
                        <div className={"myProfile-right__info"}>
                            <div className={"myProfile-right__info-title"}>
                                Personal data
                            </div>
                            <table className={"myProfile-right__info-inputs"}>
                                <tbody>
                                <tr className={"myProfile-right__info-input"}>
                                    <td className="myProfile-right__info-column1">Rating</td>
                                    <td className="myProfile-right__info-column2">
                                        <input className={"myProfile-right__information"} type="text" name={"rating"}
                                               value={`${user?.rating}` || ""} readOnly={true}
                                               onChange={(e) => handleInputChange('rating', e.target.value)}></input>
                                    </td>
                                </tr>
                                <tr className={"myProfile-right__info-input"}>
                                    <td className="myProfile-right__info-column1">Surname</td>
                                    <td className="myProfile-right__info-column2">
                                        <input className={"myProfile-right__information"} type="text" name={"username"}
                                               value={user?.surname || ""} readOnly={true}
                                               onChange={(e) => handleInputChange('surname', e.target.value)}></input>
                                    </td>
                                </tr>
                                <tr className={"myProfile-right__info-input"}>
                                    <td className="myProfile-right__info-column1">Name</td>
                                    <td className="myProfile-right__info-column2">
                                        <input className={"myProfile-right__information"} type="text" name={"name"}
                                               value={user?.name || ""} readOnly={true}
                                               onChange={(e) => handleInputChange('name', e.target.value)}></input>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </>}

                    {activeTab === 'tasks' && <>
                        <div className={"myProfile-right__info"}>
                            <div className={"myProfile-right__info-title"}>
                                Tasks
                            </div>
                            <div className="browse-items">
                                <div className="browse-items__bottom">
                                    {
                                        tasks.length ? tasks.map(task => (
                                            <AccountTaskCard key={task.id} id={task.id} title={task.title}
                                                      description={task.description} onDelete={handleTaskDelete}>
                                            </AccountTaskCard>
                                        )) : <div className="browse-items__notfound">No tasks are available now</div>
                                    }
                                </div>

                            </div>
                        </div>
                    </>}

                    {activeTab === 'groups' && <>
                        <div className={"myProfile-right__info"}>
                            <div className={"myProfile-right__info-title"}>
                                Groups
                            </div>
                            <div className='groups-block'>
                                {
                                    groups?.map(group => (
                                        <Link to={`/groups/${group.group_id}`} key={group.group_id} className={"groups-block__item"}>
                                            {group.group_title}

                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </>}


                        </div>
                    </div>
                        </Container>
                        );
                    }

                    export default Account;