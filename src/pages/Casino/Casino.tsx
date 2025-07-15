import Banner from "../../components/Banner/Banner";
import OffersWeek from "../../components/OffersWeek/OffersWeek";
import TopCasino from "../../components/TopCasino/TopCasino";
import style from "./Casino.module.scss";
import PeopleTop from "../../components/PeopleTop/PeopleTop";
import { useSelector } from "react-redux";
import { getCasino } from "../../providers/StoreProvider/selectors/getCasino";
import { useEffect, useState } from "react";
import { InfoTMA } from "../../components/InfoTMA";
import { Button } from "../../ui/Button";
import { useNavigate } from "react-router-dom";

function Casino() {
  const casino = useSelector(getCasino);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const hanldeWheelFortuneOpen = () => {
    navigate("/wheel");
  };
  return (
    <div className={`${style.casino} ${isLoaded ? style.fade : ""}`}>
      <Banner />
      <PeopleTop />
      <div onClick={hanldeWheelFortuneOpen} className={style.box}>
        <div className={style.info}>
          <h3 className={style.title}>☘️ Колесо фортуны</h3>
          <p className={style.text}>Прокрути и выиграй</p>
        </div>
        <Button className={style.btn} kind="secondary">
          Крутить
        </Button>
      </div>
      <OffersWeek />
      <TopCasino
        title={"🏆 ТОП-10 за всё время"}
        arr={casino ? casino.top_10_casino : []}
      />
      <InfoTMA />
    </div>
  );
}

export default Casino;
