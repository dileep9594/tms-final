import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    editTask(state, action) {
      const { id, updatedTask } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...updatedTask };
      }
    },
    removeTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTaskStatus(state, action) {
        const { id, status } = action.payload;
        const index = state.tasks.findIndex((task) => task.id === id);
        if (index !== -1) {
          state.tasks[index].status = status;
        }
      },
  },
});

export const { setTasks, addTask, editTask, removeTask, updateTaskStatus } =
  taskSlice.actions;

export default taskSlice.reducer;
