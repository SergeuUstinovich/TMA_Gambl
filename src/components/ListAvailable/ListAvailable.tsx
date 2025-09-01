import { useTelegram } from "../../providers/telegram/telegram";
import { BannerType } from "../../types/CasinoType";
import { Button } from "../../ui/Button";
import style from "./ListAvailable.module.scss";

interface ListAvailableProps {
  item: BannerType;
}

const url = import.meta.env.VITE_API_BASE_URL;

export function ListAvailable({ item }: ListAvailableProps) {
  const { tg } = useTelegram();
  const swapLink = (link: string) => {
    tg.openLink(link, { try_instant_view: true });
  };
  return (
    <ul className={style.list}>
      <h3 className={style.title}>🎰 Доступно</h3>
      {item.casino.map((items) => (
        <li
          onClick={() => swapLink(items.link)}
          className={style.item}
          key={items.id}
        >
          <div className={style.boxInfo}>
            <img
              className={style.img}
              src={`${url}${items.casino.logo_url}`}
              alt=""
            />
            <p className={style.text}>{items.casino.name}</p>
          </div>
          <Button className={style.btn}>Играть</Button>
        </li>
      ))}
    </ul>
  );
}
