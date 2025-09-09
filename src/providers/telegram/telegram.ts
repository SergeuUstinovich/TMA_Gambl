declare global {
  interface Window {
    Telegram: any;
  }
}

const MODE =
  import.meta.env.MODE === "development"
    ? false
    : true;

export const useTelegram = () => {
  const tg = window.Telegram.WebApp;
  
  const photo = MODE ? tg?.initDataUnsafe?.user?.photo_url : 'https://t.me/i/userpic/320/fjrRUs_ABTBup9B8Kfts9GODc2UDL7zZeVpXm8xojzQ.svg';
  const initData = MODE ? tg?.initData : 'user=%7B%22id%22%3A859130851%2C%22first_name%22%3A%22%D0%A1%D0%B5%D1%80%D0%B3%D0%B5%D0%B9%22%2C%22last_name%22%3A%22%D0%A3%D1%81%D1%82%D0%B8%D0%BD%D0%BE%D0%B2%D0%B8%D1%87%22%2C%22username%22%3A%22Byngara%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FfjrRUs_ABTBup9B8Kfts9GODc2UDL7zZeVpXm8xojzQ.svg%22%7D&chat_instance=5131328008378486617&chat_type=group&auth_date=1737118548&signature=DwIg_vIJfddQ8OB-Fn0brI8fQ_LNKR4ISyeLte31H-UIWRIdLS3bGWzuqHdTyfKWD7bNNcqAcw_USDNbT8HcAQ&hash=ad7911acd3fcd3610a06a77216d0520fe3ce38d82d99f62cdac524e45d8f2f6d';
  const tg_id = MODE ? tg?.initDataUnsafe?.user?.id : '12323123';
  const userName = MODE ? tg?.initDataUnsafe?.user?.username : "byngra";
  const firstName = MODE ? tg?.initDataUnsafe?.user?.first_name : "Сергей";
  // if(MODE) {
  //     tg.requestFullscreen();
  // }

  return { tg, userName, tg_id, photo, firstName, initData };
};
