import { useEffect, useState } from "react";
import InfoUser from "../../components/InfoUser/InfoUser";
import style from "./Profile.module.scss";
import ItemsProfile from "../../components/ItemsProfile/ItemsProfile";

function Profile() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`${style.profile} ${isLoaded ? style.fade : ""}`}>
      <InfoUser />
      <ItemsProfile />
    </div>
  );
}

export default Profile;
