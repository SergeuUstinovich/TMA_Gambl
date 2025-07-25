import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/Button";
import ModalRoute from "../../ui/ModalRoute/ModalRoute";
import style from "./Case.module.scss";
import FreeCase from "../../components/FreeCase/FreeCase";
import { useSelector } from "react-redux";
import { getCase } from "../../providers/StoreProvider/selectors/getCase";
import { useEffect, useState } from "react";
import CloseModalSvgBtn from "../../assets/svg/CloseModalSvgBtn/CloseModalSvgBtn";

function Case() {
  const arrCase = useSelector(getCase);
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
      <h2 className={style.title}>🎁 Розыгрыш призов</h2>
      <Button
        kind="secondary"
        onClick={hanldeClose}
        className={style.closeCross}
      >
        <CloseModalSvgBtn className={style.svg} />
      </Button>
      {arrCase && <FreeCase arrCase={arrCase} />}
    </ModalRoute>
  );
}

export default Case;
