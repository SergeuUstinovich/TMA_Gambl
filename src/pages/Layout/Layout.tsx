import { Outlet, useLocation, useNavigate } from "react-router-dom";
import style from "./Layout.module.scss";
import HeaderSearch from "../../components/HeaderSearch/HeaderSearch";
import FooterNav from "../../components/FooterNav/FooterNav";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { allCasino } from "../../api/allCasino";
import { useTelegram } from "../../providers/telegram/telegram";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { casinoActions } from "../../providers/StoreProvider/slice/casinoSlice";
import { dailyBonus, freeCase, wheelFortyne } from "../../api/RouletBonus";
import { freeCaseActions } from "../../providers/StoreProvider/slice/freeCaseSlice";
import { Toaster } from "react-hot-toast";
import { wheelFortyneActions } from "../../providers/StoreProvider/slice/wheelFortyneSlice";
import { dailyBonusActions } from "../../providers/StoreProvider/slice/dailyBonusSlice";
import { TabSwitcher } from "../../components/TabSwitcher/TabSwitcher";
import { tabs } from "./navDataCasino";
import { tasksActions } from "../../providers/StoreProvider/slice/tasksSlice";
import { getTaskCasino } from "../../api/tasks";

// const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

function Layout() {
  const { initData } = useTelegram();
  const dispatch = useDispatch();
  const footerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const [isLogin, setIsLogin] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const navigate = useNavigate();
  const location = useLocation();

  const casinoQuery = useQuery(
    {
      queryKey: ["casino"],
      queryFn: () => allCasino(initData),
      enabled: !!initData,
    },
    queryClient
  );

  useEffect(() => {
    if (casinoQuery.data) {
      setIsLogin(true);
      dispatch(casinoActions.addData(casinoQuery.data));
    }
  }, [casinoQuery.data]);

  const freeCaseQuery = useQuery(
    {
      queryKey: ["freeCase"],
      queryFn: () => freeCase(),
      enabled: !!isLogin,
    },
    queryClient
  );
  useEffect(() => {
    if (freeCaseQuery.data) {
      dispatch(freeCaseActions.addData(freeCaseQuery.data.prizes));
      dispatch(freeCaseActions.addSpins(freeCaseQuery.data.user));
    }
  }, [freeCaseQuery.data]);

  const whellFortyneQuery = useQuery(
    {
      queryKey: ["wheelFortyne"],
      queryFn: () => wheelFortyne(),
      enabled: !!isLogin,
    },
    queryClient
  );
  useEffect(() => {
    if (whellFortyneQuery.data) {
      dispatch(wheelFortyneActions.addData(whellFortyneQuery.data.prizes));
      dispatch(wheelFortyneActions.addSpins(whellFortyneQuery.data.user));
    }
  }, [whellFortyneQuery.data]);

  const dailyBonusQuery = useQuery(
    {
      queryKey: ["dailyBonus"],
      queryFn: () => dailyBonus(),
      enabled: !!isLogin,
    },
    queryClient
  );
  useEffect(() => {
    if (dailyBonusQuery.data) {
      dispatch(dailyBonusActions.addData(dailyBonusQuery.data.bonus));
      dispatch(dailyBonusActions.activeBtn(dailyBonusQuery.data.user));
    }
  }, [dailyBonusQuery.data]);

  const queryTasks = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getTaskCasino(),
    enabled: !!isLogin,
  }, queryClient)

  useEffect(() => {
    if(queryTasks.data) {
     dispatch(tasksActions.addData(queryTasks.data))
    }
  }, [queryTasks.data])

  useEffect(() => {
    const handleScroll = () => {
      const main = mainRef.current;
      if (main) {
        const scrollTop = main.scrollTop;
        const scrollHeight = main.scrollHeight;
        const clientHeight = main.clientHeight;
        
        if (footerRef.current && (location.pathname === '/' || location.pathname === '/betting' || location.pathname === '/poker')) {
          if (scrollTop === 0) {
            // footerRef.current.classList.add(style.visible);
          } else if (scrollTop < scrollHeight - clientHeight - 40) {
            footerRef.current.classList.add(style.visible);
          } else if (scrollTop < scrollHeight - clientHeight) {
            footerRef.current.classList.remove(style.visible);
          }
        }
      }
    };
    const main = mainRef.current;
    if (main) {
      main.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (main) {
        main.removeEventListener("scroll", handleScroll);
      }
    };
  }, [location.pathname]);

  const handleSwitch = (id: string) => {
    setActiveTab(id);
  };

  useEffect(() => {
    switch (activeTab) {
      case "1":
        navigate("/");
        break;
      case "2":
        navigate("/betting");
        break;
      case "3":
        navigate("/poker");
        break;
    }
  }, [activeTab]);

  const visibleRoutes = ["/", "/betting", "/poker"];

  useEffect(() => {
    if(location.pathname === '/') {
      setActiveTab('1')
    }
  }, [location.pathname])

  return (
    <div className={style.app}>
      <Toaster position="top-center" reverseOrder={false} />
      <header className={`${style.header} container`}>
        <HeaderSearch isLogin={isLogin} />
      </header>
      <main ref={mainRef} className={`${style.main} container`}>
        {visibleRoutes.includes(location.pathname) && (
          <TabSwitcher
            tabs={tabs}
            activeTab={activeTab}
            currentArr={handleSwitch}
          />
        )}

        <Outlet />
      </main>
      <footer ref={footerRef} className={`${style.footer} container ${style.visible}`}>
        <FooterNav />
      </footer>
    </div>
  );
}

export default Layout;
