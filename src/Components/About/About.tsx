import { useEffect, useState } from "react";
import "./About.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import {FreeMode, Mousewheel} from "swiper/modules";

interface Bank {
      id: number,
      name: string,
      data: BankData
}
interface BankData {
      logoUrl: string,
      description: string,
      website: string
}

const About = () => {
  const [data, setData] = useState<Bank[]>([]); // сюда сохраняем данные
  const [bankAbout, setBankAbout] = useState<Bank>(); // сюда сохраняем данные

  useEffect(() => {
    fetch("http://94.198.218.208:1011/bank-api/banks")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json(); // или response.text(), если это не JSON
      })
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div>
      <div>
        <Swiper
          slidesPerView={4}
          spaceBetween={40}
          loop={true}
          freeMode={true}
          mousewheel={true}
          modules={[FreeMode, Mousewheel]}
          className="mySwiper"
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="banksBlock" onClick={() => setBankAbout(item)}>
                <img
                  src={item.data.logoUrl}
                  alt="error"
                  className="bankLogos"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
          {bankAbout && bankAbout.data ? (
                  <div className="aboutBlock">
                        <div className="aboutLogo_link">
                              <img src={bankAbout.data.logoUrl} alt="" />
                              <a href={bankAbout.data.website} className="aboutBtn">
                                    Подробнее
                              </a>
                        </div>
                        <h2>{bankAbout.name}</h2>
                        <h4 className="">{bankAbout.data.description}</h4>
                  </div>
          ) : null}
    </div>
  );
};

export default About;
