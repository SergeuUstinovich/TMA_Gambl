import ArrowSvg from "../../assets/svg/ArrowSvg/ArrowSvg";
import { useTelegram } from "../../providers/telegram/telegram";
import { BonusType } from "../../types/CasinoType";
import style from "./Bonuses.module.scss";

interface BonusesProps {
  arr: BonusType[];
}

const url = import.meta.env.VITE_API_BASE_URL;

export function Bonuses({ arr }: BonusesProps) {
  const { tg } = useTelegram();
  
  const swapLink = (link: string) => {
    tg.HapticFeedback.impactOccurred("medium");
    tg.openLink(link, { try_instant_view: true });
  };

  return (
    <div className={style.box}>
      <h2 className={style.title}>⭐ Бонусы</h2>
      <ul className={style.list}>
        {arr.map((item) => (
          <li
            className={style.item}
            onClick={() => swapLink(item.casino.url)}
            key={item.id}
          >
            <img className={style.img} src={`${url}${item.casino.logo_url}`} alt="" />
            <p className={style.text}>{item.casino.name}</p>
            {item.casino.dep && <p className={style.dep}>{item.casino.dep}%</p>}
            {item.casino.free_spin && <p className={style.spin}>{item.casino.free_spin}FS</p>}
            <ArrowSvg className={style.svg} />
          </li>
        ))}
      </ul>
    </div>
  );
}
