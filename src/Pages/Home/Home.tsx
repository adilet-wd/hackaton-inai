import Container from "react-bootstrap/Container";
import "./Home.scss";
import axios from "axios";
import {useEffect, useState} from "react";
import HomeGroupCard from "../../Components/HomeGroupCard/HomeGroupCard.tsx";
import {Link} from "react-router-dom";


interface Group {
    id: number,
    title: string,
    author: string,
    description: string,
}

function Home() {

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
        <Container className="home">
            <h3 className={"text-uppercase text-center"}>Slogan</h3>
            <h1 className={"text-uppercase text-center"}>Best decision<br/> to your service</h1>
            <div className={"text-center home-text"}>
                Placeholder text is used to demonstrate the layout of the page and does not carry any meaning. It helps to see how the final design will look. Pay attention to fonts, line spacing, and margins to make the project harmonious.
            </div>
            <div className="division-line"></div>
              <div className="browse-items">
                    <div className="browse-items__top">
                          <div className="browse-items__left"><h2>Brows groups</h2></div>
                          <div className="browse-items__right text-center">Explore all the components and pages below.
                                They can
                                be reused across all your projects and easily customized to fit your brand and project
                                needs.
                          </div>
                    </div>
                    <div className="division-line"></div>

                    <iframe src="https://bakai.kg/ru/individual/credits/13/" width="900" height="300" frameBorder="0"
                            scrolling="yes"></iframe>
                    <div className="division-line"></div>
                    <div className="browse-items__bottom">
                          {
                                groups?.map(post => (
                                        <HomeGroupCard key={post.id} id={post.id} title={post.title}
                                                       description={post.description}>
                                        </HomeGroupCard>
                                ))
                          }
                    </div>
                    <Link to={"/groups/"} className="browse-items__learn-more">Learn more</Link>
              </div>
        </Container>
    );
}

export default Home;