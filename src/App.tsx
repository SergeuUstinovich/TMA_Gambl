import { lazy, Suspense, useEffect } from "react";
import "./styles/global/App.scss";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useTelegram } from "./providers/telegram/telegram";
import { LoaderPage } from "./ui/Loader/LoaderPage";
// import Layout from "./pages/Layout/Layout";
import Casino from "./pages/Casino/Casino";
import Betting from "./pages/Betting/Betting";
import Poker from "./pages/Poker/Poker";
import Profile from "./pages/Profile/Profile";
import Wheel from "./pages/Wheel/Wheel";
import Case from "./pages/Case/Case";
import Daily from "./pages/Daily/Daily";
import { InfoPeople } from "./components/PeopeOnliCasino";
import Quest from "./pages/Quest/Quest";
import Setting from "./pages/Setting/Setting";
import AiFunction from "./pages/AiFunction/AiFunction";
import { BannerInfo } from "./components/Banner/BannerInfo";
import { InfoBigGame } from "./components/BigGame/InfoBigGame";


const Layout = lazy(() => import("./pages/Layout/Layout"));
// const Casino = lazy(() => import("./pages/Casino/Casino"));
// const Betting = lazy(() => import("./pages/Betting/Betting"));
// const Poker = lazy(() => import("./pages/Poker/Poker"));
// const Profile = lazy(() => import("./pages/Profile/Profile"));
// const Wheel = lazy(() => import("./pages/Wheel/Wheel"));
// const Case = lazy(() => import("./pages/Case/Case"));
// const Daily = lazy(() => import("./pages/Daily/Daily"));

function App() {
  const {tg} = useTelegram();
  tg.expand();
  tg.disableVerticalSwipes();

  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if(location.pathname === '/') {
      tg.BackButton.hide()
    } else {
      tg.BackButton.show()
      tg.BackButton.onClick(() => {
        navigate(-1)
      })
    }
  }, [location.pathname])
  return (
    <>
      <Suspense fallback={<LoaderPage />}>
        <Routes>
          <Route path={"/"} element={<Layout />}>
            <Route index element={<Casino />} />
            <Route path={'betting'} element={<Betting />} />
            <Route path={'poker'} element={<Poker />} />
            <Route path={'quest'} element={<Quest />} />
            <Route path={'setting'} element={<Setting />} />
            <Route path={'provile'} element={<Profile />} />
            <Route path={'wheel'} element={<Wheel />} />
            <Route path={'case'} element={<Case />} />
            <Route path={'daily'} element={<Daily />} />
            <Route path={'ai-function'} element={<AiFunction />} />
            <Route path={'banner/:id'} element={<BannerInfo />} />
            <Route path={'big-game/:id'} element={<InfoBigGame />} />
            <Route path={'/:id'} element={<InfoPeople />} />
          </Route>
          <Route path={'*'} element={<Navigate to={'/'} />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
