import Banner from "../../components/Banner/Banner";
import OffersWeek from "../../components/OffersWeek/OffersWeek";
import TopCasino from "../../components/TopCasino/TopCasino";
import style from "./Casino.module.scss";
import PeopleTop from "../../components/PeopleTop/PeopleTop";
import { useSelector } from "react-redux";
import { getCasino } from "../../providers/StoreProvider/selectors/getCasino";
import { useEffect, useState } from "react";
import { InfoTMA } from "../../components/InfoTMA";
import { Bonuses } from "../../components/Bonuses";
import { PeopeOnliCasino } from "../../components/PeopeOnliCasino";
import { BigGame } from "../../components/BigGame/BigGame";

function Casino() {
  const casino = useSelector(getCasino);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`${style.casino} ${isLoaded ? style.fade : ""}`}>
      <Banner />
      <BigGame />
      <PeopleTop />
      <OffersWeek />
      <TopCasino
        title={"🏆 ТОП-10 за всё время"}
        arr={casino ? casino.top_10_casino : []}
      />
      {casino && (
        <PeopeOnliCasino arr={casino.legend_of_casino} />
      )}
      {casino && <Bonuses arr={casino.bonus_for_casino} />}
      <InfoTMA />
    </div>
  );
}

export default Casino;
