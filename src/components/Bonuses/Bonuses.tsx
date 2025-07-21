import ArrowSvg from "../../assets/svg/ArrowSvg/ArrowSvg";
import { useTelegram } from "../../providers/telegram/telegram";
import style from "./Bonuses.module.scss";

interface BonusesProps {
  arr: BinusesType[];
}

interface BinusesType {
  id: string;
  logo_url: string;
  name: string;
  dep?: number | null;
  free_spin?: number | null;
  url: string;
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
            onClick={() => swapLink(item.url)}
            key={item.id}
          >
            <img className={style.img} src={`${url}${item.logo_url}`} alt="" />
            <p className={style.text}>{item.name}</p>
            {item.dep && <p className={style.dep}>{item.dep}%</p>}
            {item.free_spin && <p className={style.spin}>{item.free_spin}FS</p>}
            <ArrowSvg className={style.svg} />
          </li>
        ))}
      </ul>
    </div>
  );
}
