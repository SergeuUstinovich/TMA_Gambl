import { Switch } from "@headlessui/react";
import style from "./ToggleSwitcher.module.scss";
import { CircleSvg } from "../../assets/svg/CircleSvg";
import { ToogleActiveSvg } from "../../assets/svg/ToogleActiveSvg";
import { LoaderButton } from "../../ui/Loader/LoaderButton";

interface ToggleSwitcherProps {
    isLoad: boolean;
    isStatus: boolean;
    handleToogle?: () => void
}

export function ToggleSwitcher({isStatus, handleToogle, isLoad}: ToggleSwitcherProps) {
  
  return (
    <Switch
      as={"div"}
      checked={isStatus}
      onChange={handleToogle}
      //   onClick={toggleTheme}
      className={style.group}
    >
      {isStatus && <ToogleActiveSvg className={style.sun} />}
      <span aria-hidden="true">
        {isLoad && <LoaderButton className={style.loaderBnt} />}
      </span>
      {!isStatus && <CircleSvg className={style.moon} />}
    </Switch>
  );
}
