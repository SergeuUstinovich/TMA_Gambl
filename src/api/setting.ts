import axios from "axios";
import { validateResponse } from "./validationResponse";

const api_url =
  import.meta.env.MODE === "development"
    ? "/api"
    : import.meta.env.VITE_API_BASE_URL;

export function settingMessenge() {
  return axios
    .post(`${api_url}/api/change_flag_notification/`)
    .then((response) => {
      const data = response.data.push_trigger;
      return data;
    })
    .catch(validateResponse);
}