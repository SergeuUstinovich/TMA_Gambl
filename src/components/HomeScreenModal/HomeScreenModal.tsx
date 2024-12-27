import AddHomeSvg from "../../assets/svg/AddHomeSvg/AddHomeSvg";
import { Button } from "../../ui/Button";
import Modal from "../../ui/Modal/Modal";
import style from "./HomeScreenModal.module.scss";
import imgPrizeHome from "../../assets/png/prizeHomeScreen.png";

interface IHomeScreenModal {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
}

export const HomeScreenModal = ({
  onClick,
  isOpen,
  onClose,
}: IHomeScreenModal) => {
  return (
    <Modal closeBtn isOpen={isOpen} onClose={onClose} isSpecial lazy>
      <div className={style.boxHome}>
        <h2 className={style.titleHome}>Привет!</h2>
        <p className={style.descrHome}>
          Добавь приложение на «домашний экран» своего смартфона и мы подарим
          тебе фриспины в «Колесо фортуны» !
        </p>
        <img className={style.imgHome} src={imgPrizeHome} alt="" />
        <p className={style.descrHome}>
          В котором разыгрываются <br /> Apple Vision, IPhone 16 и автомобиль!
        </p>
        <Button onClick={onClick} className={style.btnHome}>
          <p className={style.descrHomeBtn}>Добавить приложение</p>
          <AddHomeSvg className={style.svgSetting} />
        </Button>
      </div>
    </Modal>
  );
};
