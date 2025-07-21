import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/Button";
import ModalRoute from "../../ui/ModalRoute/ModalRoute";
import style from "./Daily.module.scss";
import DailyBonus from "../../components/DailyBonus/DailyBonus";
import { useEffect, useState } from "react";
import CloseModalSvgBtn from "../../assets/svg/CloseModalSvgBtn/CloseModalSvgBtn";

function Daily() {
  const navigate = useNavigate();
  const hanldeClose = () => {
    navigate('/');
  };
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <ModalRoute
      classNameContent={`${style.contentBg} ${isLoaded ? style.fade : ""}`}
    >
      <Button
        kind="secondary"
        onClick={hanldeClose}
        className={style.closeCross}
      >
        <CloseModalSvgBtn className={style.svg} />
      </Button>
      <DailyBonus />
    </ModalRoute>
  );
}

export default Daily;
