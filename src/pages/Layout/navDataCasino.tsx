import BettingSvg from "../../assets/svg/BettingSvg/BettingSvg";
import CasionoSvg from "../../assets/svg/CasionoSvg/CasionoSvg";
import PokerSvg from "../../assets/svg/PokerSvg/PokerSvg";
import style from "../../components/TabSwitcher/TabSwitcher.module.scss";

export const tabs = [
  {
    id: "1",
    label: "Казино",
    path: "/",
    img: <CasionoSvg classNameHelper={style.hepler} className={style.casinoSvg} />,
  },
  {
    id: "2",
    label: "Ставки",
    path: "/betting",
    img: <BettingSvg classNameHelper={style.hepler} className={style.svg} />,
  },
  {
    id: "3",
    label: "Покер",
    path: "/poker",
    img: <PokerSvg classNameHelper={style.hepler} className={style.svg} />,
  },
];
