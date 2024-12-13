import { useEffect, useMemo, useState } from "react";
import { FreeCaseType } from "../../types/FreeCase";
import { getRandomPrize } from "../../helpers/getRandomPrize";
import RoulettePro from "react-roulette-pro";
import "react-roulette-pro/dist/index.css";
import style from "./RuleteLine.module.scss";
import "./RuleteLine.scss";
import CustomDesignPlugin from "./CustomDesignPlugin";
import { generateId, reproductionArray } from "../../helpers/ruleteHelpers";
import { Button } from "../../ui/Button";
import Modal from "../../ui/Modal/Modal";
import WinnerPrize from "./WinnerPrize";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { addFreeCase } from "../../api/RouletBonus";
import { useTelegram } from "../../providers/telegram/telegram";

interface RuleteLineProps {
  arrPrize: FreeCaseType[];
  onCloseModal: () => void;
}

function RuleteLine({ arrPrize, onCloseModal }: RuleteLineProps) {
  const {tg_id} = useTelegram()
  const [start, setStart] = useState(false);
  const [winningPrize, setWinningPrize] = useState<FreeCaseType>();
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [disBtn, setDisBtn] = useState(false);
  const [spinsValue, setSpinsValue] = useState(5);
  const [modalPrize, setModalPrize] = useState(false);

  const reproducedPrizeList = useMemo(
    () => [
      ...arrPrize,
      ...reproductionArray(arrPrize, arrPrize.length * 3),
      ...arrPrize,
      ...reproductionArray(arrPrize, arrPrize.length),
    ],
    []
  );

  const prizeList = useMemo(
    () =>
      reproducedPrizeList.map((prize) => ({
        ...prize,
        id:
          typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : generateId(),
        image: `https://api.zerkalogm.online${prize.image}`,
      })),
    []
  );

  const handleStart = () => {
    if (spinsValue !== 0) {
      const selectedPrize = getRandomPrize(arrPrize);
      const selectedIndex = arrPrize.findIndex(
        (prize) => prize.id === selectedPrize.id
      );
      const prizeIndex = arrPrize.length * 4 + selectedIndex;
      setPrizeIndex(prizeIndex);
      setDisBtn(true);
      setStart(false);
      setSpinsValue((prev) => prev - 1);
      setTimeout(() => {
        setWinningPrize(undefined);
        setStart(true);
      }, 10);
    }
  };

  const clearPrize = () => {
    setWinningPrize(undefined);
  }

  const handlePrizeDefined = () => {
    const winningPrizeIndex = prizeIndex % arrPrize.length;
    setDisBtn(false);
    setWinningPrize(arrPrize[winningPrizeIndex]);
  };

  const prizeMutate = useMutation(
    {
      mutationFn: (data: { tg_id: string; id: number }) =>
        addFreeCase(data.tg_id, data.id),
      onSuccess: () => {
        setModalPrize(true);
      }
    },
    queryClient
  );

  useEffect(() => {
    if (winningPrize) {
      prizeMutate.mutate({tg_id, id: winningPrize.id})
    }
  }, [winningPrize]);

  const handleCloseModal = () => {
    setModalPrize(false);
  };

  useEffect(() => {
    if(!modalPrize) {
      setWinningPrize(undefined);
    }
  }, [modalPrize])

  return (
    <>
      <RoulettePro
        prizes={prizeList}
        prizeIndex={prizeIndex}
        start={start}
        onPrizeDefined={handlePrizeDefined}
        spinningTime={7}
        defaultDesignOptions={{
          hideCenterDelimiter: false, //центральная полоска
          prizesWithText: true, //отображение текста
        }}
        options={{
          stopInCenter: true, //останавливает в центре картинки
          withoutAnimation: true, //останавливает в анимацию
        }}
        designPlugin={CustomDesignPlugin}
      />
      <div className={style.boxValueSpins}>
        <Button
          isDisabled={disBtn || spinsValue === 0}
          className={style.btn}
          onClick={handleStart}
        >
          Open for free
        </Button>
        <p className={style.descr}>Spins left: {spinsValue}</p>
      </div>
      <Modal
        closeBtn
        isOpen={modalPrize}
        onClose={handleCloseModal}
        isSpecial
        lazy
      >
        {winningPrize && (
          <WinnerPrize
            prize={winningPrize}
            onCloseModal={onCloseModal}
            onClose={handleCloseModal}
            clearPrize={clearPrize}
          />
        )}
      </Modal>
    </>
  );
}

export default RuleteLine;
