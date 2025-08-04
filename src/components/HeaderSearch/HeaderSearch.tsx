import { Link } from "react-router-dom";
import ProfileSvg from "../../assets/svg/ProfileSvg/ProfileSvg";
import SearchSvg from "../../assets/svg/SearchSvg/SearchSvg";
import { useTelegram } from "../../providers/telegram/telegram";
import { Button } from "../../ui/Button";
import style from "./HeaderSearch.module.scss";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import InputModal from "./InputModal";
import CloseSearchSvg from "../../assets/svg/CloseSearchSvg/CloseSearchSvg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { filterCasino } from "../../api/allCasino";
import { filterCasinoType } from "../../types/filterCasino";
import FilterList from "./FilterList";
import { addIcon } from "../../api/userInfo";
import logoImg from '../../assets/png/logo.png'
import toast from "react-hot-toast";
import AddHomeSvg from "../../assets/svg/AddHomeSvg/AddHomeSvg";
import { useSelector } from "react-redux";
import { getCasino } from "../../providers/StoreProvider/selectors/getCasino";

import { HomeScreenModal } from "../HomeScreenModal/HomeScreenModal";

function HeaderSearch({isLogin}: {isLogin: boolean}) {
  const { photo } = useTelegram();
  const { tg } = useTelegram();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState<filterCasinoType[]>();
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  // const [isBtnHomeScreen, setIsBtnHomeScreen] = useState(false);
  const [isModalHomeScreen, setIsModalHomeScreen] = useState(false);
  // const [loadinPage, setLoadinPage] = useState(false);
  // const users = useSelector(getCasino);

  // useEffect(() => {
  //   setLoadinPage(true);
  // }, []);

  const mutateIcon = useMutation(
    {
      mutationFn: () => addIcon(),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["wheelFortyne"] });
        queryClient.invalidateQueries({ queryKey: ["casino"] });
      },
    },
    queryClient
  );

  //для мобильки методы только
  // const handleAddScreenHome = () => {
  //   tg.checkHomeScreenStatus((status: string) => {
  //     if (status === "miss" || status === "unknown") {
  //       toast.success("Успешно добавлено");
  //       tg.addToHomeScreen();
  //       if (!users?.user.set_sign) {
  //         mutateIcon.mutate();
  //       }
  //     } else {
  //       setIsBtnHomeScreen(true);
  //       toast.error("Устройство не поддерживает добавление на главный экран");
  //     }
  //   });
  // };

  // useEffect(() => {
  //   tg.checkHomeScreenStatus((status: string) => {
  //     if (status === "added" || status === "unsupported") {
  //       setIsBtnHomeScreen(true);
  //     } else if (status === "miss" || status === "unknown") {
  //       setIsBtnHomeScreen(false);
  //     }
  //   });
  // }, [loadinPage]);

  // useEffect(() => {
  //   if (!users?.user.set_sign) {
  //     tg.checkHomeScreenStatus((status: string) => {
  //       if (status === "miss" || status === "unknown") {
  //         if (users && users?.user.count_of_session < 2) {
  //           const timer = setTimeout(() => {
  //             setIsModalHomeScreen(true);
  //           }, 10000);
  //           return () => clearTimeout(timer);
  //         }
  //       }
  //     });
  //   }
  // }, [loadinPage, users?.user.set_sign, users?.user.count_of_session]);

  // const handleCloseHome = () => {
  //   setIsModalHomeScreen(false);
  // };

  const handleActive = () => {
    setIsActive(true);
  };

  const handleClose = () => {
    setIsActive(false);
  };

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  const queryCasinoFilter = useQuery(
    {
      queryKey: ["filterCasino"],
      queryFn: () => filterCasino(),
      enabled: !!isLogin
    },
    queryClient
  );

  useEffect(() => {
    if (queryCasinoFilter.data) {
      setData(queryCasinoFilter.data);
    }
  }, [queryCasinoFilter.data]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (inputValue && data) {
      const lowerCaseInput = inputValue.toLowerCase();
      const result = data
        .map((item) => {
          if (item.title.toLowerCase().includes(lowerCaseInput)) {
            return item; // Возвращаем весь объект, если совпадает title
          }
          return {
            ...item,
            items: item.items.filter((subItem) =>
              subItem.name.toLowerCase().includes(lowerCaseInput)
            ),
          };
        })
        .filter(
          (item) =>
            item.title.toLowerCase().includes(lowerCaseInput) ||
            item.items.length > 0
        );

      setFilteredData(result);
    } else {
      setFilteredData(data);
    }
  }, [inputValue, data]);

  return (
    <>
      <div className={style.box}>
        <div onClick={handleActive} className={style.boxActiveSearch}>
            <SearchSvg className={style.svgSearch} />
        </div>
        <div className={style.boxLogo}>
          <img src={logoImg} alt="" />
        </div>
        <div className={style.boxSetting}>
          <Link
            onClick={() => tg.HapticFeedback.impactOccurred("medium")}
            to={"/provile"}
            className={style.boxAvatar}
          >
            {photo ? (
              <img className={style.imgAvatar} src={photo} alt="" />
            ) : (
              <ProfileSvg className={style.svg} />
            )}
          </Link>
          {/* <Button
            isDisabled={isBtnHomeScreen}
            onClick={handleAddScreenHome}
            kind="secondary"
            className={style.btnSetting}
          >
            <SettingSvg className={style.svgSetting} />
            <AddHomeSvg className={style.svgSetting} />
          </Button> */}
        </div>
      </div>
      <InputModal isOpen={isActive} lazy onClose={handleClose}>
        <div className={style.searchBlock}>
          <div className={`${style.boxSearch} ${isActive ? style.activeInput : ''}`}>
            <div className={style.boxSvg}>
              <SearchSvg className={style.svgSearch} />
            </div>
            <input
              ref={inputRef}
              placeholder="Казино, игры, бонусы"
              className={style.infoInput}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          <Button className={style.btn} kind="secondary" onClick={handleClose}>
            <CloseSearchSvg />
          </Button>
        </div>
        {filteredData && <FilterList filteredData={filteredData} />}
      </InputModal>
      {/* <HomeScreenModal
        onClick={handleAddScreenHome}
        isOpen={isModalHomeScreen}
        onClose={handleCloseHome}
      /> */}
    </>
  );
}

export default HeaderSearch;
