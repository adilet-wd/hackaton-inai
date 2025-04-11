import Container from "react-bootstrap/Container";
import "./Home.scss";
import meshblue from "../../assets/images/meshblue.svg";
import mockup from "../../assets/images/mockup.png";
import Calculator from "../../Components/Calculator/Calculator";

// import axios from "axios";
// import {useEffect, useState} from "react";
// import HomeGroupCard from "../../Components/HomeGroupCard/HomeGroupCard.tsx";
// import {Link} from "react-router-dom";

// interface Group {
//     id: number,
//     title: string,
//     author: string,
//     description: string,
// }

function Home() {
  //   const [groups, setGroups] = useState<Group[]>([]);
  //  useEffect( () => {
  //      getGroups().then((data) => {
  //          setGroups(data);
  //      });
  //  }, []);

  // async function getGroups() {
  //     try {
  //         const groupRequest = await axios.get(`${import.meta.env.VITE_API_URL}/group/`, {});
  //         return groupRequest.data;
  //     } catch (err) {
  //         console.log(err);
  //         // window.location.reload();
  //     }
  // }

  return (
    <Container className="home">
      <div className="homeBlock">
        <div className="homeBlock_title">
          <h3 className={"text-uppercase"}>
            Финансовая грамотность начинается здесь.
          </h3>
          <h1 className={"text-uppercase"}>
            Понимай. <br /> Сравнивай.
            <br /> Получай кредит
            <br /> с уверенностью
          </h1>
        </div>
        <img src={meshblue} alt="error" className="homeMesh" />
        <img src={mockup} alt="error" className="homePhones" />
      </div>
      <div className="division-line"></div>
      <Calculator />
      {/* <div className="browse-items">
                <div className="browse-items__top">
                    <div className="browse-items__left"><h2>Brows groups</h2></div>
                    <div className="browse-items__right text-center">Explore all the components and pages below. They can
                        be reused across all your projects and easily customized to fit your brand and project needs.
                    </div>
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
                <Link to={"/groups/"}  className="browse-items__learn-more">Learn more</Link>
            </div> */}
    </Container>
  );
}

export default Home;
