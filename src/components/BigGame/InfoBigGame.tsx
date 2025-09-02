import { Navigate, useParams } from "react-router-dom";
import { AiChance } from "../AiChance/AiChance";
import { ListAvailable } from "../ListAvailable/ListAvailable";
import { useSelector } from "react-redux";
import { getCasino } from "../../providers/StoreProvider/selectors/getCasino";
import style from "./BigGame.module.scss";

const url = import.meta.env.VITE_API_BASE_URL;

export function InfoBigGame() {
  const { id } = useParams();
  const bigWin = useSelector(getCasino);

  if (!bigWin?.big_win) return <Navigate to={"/"} />;
  const item = bigWin.big_win.find((items) => items.id === Number(id));

  if (!item) return <Navigate to={"/"} />;
  return (
    <div className={style.infoBox}>
      <div className={style.boxTitle}>
        <img
          className={style.imgTitle}
          src={`${url}${item.picture.image_url}`}
          alt="image"
        />
        <h3 className={style.titleName}>{item.name}</h3>
        <div
          style={{ background: `${item.chance.color_text}` }}
          className={style.status}
        />
      </div>
      <AiChance
        text={item.chance.description}
        title={item.chance.text}
        color={item.chance.color_text}
        bgColor={item.chance.color}
      />
      <ListAvailable item={item} />
    </div>
  );
}
