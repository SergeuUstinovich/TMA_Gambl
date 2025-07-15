import axios from "axios";

axios.defaults.withCredentials = true;

const api_url =
  import.meta.env.MODE === "development"
    ? "/api"
    : import.meta.env.VITE_API_BASE_URL;

export function allCasino(initData: string) {
  return axios
    .get(`${api_url}/api/main_page/`, {
      headers: {
        Authorization: initData,
      }
    })
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch(err => console.log(err));
};

export function filterCasino() {
  return axios
    .get(`${api_url}/api/filter_category_list/`)
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch(err => console.log(err));
};