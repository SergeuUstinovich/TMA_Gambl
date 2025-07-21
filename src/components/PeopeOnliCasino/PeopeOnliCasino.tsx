import style from "./PeopeOnliCasino.module.scss";
import "swiper/scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTelegram } from "../../providers/telegram/telegram";
import { Button } from "../../ui/Button";
import { dataPeople } from "./dataPeople";
import { useNavigate } from "react-router-dom";

export function PeopeOnliCasino() {
  const { tg } = useTelegram();
  const navigate = useNavigate();
  const handleInfo = (id: string) => {
    return null
    // navigate(`/${id}`);
  };
  return (
    <div className={style.box}>
      <h3 className={style.title}>💛 Легенды онлайн казино</h3>
      <Swiper
        onSlideChange={() => tg.HapticFeedback.impactOccurred("medium")}
        spaceBetween={16}
        slidesPerView={4.5}
        className={style.boxCard}
      >
        {dataPeople.map((item) => (
          <SwiperSlide className={style.slide} key={item.id}>
            <Button
              onClick={() => handleInfo(item.id)}
              kind="secondary"
              className={style.boxSlide}
            >
              <img className={style.img} src={item.img} alt={item.name} />
              <p className={style.text}>{item.name}</p>
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
