import { Link, useLocation } from "react-router-dom";
import style from "./FooterNav.module.scss";
import { useTelegram } from "../../providers/telegram/telegram";
import { HomeSvg } from "../../assets/svg/HomeSvg";
import { QuestSvg } from "../../assets/svg/QuestSvg";
import SettingSvg from "../../assets/svg/SettingSvg/SettingSvg";

const nav = [
  {
    id: "1",
    title: "Главная",
    path: "/",
    img: <HomeSvg className={style.svg} />,
  },
  {
    id: "2",
    title: "Задания",
    path: "/quest",
    img: <QuestSvg className={style.svg} classNameHelper={style.helper} />,
  },
  {
    id: "3",
    title: "Настройки",
    path: "/setting",
    img: <SettingSvg className={style.svgSetting} />,
  },
];

function FooterNav() {
  const location = useLocation();
  const { tg } = useTelegram();
  const homePaths = ["/", "/betting", "/poker"];

  return (
    <div className={style.box}>
      <ul className={style.list}>
        {nav.map((item) => {
          const isHome = item.path === "/";
          const isActive = isHome
            ? homePaths.includes(location.pathname)
            : location.pathname === item.path;
          return (
            <Link
              to={item.path}
              key={item.id}
              className={`${style.link} ${isActive && style.active}`}
            >
              <li
                onClick={() => tg.HapticFeedback.impactOccurred("medium")}
                className={style.item}
              >
                <div className={style.img}>{item.img}</div>
                <p className={style.descr}>{item.title}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default FooterNav;
