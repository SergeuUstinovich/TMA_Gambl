import style from "./InfoTMA.module.scss";
import img1 from '../../assets/png/infoImgStop.png'
import img2 from '../../assets/png/infoImg18.png'

export function InfoTMA() {
  return (
    <div className={style.box}>
      <ul className={style.list}>
        <li className={style.item}>
          DepHub не является онлайн-казино, букмекерской конторой или
          организатором азартных игр.
        </li>
        <li className={style.item}>
          DepHub лишь агрегирует и отображает актуальные предложения от
          сторонних сервисов.{" "}
        </li>
        <li className={style.item}>
          DepHub не несет ответственности за действия пользователей на сторонних
          сайтах.{" "}
        </li>
        <li className={style.item}>
          Используя это приложение, вы подтверждаете, что вам исполнилось 18 лет
          и вы ознакомились с настоящими условиями.
        </li>
        <li className={style.item}>
          {" "}
          DepHub оставляет за собой право изменять правила в любое время без
          предварительного уведомления.
        </li>
      </ul>
      <div className={style.infoBox}>
        <div className={style.imgBox}>
            <img className={style.imgInfo} src={img1} alt="" />
            <img className={style.imgInfo} src={img2} alt="" />
        </div>
        <p className={style.descr}>© 2025 DEPHUB. All rights reserved</p>
      </div>
    </div>
  );
}
