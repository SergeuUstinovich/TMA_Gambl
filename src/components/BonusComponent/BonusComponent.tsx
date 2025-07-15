import dailyImg from "../../assets/png/dailyBonus.png";
import caseImg from "../../assets/png/freeCase.png";
import BonusDailySvg from "../../assets/svg/BonusDailySvg/BonusDailySvg";
import style from "./BonusComponent.module.scss";
import { useNavigate } from "react-router-dom";

function BonusComponent() {
  const navigate = useNavigate();

  const hanldeFreeCaseOpen = () => {
    navigate("/case");
  };

  const hanldeWheelFortuneOpen = () => {
    navigate("/wheel");
  };

  const hanldeDailyBonusOpen = () => {
    navigate("/daily");
  };

  return (
    <>
      <div className={style.box}>
        <div
          onClick={hanldeDailyBonusOpen}
          style={{ marginBottom: "7px" }}
          className={style.boxBonus}
        >
          <span className={style.span}>Награды!</span>
          <img className={style.img} src={dailyImg} alt="" />
          <div className={style.daily}>
            <BonusDailySvg className={style.svg} />
            <p className={style.descrDaily}>
              Ежедневный <br /> бонус
            </p>
          </div>
        </div>
        <div className={style.boxBonusTwo}>
          <div
            onClick={hanldeWheelFortuneOpen}
            className={`${style.boxBonusMin} ${style.boxBonus}`}
          >
            <span className={style.span}>Достуно!</span>
            <p className={style.descr}>
              Колесо <br /> фортуны
            </p>
          </div>
          <div
            onClick={hanldeFreeCaseOpen}
            className={`${style.boxBonusMin} ${style.boxBonus}`}
          >
            <span className={style.span}>Подарки!</span>
            <img src={caseImg} alt="" />
            <p className={style.descr}>
              Бесплатные <br /> подарки
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BonusComponent;
