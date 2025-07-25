import { useState } from "react";
import Modal from "../../ui/Modal/Modal";
import { Button } from "../../ui/Button";
import ArrowSvg from "../../assets/svg/ArrowSvg/ArrowSvg";
import style from "./Setting.module.scss";
import { dataSetting, dataSettingType } from "./dataSetting";
import LockSvg from "../../assets/svg/LockSvg/LockSvg";
import imgRef from "../../assets/png/referalBg.png";
import { useTelegram } from "../../providers/telegram/telegram";

function Setting() {
  const [isOpen, setIsOpen] = useState(false);
  const [contentModal, setContentModal] = useState<dataSettingType>();
  const { tg } = useTelegram();

  const handleOpen = (item: dataSettingType) => {
    setContentModal(item);
    setIsOpen(true);
  };

  const handleClose = () => {
    setContentModal(undefined);
    setIsOpen(false);
  };

  const hanldeFreeCaseOpen = () => {
    tg.share({
      title: "Посмотри этот крутой бот!",
      text: "Привет! Я нашел интересного бота:",
      url: "https://t.me/Zerkala_games_bot",
    });
  };

  return (
    <>
      <div className={style.box}>
        <div className={style.boxSetting}>
          <Button
            onClick={hanldeFreeCaseOpen}
            className={style.boxReferall}
            kind="secondary"
          >
            <img src={imgRef} className={style.bonusReferal} />
            <span className={style.spanRef}>Уникально</span>
            <p className={style.descr}>
              Поделиться <br />
              приложением
            </p>
            <ArrowSvg className={style.svg} />
          </Button>
          <h3 className={style.title}>⚙️ Настройки</h3>
          <ul className={style.list}>
            {dataSetting.map((item) => (
              <li key={item.id} className={style.item}>
                <Button
                  kind="secondary"
                  className={style.btn}
                  onClick={item.isModal ? () => handleOpen(item) : () => {}}
                >
                  <div className={style.infoBox}>
                    <h2 className={style.titleInfo}>{item.title}</h2>
                    <p className={style.descrInfo}>{item.descr}</p>
                  </div>
                  {item.isModal ? <ArrowSvg /> : <LockSvg />}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Modal onClose={handleClose} isSpecial isOpen={isOpen}>
        {contentModal && (
          <div className={style.modalBox}>
            <h3 className={style.modalTitle}>{contentModal.title}</h3>
            <p className={style.modalText}>{contentModal.text}</p>
            <p className={style.modalText}>{contentModal.text2}</p>
            <p className={style.modalText}>{contentModal.text3}</p>
          </div>
        )}
      </Modal>
    </>
  );
}

export default Setting;
