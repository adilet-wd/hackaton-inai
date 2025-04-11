import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";
import Container from "react-bootstrap/Container";
import './Group.scss';
import TaskCard from "../../Components/TaskCard/TaskCard.tsx";
import {useAuth} from "../../App/auth/authProvider.tsx";

interface group {
    id: number;
    owner_id: number;
    title: string;
    author: string;
    description: string;
    views: number;
    Subscribe: subscriber[];
    task: task[];
}
interface task {
    complete_user: string
    completed: boolean
    description: string
    group_id: number
    group_title: string
    id: number
    title: string
}
interface subscriber {
    group_id: string;
    group_title: string;
    id: number;
    user_id: number;
    user_username: string;
}

const Group = () => {
    const auth = useAuth();

    const { id } = useParams();
    const [group, setGroup] = useState<group>();
    const [tasks, setTasks] = useState<task[]>([]);
    const [ subscribers, setSubscribers] = useState<subscriber[]>([]);

    // function removeCompletedTasks() {
    //     setTasks(prevTasks => prevTasks.filter(task => !task.completed));
    // }

    async function getGroup() {
        try {
            const groupRequest = await axios.get(`${import.meta.env.VITE_API_URL}/group/${id}`, {});
            console.log(groupRequest.data);
            return groupRequest.data;
        } catch (err) {
            console.log(err);
        }
    }

    async function signUpToGroup() {
        try {
            const completeRequest = await axios.post(`${import.meta.env.VITE_API_URL}/subscribe/${group?.id}`, {} , {
                headers: {
                    "Authorization": `Bearer ${auth?.accessToken}`,
                },
            });
            console.log(subscribers);
            alert('You have signed up');
            return completeRequest.data;
        } catch (err) {
            alert('You have already signed up');
            console.log(err);
        }
    }

    useEffect( () => {
        getGroup().then((data) => {
            setGroup(data);
            setTasks(data.task);
            setSubscribers(data.Subscribe);
        });
    }, [id]);

    return (
        <>
            <Container className='group-container'>
                <div className="group-title__block">
                    <div className='group-title__left'>
                        <img className="group-title__logo" src="https://placehold.co/200x200" alt=""/>
                    </div>
                    <div className='group-title__right'>
                        <h3 className={"text-uppercase text-center"}>Volunteering club</h3>
                        <h1 className={"text-uppercase text-center"}>{group?.title || "Undefined"}</h1>
                        { auth?.isAuthenticated ? <div className="task-card__button" onClick={signUpToGroup}>Sign Up</div> :  <></> }
                    </div>
                </div>

                <div className={"text-center group-text"}>
                    {group?.description || "Placeholder text is used to demonstrate the layout of the page and does not carry any meaning. It\n" +
                        "                   helps to see how the final design will look. Pay attention to fonts, line spacing, and margins to\n" +
                        "                   make the project harmonious."}
                </div>
                <div className="division-line"></div>

                <div className="browse-items">
                    <div className="browse-items__top">
                        <div className="browse-items__left"><h2>Brows tasks</h2></div>
                    </div>
                    <div className="browse-items__bottom">
                        {
                            tasks.length ? tasks.map(task => (
                                <TaskCard key={task.id} id={task.id} completed={task.completed} title={task.title} description={task.description}>
                                </TaskCard>
                            )) : <div className="browse-items__notfound">No tasks are available now</div>
                        }
                    </div>

                </div>
            </Container>
        </>
    )

}

export default Group;
