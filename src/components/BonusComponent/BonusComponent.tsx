import dailyImg from "../../assets/png/dailyBonus.png";
import wheelImg from "../../assets/png/wheelBonus.png";
import caseImg from "../../assets/png/freeCase.png";
import BonusDailySvg from "../../assets/svg/BonusDailySvg/BonusDailySvg";
import style from "./BonusComponent.module.scss";
import Modal from "../../ui/Modal/Modal";
import { useState } from "react";
import FreeCase from "../FreeCase/FreeCase";
import { useSelector } from "react-redux";
import { getCase } from "../../providers/StoreProvider/selectors/getCase";

function BonusComponent() {
  const arrCase = useSelector(getCase);
  const [freeCases, setFreeCase] = useState(false);

  const hanldeFreeCaseOpen = () => {
    setFreeCase(true);
  };
  const hanldeFreeCaseClose = () => {
    setFreeCase(false);
  };

  return (
    <>
      <div className={style.box}>
        <div style={{ marginBottom: "7px" }} className={style.boxBonus}>
          <span className={style.span}>Reward!</span>
          <img className={style.img} src={dailyImg} alt="" />
          <div className={style.daily}>
            <BonusDailySvg className={style.svg} />
            <p className={style.descrDaily}>
              Daily <br /> bonus
            </p>
          </div>
        </div>
        <div className={style.boxBonusTwo}>
          <div className={style.boxBonus}>
            <span className={style.span}>Available</span>
            <img src={wheelImg} alt="" />
            <p className={style.descr}>
              Wheel <br /> of Fortune
            </p>
          </div>
          <div onClick={hanldeFreeCaseOpen} className={style.boxBonus}>
            <span className={style.span}>Gift!</span>
            <img src={caseImg} alt="" />
            <p className={style.descr}>
              Free <br /> case
            </p>
          </div>
        </div>
      </div>
      <Modal isOpen={freeCases} onClose={hanldeFreeCaseClose} lazy hiddenClose>
        {arrCase && (
          <FreeCase onCloseModal={hanldeFreeCaseClose} arrCase={arrCase} />
        )}
      </Modal>
    </>
  );
}

export default BonusComponent;
