import { useState } from "react";
import Modal from "../../ui/Modal/Modal";
import { Button } from "../../ui/Button";
import ArrowSvg from "../../assets/svg/ArrowSvg/ArrowSvg";
import style from "./Setting.module.scss";
import { dataSetting, dataSettingType } from "./dataSetting";
import imgRef from "../../assets/png/referalBg.png";
import imgAi from '../../assets/png/aiFunction.png'
import { useTelegram } from "../../providers/telegram/telegram";
import { ToggleSwitcher } from "../../components/ToggleSwitcher";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { settingMessenge } from "../../api/setting";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getCasino } from "../../providers/StoreProvider/selectors/getCasino";
import { casinoActions } from "../../providers/StoreProvider/slice/casinoSlice";
import { useNavigate } from "react-router-dom";

function Setting() {
  const [isOpen, setIsOpen] = useState(false);
  const [contentModal, setContentModal] = useState<dataSettingType>();
  const userCasino = useSelector(getCasino);
  const navigate = useNavigate()
  const [isMesseg, setIsMesseg] = useState(() => {
    const status = localStorage.getItem("messeng");
    return status ? JSON.parse(status) : userCasino?.user.push_trigger;
  });
  const dispanch = useDispatch()
  
  const { tg } = useTelegram();

  //временный тогл
  const handleToogle = () => {
    mutateMessenge.mutate();
  };

  const mutateMessenge = useMutation(
    {
      mutationFn: () => settingMessenge(),
      onSuccess: (data) => {
        localStorage.setItem("messeng", JSON.stringify(data));
        dispanch(casinoActions.updatePushTrigger(data))
        setIsMesseg(data)
      },
      onError: (err) => {
        toast.error(err.message);
      },
    },
    queryClient
  );

  const handleOpen = (item: dataSettingType) => {
    setContentModal(item);
    setIsOpen(true);
  };

  const handleClose = () => {
    setContentModal(undefined);
    setIsOpen(false);
  };

  const hanldeRef = () => {
    const link =
      `https://t.me/share/url?url=https://t.me/dephubot&text=Один клик — и ты в игре.%0AПереходи и забирай своё!`;
    tg.openTelegramLink(link);
  };

  const handleAi = () => {
    navigate('/ai-function')
  }

  const handleBotLink = () => {
    tg.openTelegramLink('https://t.me/dephubsupportbot');
  }

  return (
    <>
      <div className={style.box}>
        <div className={style.boxSetting}>
          <Button
            onClick={handleAi}
            className={style.boxAi}
            kind="secondary"
          >
            <img src={imgAi} className={style.bonusAi} />
            <span className={style.spanAi}>Бета</span>
            <p className={style.descr}>
              ИИ <br />
              функции
            </p>
            <ArrowSvg className={style.svg} />
          </Button>
          <Button
            onClick={hanldeRef}
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
                  onClick={item.isModal ? () => handleOpen(item) : handleToogle}
                >
                  <div className={style.infoBox}>
                    <h2 className={style.titleInfo}>{item.title}</h2>
                    <p className={style.descrInfo}>{item.descr}</p>
                  </div>
                  {item.isModal ? (
                    <ArrowSvg />
                  ) : (
                    <ToggleSwitcher
                      isLoad={mutateMessenge.isPending}
                      isStatus={isMesseg}
                      // handleToogle={handleToogle}
                    />
                  )}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Modal lazy onClose={handleClose} isSpecial isOpen={isOpen}>
        {contentModal && (
          <div className={style.modalBox}>
            <h3 className={style.modalTitle}>{contentModal.title}</h3>
            <p className={style.modalText}>{contentModal.text}</p>
            {contentModal.id === 3 ? (
              <Button kind="secondary" onClick={handleBotLink} className={style.modalText}>{contentModal.text2}</Button>
            ) : (
              <p className={style.modalText}>{contentModal.text2}</p>
            )}
            <p className={style.modalText}>{contentModal.text3}</p>
          </div>
        )}
      </Modal>
    </>
  );
}

export default Setting;
