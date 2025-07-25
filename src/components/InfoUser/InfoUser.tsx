import { useSelector } from "react-redux";
import ProfileSvg from "../../assets/svg/ProfileSvg/ProfileSvg";
import { useTelegram } from "../../providers/telegram/telegram";
import style from "./InfoUser.module.scss";
import { getCasino } from "../../providers/StoreProvider/selectors/getCasino";

function InfoUser() {
  const { firstName, userName, photo } = useTelegram();
  const casino = useSelector(getCasino)
  return (
    <>
    <div className={style.box}>
      {photo ? (
        <img className={style.img} src={photo} alt="" />
      ) : (
        <ProfileSvg className={style.img} />
      )}
      <div className={style.boxName}>
        <p className={style.title}>@{userName ? userName : firstName}</p>
      </div>
    </div>
    <div className={style.infoBox}>
      <h3 className={style.infoTitle}>💰 Ваш баланс: </h3>
      <p className={style.infoDescr}>{casino?.user.token_money}</p>
    </div>
    <div className={style.infoBox}>
      <h3 className={style.infoTitle}>🕒 Активных сессий: </h3>
      <p className={style.infoDescr}>{casino?.user.count_of_session}</p>
    </div>
    </>
    
  );
}

export default InfoUser;
