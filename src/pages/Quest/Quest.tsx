import { useNavigate } from "react-router-dom";
import style from "./Quest.module.scss";
import { Button } from "../../ui/Button";
import imgDaily from "../../assets/png/dailyBonusNav.png";
import imgFree from '../../assets/png/freeSpins.png'
import ArrowSvg from "../../assets/svg/ArrowSvg/ArrowSvg";
import LockSvg from "../../assets/svg/LockSvg/LockSvg";

function Quest() {
  const navigate = useNavigate();

  const hanldeFreeCaseOpen = () => {
    navigate("/case");
  };

  const hanldeDailyBonusOpen = () => {
    navigate("/daily");
  };

  return (
    <div className={style.box}>
      <Button
        onClick={hanldeDailyBonusOpen}
        className={style.boxBonusDaily}
        kind="secondary"
      >
        <img src={imgDaily} className={style.bonusDaily} />
        <span className={style.span}>Уникально</span>
        <p className={style.descr}>Ежедневный <br /> бонус</p>
        <ArrowSvg className={style.svg} />
      </Button>
      <Button
        onClick={hanldeFreeCaseOpen}
        className={style.boxBonusCase}
        kind="secondary"
      >
        <img src={imgFree} className={style.bonusDaily} />
        <span className={style.spanFree}>Доступно</span>
        <p className={style.descr}>Розыгрыш <br /> призов</p>
        <ArrowSvg className={style.svg} />
      </Button>
      <div className={style.questBox}>
        <h3 className={style.title}>⭐ Задания</h3>
        <div className={style.dot}>
          <LockSvg className={style.dotSvg} />
        </div>
      </div>
    </div>
  );
}

export default Quest;
