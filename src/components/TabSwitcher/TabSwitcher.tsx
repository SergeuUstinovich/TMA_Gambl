import { Fragment, ReactNode, useEffect, useRef } from "react";
import { Button } from "../../ui/Button";
import style from "./TabSwitcher.module.scss";
import { classNames } from "../../utils/classNames";

interface TabSwitcherProps {
  currentArr: (id: string) => void;
  activeTab: string;
  tabs: TabsType[];
  className?: string;
}

interface TabsType {
  id: string;
  label: string;
  img: ReactNode;
}

export function TabSwitcher({
  currentArr,
  activeTab,
  tabs,
  className = "",
}: TabSwitcherProps) {
  const indicatorRef = useRef<HTMLDivElement>(null);

  const handleArr = (id: string) => {
    currentArr(id);
  };
  useEffect(() => {
    const activeButton: HTMLButtonElement | null = document.querySelector(
      `.${style.tabButton}[data-tab="${activeTab}"]`
    );
    if (activeButton && indicatorRef.current) {
      const buttonWidth = activeButton.offsetWidth;
      const buttonOffsetLeft = activeButton.offsetLeft;
      indicatorRef.current.style.width = `${buttonWidth}px`;
      indicatorRef.current.style.left = `${buttonOffsetLeft}px`;
    }
  }, [activeTab]);

  return (
    <div className={classNames(style.tabContainer, {}, [className])}>
      <div className={style.tabButtons}>
        {tabs.map((tab) => (
          <Fragment key={tab.id}>
            <Button
              kind="secondary"
              className={`${style.tabButton} ${
                activeTab === tab.id ? style.active : ""
              }`}
              data-tab={tab.id}
              onClick={() => handleArr(tab.id)}
            >
              {tab.img}
              {tab.label}
            </Button>
          </Fragment>
        ))}
      </div>
      <div className={style.tabIndicator} ref={indicatorRef} />
    </div>
  );
}
