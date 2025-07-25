import { useSelector } from "react-redux";
import { getTasks } from "../../providers/StoreProvider/selectors/getTasks";
import { Button } from "../../ui/Button";
import style from "./TasksList.module.scss";
import img from "../../assets/svg/check_tasks.svg";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { activeTask, checkTask } from "../../api/tasks";
import toast from "react-hot-toast";
import { useState } from "react";

export function TasksList() {
  const tasks = useSelector(getTasks);
    const [activeLoadingId, setActiveLoadingId] = useState<number | null>(null);
  const [checkLoadingId, setCheckLoadingId] = useState<number | null>(null);
  const mutateActiveTasks = useMutation(
    {
      mutationFn: (data: { id: number }) => {
        setActiveLoadingId(data.id)
        return activeTask(data.id)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['tasks']})
        setActiveLoadingId(null);
      },
      onError: (err) => {
        toast.error(err.message);
        setActiveLoadingId(null)
      }
    },
    queryClient
  );

  const mutateCheckTasks = useMutation(
    {
      mutationFn: (data: { id: number }) => {
        setCheckLoadingId(data.id)
        return checkTask(data.id)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['tasks']})
        queryClient.invalidateQueries({queryKey: ["casino"]})
        toast.success(`Задание успешно выполненно`);
        setCheckLoadingId(null)
      },
      onError: (err) => {
        toast.error(err.message);
        setCheckLoadingId(null)
      }
    },
    queryClient
  );

  const handleActiveTasks = (id: number) => {
    mutateActiveTasks.mutate({ id });
  };

  const handleCheckTasks = (id: number) => {
    mutateCheckTasks.mutate({ id });
  };

  return (
    <ul className={style.list}>
      {tasks?.map((item) => (
        <li className={style.item} key={item.task.id}>
          <h3 className={style.title}>{item.task.name}</h3>
          <span className={style.span}>+{item.task.prize}</span>
          {!item.can_get_prize && (
            <Button
              isLoading={activeLoadingId === item.task.id}
              onClick={() => handleActiveTasks(item.task.id)}
              className={style.btn_can}
            >
              Выполнить
            </Button>
          )}
          {!item.received_prize && item.can_get_prize && (
            <Button
              isLoading={checkLoadingId === item.task.id}
              onClick={() => handleCheckTasks(item.task.id)}
              className={style.btn_receiv}
              kind="secondary"
            >
              Проверить
            </Button>
          )}
          {item.received_prize && item.can_get_prize && (
            <img src={img} alt="" />
          )}
        </li>
      ))}
    </ul>
  );
}
