import style from "./LoaderPage.module.scss";
import { classNames } from "../../../utils/classNames";
import LoaderContentSvg from "../../../assets/svg/LoaderContentSvg/LoaderContentSvg";


interface LoaderPageProps {
  className?: string;
}

export const LoaderPage = ({ className = "" }: LoaderPageProps) => {
  

  return (
    <div className={classNames(style.boxLoader, {}, [className])}>
      {/* <LoaderContentSvg className={style.svg} /> */}
      {/* <p className={style.descr}>Загрузка...</p> */}
      <span className={style.loader}></span>
    </div>
  );
};
