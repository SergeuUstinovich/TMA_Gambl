import { useState } from "react";
import { ToggleSwitcher } from "../../components/ToggleSwitcher";
import { Button } from "../../ui/Button";
import style from "./AiFunction.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCasino } from "../../providers/StoreProvider/selectors/getCasino";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { aiFunction } from "../../api/setting";
import toast from "react-hot-toast";
import { casinoActions } from "../../providers/StoreProvider/slice/casinoSlice";
import img from "../../assets/png/infoSvg.png";
import Modal from "../../ui/Modal/Modal";

function AiFunction() {
  const userCasino = useSelector(getCasino);
  const dispanch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isAi, setIsAi] = useState(() => {
    const status = localStorage.getItem("aifunction");
    return status ? JSON.parse(status) : userCasino?.user.ai_push_trigger;
  });

  const mutateAIFunc = useMutation(
    {
      mutationFn: () => aiFunction(),
      onSuccess: (data) => {
        localStorage.setItem("aifunction", JSON.stringify(data));
        dispanch(casinoActions.updateAiPushTrigger(data));
        setIsAi(data);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    },
    queryClient
  );

  const handleToogle = () => {
    mutateAIFunc.mutate();
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={style.box}>
        <Button kind="secondary" className={style.btn} onClick={handleToogle}>
          <div className={style.infoBox}>
            <h3 className={style.title}>ИИ аналитика</h3>
            <p className={style.descr}>
              Использовать функции <br /> исскуственного интелекта
            </p>
          </div>

          <ToggleSwitcher isLoad={mutateAIFunc.isPending} isStatus={isAi} />
        </Button>
        <Button onClick={handleOpen} kind="secondary" className={style.boxBeta}>
          <div className={style.betaInfo}>
            <h3 className={style.titleBeta}>⚠️ Бета функции</h3>
            <p className={style.descrBeta}>
              Предсказания могут быть неточными. <br />
              Мы постоянно улучшаем этот функционал.
            </p>
          </div>
          <img src={img} alt="" />
        </Button>
      </div>
      <Modal hiddenClose lazy onClose={handleClose} isSpecial isOpen={isOpen}>
        <div className={style.boxModal}>
          <h3 className={style.titleModal}>Эксперементальная функция с Искусственным интеллеком</h3>
          <p className={style.descrModal}>
            ИИ-аналитика — это умный алгоритм, который отслеживает, как вы
            используете приложение, и помогает показывать только те предложения,
            которые действительно вам интересны.
          </p>
          <p className={style.descrModal}>
            В будущем ИИ будет предлагать персональные офферы с повышенным
            шансом выигрыша — подобранные именно под ваш стиль игры.
          </p>
          <p style={{marginBottom: 0, fontWeight: 600}} className={style.descrModal}>
            Мы не передаём данные третьим лицам. Все процессы работают внутри
            приложения. Вы можете отключить аналитику в любое время.
          </p>
        </div>
      </Modal>
    </>
  );
}

export default AiFunction;
