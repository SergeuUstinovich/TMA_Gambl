import { useState } from "react";
import Modal from "../../ui/Modal/Modal";
import { Button } from "../../ui/Button";
import ArrowSvg from "../../assets/svg/ArrowSvg/ArrowSvg";
import style from "./Setting.module.scss";
import { dataSetting, dataSettingType } from "./dataSetting";
import LockSvg from "../../assets/svg/LockSvg/LockSvg";

function Setting() {
  const [isOpen, setIsOpen] = useState(false);
  const [contentModal, setContentModal] = useState<dataSettingType>();

  const handleOpen = (item: dataSettingType) => {
    setContentModal(item);
    setIsOpen(true);
  };

  const handleClose = () => {
    setContentModal(undefined);
    setIsOpen(false);
  };

  return (
    <>
      <div className={style.box}>
        <div className={style.boxSetting}>
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
          </div>
        )}
      </Modal>
    </>
  );
}

export default Setting;
