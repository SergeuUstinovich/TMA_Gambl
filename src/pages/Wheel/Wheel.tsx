import ModalRoute from "../../ui/ModalRoute/ModalRoute";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/Button";
import style from "./Wheel.module.scss";
import { useEffect, useState } from "react";
import CloseModalSvgBtn from "../../assets/svg/CloseModalSvgBtn/CloseModalSvgBtn";
import { useSelector } from "react-redux";
import { getWheel } from "../../providers/StoreProvider/selectors/getWheel";
import WheelFortune from "../../components/WheelFortune/WheelFortune";

function Wheel() {
  const arrWheel = useSelector(getWheel);
  const navigate = useNavigate();
  const hanldeClose = () => {
    navigate("/");
  };
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <ModalRoute
      classNameContent={`${style.contentBg} ${isLoaded ? style.fade : ""}`}
    >
      <h2 className={style.title}>☘️ Колесо фортуны</h2>
      <Button
        kind="secondary"
        onClick={hanldeClose}
        className={style.closeCross}
      >
        <CloseModalSvgBtn className={style.svg} />
      </Button>
      {arrWheel && <WheelFortune arrWheel={arrWheel} />}
    </ModalRoute>
  );
}

export default Wheel;
