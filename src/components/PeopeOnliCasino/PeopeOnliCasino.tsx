import style from "./PeopeOnliCasino.module.scss";
import "swiper/scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTelegram } from "../../providers/telegram/telegram";
import { Button } from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { LegendCasino } from "../../types/CasinoType";

interface PeopeOnliCasinoProps {
  arr: LegendCasino[]
}

const url = import.meta.env.VITE_API_BASE_URL

export function PeopeOnliCasino({arr}: PeopeOnliCasinoProps) {
  const { tg } = useTelegram();
  const navigate = useNavigate();
  const handleInfo = (id: number) => {
    navigate(`/${id}`);
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
        {arr.map((item) => (
          <SwiperSlide className={style.slide} key={item.id}>
            <Button
              onClick={() => handleInfo(item.id)}
              kind="secondary"
              className={style.boxSlide}
            >
              <img className={style.img} src={`${url}${item.image}`} alt={item.name} />
              <p className={style.text}>{item.name}</p>
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
