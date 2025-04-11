import './AccountTaskCard.scss';
import {useAuth} from "../../App/auth/authProvider.tsx";
import axios from "axios";

interface AccountTaskCard {
    id: number,
    title: string,
    description: string,
    onDelete: (id: number) => void;
};

function AccountTaskCard({ onDelete, id, title, description }: AccountTaskCard) {
    const auth = useAuth();

    function sliceDescription(description: string): string {
        const updatedDescription = description.split(' ').slice(0, 10).join(' ');
        return updatedDescription + '...';
    }

    async function completeTask() {
        try {
            const completeRequest = await axios.post(`${import.meta.env.VITE_API_URL}/task/complete/${id}`, {} , {
                headers: {
                    "Authorization": `Bearer ${auth?.accessToken}`,
                },
            });
            onDelete(id);
            return completeRequest.data;
        } catch (err) {
            console.log(err);
        }
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
                <div className="task-card__button" onClick={completeTask}>Complete</div>
            </div>
        </div>
);
}

export default AccountTaskCard;