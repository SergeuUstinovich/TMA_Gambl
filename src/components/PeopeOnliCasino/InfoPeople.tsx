import { Navigate, useParams } from "react-router-dom";
import { Bonuses } from "../Bonuses";
import style from './PeopeOnliCasino.module.scss'
import { useSelector } from "react-redux";
import { getCasino } from "../../providers/StoreProvider/selectors/getCasino";

const url = import.meta.env.VITE_API_BASE_URL

export function InfoPeople() {
  const { id } = useParams();
  const casino = useSelector(getCasino);
  const infoPeople = casino?.legend_of_casino.find((item) => item.id === Number(id));

  if (!infoPeople) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className={style.boxInfo}>
      <div className={style.info}>
        <img className={style.imgInfo} src={`${url}${infoPeople.image}`} alt="" />
        <p className={style.textInfo}>{infoPeople.name}</p>
      </div>
      <Bonuses arr={infoPeople.bonus_for_casino} />
    </div>
  );
}
