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
import { Bonuses } from "../../components/Bonuses";
import { PeopeOnliCasino } from "../../components/PeopeOnliCasino";

const arr = [
  {
    id: "1",
    logo_url: "/media/1WIN.png",
    name: "1WIN",
    dep: 500,
    free_spin: 300,
    url: "https://igtrack.xyz/click?key=f41cb00c2cec8761b32c",
  },
  {
    id: "2",
    logo_url: "/media/1WIN.png",
    name: "WINWIN",
    dep: null,
    free_spin: 300,
    url: "https://igtrack.xyz/click?key=f41cb00c2cec8761b32c",
  },
  {
    id: "3",
    logo_url: "/media/1WIN.png",
    name: "Melbet",
    dep: 10,
    free_spin: null,
    url: "https://igtrack.xyz/click?key=f41cb00c2cec8761b32c",
  },
];

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
        <Button className={style.btn}>
          Крутить
        </Button>
      </div>
      <OffersWeek />
      <TopCasino
        title={"🏆 ТОП-10 за всё время"}
        arr={casino ? casino.top_10_casino : []}
      />
      <PeopeOnliCasino />
      {/* <Bonuses arr={arr} /> */}
      <InfoTMA />
    </div>
  );
}

export default Casino;
