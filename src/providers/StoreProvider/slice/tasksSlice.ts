import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TasksScheme, TasksType } from '../../../types/TasksType'

const initialState: TasksScheme = {}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<TasksType[]>) => {
      state.tasks = action.payload
    },
    
  },
})

export const { actions: tasksActions } = tasksSlice
export const { reducer: tasksReducer } = tasksSlice
