import { Button } from "../../ui/Button";
import style from "./Banner.module.scss";
import { useTelegram } from "../../providers/telegram/telegram";
import "swiper/scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import LoaderContent from "../../ui/Loader/LoaderContent/LoaderContent";
import { useSelector } from "react-redux";
import { getCasino } from "../../providers/StoreProvider/selectors/getCasino";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_API_BASE_URL;

function Banner() {
  const { tg } = useTelegram();
  const banner = useSelector(getCasino);
  const navigate = useNavigate();

  const swapLink = (id: number, isLink: boolean, link: string | null) => {
    if (isLink && link) {
      tg.openLink(link, { try_instant_view: true });
    } else {
      navigate(`/banner/${id}`);
    }
  };

  return (
    <div className={style.box}>
      {!banner?.banners ? (
        <LoaderContent />
      ) : (
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          onSlideChange={() => tg.HapticFeedback.impactOccurred("medium")}
          spaceBetween={10}
          slidesPerView={1.1}
          className={style.boxCard}
        >
          {banner.banners.map((item) => (
            <SwiperSlide
              onClick={() =>
                swapLink(item.id, item.only_link, item.link_for_button)
              }
              className={style.slide}
              key={item.id}
            >
              <img className={style.img} src={`${url}${item.image}`} alt="" />
              <div className={style.boxBanner}>
                <h1 className={style.title}>{item.name}</h1>
                <p className={style.descr}>{item.description}</p>
                <div className={style.boxBtn}>
                  <Button className={style.btn}>{item.button_text}</Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default Banner;
