import { Navigate, useParams } from "react-router-dom";
import { dataPeople } from "./dataPeople";
import { Bonuses } from "../Bonuses";
import style from './PeopeOnliCasino.module.scss'

const arr = [
  {
    id: "1",
    logo_url: "/media/1WIN.png",
    name: "1WIN",
    dep: 500,
    free_spin: 300,
    url: "https://igtrack.xyz/click?key=f41cb00c2cec8761b32c",
  },
  {
    id: "2",
    logo_url: "/media/1WIN.png",
    name: "WINWIN",
    dep: null,
    free_spin: 300,
    url: "https://igtrack.xyz/click?key=f41cb00c2cec8761b32c",
  },
  {
    id: "3",
    logo_url: "/media/1WIN.png",
    name: "Melbet",
    dep: 10,
    free_spin: null,
    url: "https://igtrack.xyz/click?key=f41cb00c2cec8761b32c",
  },
];

export function InfoPeople() {
  const { id } = useParams();
  const infoPeople = dataPeople.find((item) => item.id === id);

  if (!infoPeople) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className={style.boxInfo}>
      <div className={style.info}>
        <img className={style.imgInfo} src={infoPeople.img} alt="" />
        <p className={style.textInfo}>{infoPeople.name}</p>
      </div>
      <Bonuses arr={arr} />
    </div>
  );
}
