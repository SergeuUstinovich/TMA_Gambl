import { useSelector } from "react-redux";
import { getCasino } from "../../providers/StoreProvider/selectors/getCasino";
import LoaderContent from "../../ui/Loader/LoaderContent/LoaderContent";
import "swiper/scss";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./BigGame.module.scss";
import { useTelegram } from "../../providers/telegram/telegram";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_API_BASE_URL;

export function BigGame() {
  const { tg } = useTelegram();
  const bigGame = useSelector(getCasino);
  const navigate = useNavigate();

  const swapLink = (id: number) => {
    navigate(`/big-game/${id}`);
  };

  return (
    <div className={style.box}>
      <div className={style.titleBox}>
        <h3 className={style.title}>💥 Высокий шанс победы</h3>
        <span className={style.span}>ИИ анализ</span>
      </div>
      {!bigGame?.big_win ? (
        <LoaderContent />
      ) : (
        <Swiper
          onSlideChange={() => tg.HapticFeedback.impactOccurred("medium")}
          spaceBetween={6}
          slidesPerView={3.5}
          className={style.boxCard}
        >
          {bigGame.big_win.map((item) => (
            <SwiperSlide
              onClick={() => swapLink(item.id)}
              className={style.slide}
              key={item.id}
            >
              <img className={style.img} src={`${url}${item.picture.image_url}`} alt="image" />
              <div style={{background: `${item.chance.color_text}`}} className={style.point} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
