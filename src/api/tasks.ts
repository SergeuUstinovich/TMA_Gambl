import axios from "axios";
import { validateResponse } from "./validationResponse";

const api_url =
  import.meta.env.MODE === "development"
    ? "/api"
    : import.meta.env.VITE_API_BASE_URL;

export function getTaskCasino() {
  return axios
    .get(`${api_url}/api/get_list_of_tasks/`)
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((err) => console.log(err));
}

export function activeTask(task_id: number) {
  return axios
    .post(`${api_url}/api/activate_task/`, {
      task_id,
    })
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch(validateResponse);
}

export function checkTask(task_id: number) {
  return axios
    .post(`${api_url}/api/check_task_and_regard_prize/`, {
      task_id,
    })
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch(validateResponse);
}
