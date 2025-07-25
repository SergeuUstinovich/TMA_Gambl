export interface TasksScheme {
  tasks?: TasksType[];
}

export interface TasksType {
  can_get_prize: boolean;
  received_prize: boolean;
  task: {
    timer: number;
    prize: number;
    name: string;
    id: number;
    count_days_visit: number;
  };
}
