import {Link} from "react-router-dom";
import './HomeGroupCard.scss';

interface HomeGroupCardProps {
    id: number,
    title: string,
    description: string,
};

function HomeGroupCard({ id, title, description }: HomeGroupCardProps) {

    function sliceDescription(description: string): string {
        const updatedDescription = description.split(' ').slice(0, 10).join(' ');
        return updatedDescription + '...';
    }

    return (
        <Link to={`/groups/${id}`} className='group-card'>
                <img className="group-card__img" src={"https://placehold.co/200x200"} alt=""/>
                <div className="group-card__body">
                    <div className="group-card__title">
                        {title}
                    </div>
                    <div className="group-card__info">
                        <div className='info__elem description'>{sliceDescription(description)}</div>
                    </div>
                </div>
        </Link>
    );
}

export default HomeGroupCard;