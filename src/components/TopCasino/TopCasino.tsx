import StarRatingSvg from "../../assets/svg/StarRatingSvg/StarRatingSvg";
import style from "./TopCasino.module.scss";
import { Button } from "../../ui/Button";
import "swiper/scss";
import { Swiper, SwiperSlide } from "swiper/react";
import img1 from '../../assets/png/bgTop1.webp'
import img2 from '../../assets/png/bgTop2.webp'
import img3 from '../../assets/png/bgTop3.webp'
import img4 from '../../assets/png/bgTop4.webp'
import { CasinoCardType } from "../../types/CasinoType";
import { useTelegram } from "../../providers/telegram/telegram";
import LoaderContent from "../../ui/Loader/LoaderContent/LoaderContent";

interface TopCasinoProps {
  title: string;
  arr: CasinoCardType[];
}

const url = import.meta.env.VITE_API_BASE_URL

function TopCasino({ title, arr }: TopCasinoProps) {
  const { tg } = useTelegram();
  const swapLink = (link: string) => {
    tg.HapticFeedback.impactOccurred("medium")
    tg.openLink(link, { try_instant_view: true });
  };
  return (
    <div className={style.box}>
      <h2 className={style.titleBox}>{title}</h2>
      {arr.length === 0 ? (
        <LoaderContent />
      ) : (
        <Swiper
          onSlideChange={() => tg.HapticFeedback.impactOccurred("medium")}
          spaceBetween={7}
          slidesPerView={2.4}
          className={style.boxCard}
        >
          {arr.map((item, index) => (
            <SwiperSlide className={style.slide} key={index}>
              <div className={style.boxSlide}>
                {index === 0 && (
                  <img className={style.btSvg} src={img1} alt="" />
                )}
                {index === 1 && <img className={style.btSvg} src={img2} alt="" />}
                {index === 2 && (
                  <img className={style.btSvg} src={img3} alt="" />
                )}
                {index !== 0 && index !== 1 && index !== 2 && (
                  <img className={style.btSvg} src={img4} alt="" />
                )}
                <span className={style.numberCard}>{index + 1}</span>
                <div className={style.boxRating}>
                  <StarRatingSvg className={style.ratingSvg} />
                  <p className={style.descrSvg}>{item.rating.toFixed(1)}</p>
                </div>
                <img
                  className={style.imgName}
                  src={`${url}${item.logo_url}`}
                  alt=""
                />
                <div className={style.boxName}>
                  <h3 className={style.title}>{item.name}</h3>
                  {item.descriptions && (
                    <p className={style.descr}>{item.descriptions}</p>
                  )}
                </div>
                <Button
                  onClick={() => swapLink(item.url)}
                  className={style.btn}
                >
                  Играть
                </Button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default TopCasino;
