import axios from "axios";

const api_url =
  import.meta.env.MODE === "development"
    ? "/api"
    : import.meta.env.VITE_API_BASE_URL;

export function freeCase() {
  return axios
    .get(`${api_url}/api/get_info_free_case/`)
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((err) => console.log(err));
}

export function addFreeCase(prize_id: number) {
  return axios
    .post(`${api_url}/api/add_free_case_bonus/`, {
      prize_id,
    })
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((err) => {throw new Error(err.info)});
};

export function wheelFortyne() {
  return axios
    .get(`${api_url}/api/get_info_wheel_of_fortune/`)
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((err) => console.log(err));
}

export function addWheelBonus(prize_id: number) {
  return axios
    .post(`${api_url}/api/add_wheel_of_fortune_bonus/`, {
      prize_id,
    })
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((err) => {throw new Error(err.info)});
};

export function dailyBonus() {
  return axios
    .get(`${api_url}/api/get_info_daly_bonus/`)
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((err) => console.log(err));
}

export function addDailyBonus() {
  return axios
    .post(`${api_url}/api/get_daly_bonus/`)
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((err) => {throw new Error(err.info)});
};
