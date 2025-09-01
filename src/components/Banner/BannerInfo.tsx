import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { getCasino } from "../../providers/StoreProvider/selectors/getCasino";
import style from ".//BannerInfo.module.scss";
import { AiChance } from "../AiChance/AiChance";
import { ListAvailable } from "../ListAvailable/ListAvailable";

const url = import.meta.env.VITE_API_BASE_URL;

export function BannerInfo() {
  const { id } = useParams();
  const banner = useSelector(getCasino);

  if (!banner?.banners) return <Navigate to={"/"} />;
  const item = banner.banners.find((items) => items.id === Number(id));

  if (!item) return <Navigate to={"/"} />;

  return (
    <div className={style.box}>
      <div className={style.boxImg}>
        <div className={style.positionBlock}>
          <img
            className={style.img}
            src={`${url}${item.picture_x2.image_url}`}
            alt="image"
          />
          <div className={style.boxInfo}>
            <h3 className={style.title}>{item.name}</h3>
            <span className={style.text}>{item.description}</span>
          </div>
        </div>
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
