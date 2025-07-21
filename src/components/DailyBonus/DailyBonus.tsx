import style from "./DailyBonus.module.scss";
import { data } from "./data";
import ComplitedDaySvg from "../../assets/svg/ComplitedDaySvg/ComplitedDaySvg";
import { useEffect, useState } from "react";
import { Button } from "../../ui/Button";
import { useSelector } from "react-redux";
import {
  getDay,
  getTakeDay,
} from "../../providers/StoreProvider/selectors/getDaily";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { addDailyBonus } from "../../api/RouletBonus";
import { useTelegram } from "../../providers/telegram/telegram";
import "swiper/scss";
import { Swiper, SwiperSlide } from "swiper/react";

function DailyBonus() {
  const { tg } = useTelegram();
  const dayBonus = useSelector(getDay);
  const btnActive = useSelector(getTakeDay);
  const [isActive, setIsActive] = useState(false);
  const [currentDay, setCurrentDay] = useState<number>(0);
  const day = data.find((item) => item.day === currentDay);
  const [dayInfo, setDaiInfo] = useState(day);

  useEffect(() => {
    if (btnActive !== undefined && btnActive !== null) {
      setIsActive(btnActive.can_get_daly_bonus);
    }
  }, [btnActive]);

  useEffect(() => {
    if (dayBonus) {
      setCurrentDay(dayBonus.day);
    }
  }, [dayBonus]);

  useEffect(() => {
    if (day) {
      setDaiInfo(day);
    }
  }, [day]);

  const handleDay = (id: string) => {
    const day = data.find((item) => item.id === id);
    setDaiInfo(day);
  };

  const mutateDailyBonus = useMutation(
    {
      mutationFn: () => addDailyBonus(),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["dailyBonus"] });
        queryClient.invalidateQueries({ queryKey: ["freeCase"] });
      },
      onError: () => {},
    },
    queryClient
  );

  const handleBonus = () => {
    mutateDailyBonus.mutate();
  };

  return (
    <div className={style.box}>
      <h2 className={style.title}>🗓️ Ежедневный бонус</h2>
      <Swiper
        onSlideChange={() => tg.HapticFeedback.impactOccurred("medium")}
        spaceBetween={7}
        slidesPerView={3.2}
        className={style.list}
      >
        {data.map((item) => (
          <SwiperSlide
            onClick={() => handleDay(item.id)}
            className={style.item}
            key={item.id}
          >
            <div
              className={style.boxInfo}
              style={
                currentDay > item.day
                  ? { border: "1px solid #34c759" }
                  : currentDay === item.day
                  ? { border: "1px solid #0080ff" }
                  : {}
              }
            >
              {currentDay <= item.day ? (
                <span className={style.countInfo}>x{item.count}</span>
              ) : (
                <ComplitedDaySvg className={style.svg} />
              )}

              <h2 className={style.titleInfo}>{item.day}</h2>
              <p className={style.descrInfo}>День</p>

              <div className={style.boxImg}></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {dayInfo && (
        <Button
          kind="secondary"
          onClick={handleBonus}
          className={style.btn}
          isLoading={mutateDailyBonus.isPending}
          isDisabled={currentDay !== dayInfo.day || !isActive}
        >
          Забрать награду
        </Button>
      )}
    </div>
  );
}

export default DailyBonus;
