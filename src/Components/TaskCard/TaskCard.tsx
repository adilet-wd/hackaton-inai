import './TaskCard.scss';
import {useAuth} from "../../App/auth/authProvider.tsx";
import axios from "axios";

interface TaskCardProps {
    id: number,
    title: string,
    description: string,
    completed: boolean,
};

function TaskCard({ completed, id, title, description }: TaskCardProps) {

    const auth = useAuth();

    async function signUpToTask() {
        try {
            const completeRequest = await axios.post(`${import.meta.env.VITE_API_URL}/task/${id}`, {} , {
                headers: {
                    "Authorization": `Bearer ${auth?.accessToken}`,
                },
            });
            alert('You have signed up');
            return completeRequest.data;

        } catch (err) {
            console.log(err);
        }
    }

    function sliceDescription(description: string): string {
        const updatedDescription = description.split(' ').slice(0, 10).join(' ');
        return updatedDescription + '...';
    }

    return (
        <div className='task-card'>
            <img className="task-card__img" src={"https://placehold.co/200x200"} alt=""/>
            <div className="task-card__body">
                <div className="task-card__title">
                    {title}
                </div>
                <div className="task-card__info">
                    <div className='info__elem description'>{sliceDescription(description)}</div>
                </div>
                { auth?.isAuthenticated && !completed ? <div className="task-card__button" onClick={signUpToTask}>SignUp</div> :  <></> }
                { auth?.isAuthenticated && completed ? <div className="task-card__button completed">Completed</div> :  <></> }
            </div>
        </div>
    );
}

export default TaskCard;