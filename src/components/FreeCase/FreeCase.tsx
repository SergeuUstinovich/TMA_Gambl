import { FreeCaseType } from "../../types/FreeCase";
import RuleteLine from "../RuleteLine/RuleteLine";
import style from "./FreeCase.module.scss";

interface FreeCaseProps {
  arrCase: FreeCaseType[];
}

const url = import.meta.env.VITE_API_BASE_URL

function FreeCase({ arrCase }: FreeCaseProps) {
  return (
    <div className={style.box}>
      <div className={style.boxRoulet}>
        <RuleteLine arrPrize={arrCase} />
      </div>
      <div className={style.boxList}>
        <h3 className={style.titleList}>Список призов:</h3>
        {arrCase ? (
          <ul className={style.list}>
            {arrCase.map((item) => (
              <li key={item.id} className={style.item}>
                <img
                  className={style.img}
                  src={`${url}${item.image}`}
                  alt=""
                />
                <p className={style.descr}>{item.text}</p>
                <p className={style.descrInfo}>{item.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div>Loader...</div>
        )}
      </div>
    </div>
  );
}

export default FreeCase;
