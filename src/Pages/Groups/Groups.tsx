import Container from "react-bootstrap/Container";
import axios from "axios";
import {useEffect, useState} from "react";
import HomeGroupCard from "../../Components/HomeGroupCard/HomeGroupCard.tsx";
import './Groups.scss'

interface Group {
    id: number,
    title: string,
    author: string,
    description: string,
}

function Groups() {

    const [groups, setGroups] = useState<Group[]>([]);
    useEffect( () => {
        getGroups().then((data) => {
            setGroups(data);
        });
    }, []);

    async function getGroups() {
        try {
            const groupRequest = await axios.get(`${import.meta.env.VITE_API_URL}/group/`, {});
            return groupRequest.data;
        } catch (err) {
            console.log(err);
            // window.location.reload();
        }
    }

    return (
        <Container className="groups">
            <div className="browse-items">
                <div className="browse-items__top">
                    <div className="browse-items__left"><h2>Brows groups</h2></div>
                </div>
                <div className="division-line"></div>
                <div className="browse-items__bottom">
                    {
                        groups?.map(post => (
                            <HomeGroupCard key={post.id} id={post.id} title={post.title} description={post.description}>
                            </HomeGroupCard>
                        ))
                    }
                </div>
            </div>
        </Container>
    );
}

export default Groups;