import Container from "react-bootstrap/Container";
import "./Home.scss";
import meshblue from "../../assets/images/meshblue.svg";
import mockup from "../../assets/images/mockup.png";
import Calculator from "../../Components/Calculator/Calculator";
import About from "../../Components/About/About.tsx";

function Home() {


  return (
          <Container className="home">
                <div className="homeBlock">
                      <div className="homeBlock_title">
                            <h3 className={"text-uppercase"}>
                                  Финансовая грамотность начинается здесь.
                            </h3>
                            <h1 className={"text-uppercase"}>
                                  Понимай. <br/> Сравнивай.
                                  <br/> Получай кредит
                                  <br/> с уверенностью
                            </h1>
                      </div>
                      <img src={meshblue} alt="error" className="homeMesh"/>
                      <img src={mockup} alt="error" className="homePhones"/>
                </div>
                <div className="division-line"></div>
                <Calculator/>
                <About></About>
          </Container>
  );
}

export default Home;
