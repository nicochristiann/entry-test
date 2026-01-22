import { Task } from "@/types/task.type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

/*
//
//  Simulate API calls with setTimeout
//
*/
export const fetchTasksAsync = createAsyncThunk(
  "task/fetchTasksAsync",
  async (stored: Task[]) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return stored;
  },
);

export const deleteTaskAsync = createAsyncThunk(
  "task/deleteTaskAsync",
  async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return id;
  },
);

export const addTaskAsync = createAsyncThunk(
  "task/addTaskAsync",
  async (title: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return title;
  },
);

export const updateTaskAsync = createAsyncThunk(
  "task/updateTaskAsync",
  async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return id;
  },
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    // Set tasks from local storage
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasksAsync.pending, () => {
        console.log("Fetching tasks...");
      })
      .addCase(
        fetchTasksAsync.fulfilled,
        (state, action: PayloadAction<Task[]>) => {
          state.tasks = action.payload;
        },
      )
      .addCase(fetchTasksAsync.rejected, () => {
        console.error("Failed fetching tasks");
      })

      // Update Task Status
      .addCase(updateTaskAsync.pending, () => {
        console.log("Updating task status...");
      })
      .addCase(
        updateTaskAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          const task = state.tasks.find((t) => t.id === action.payload);
          if (task) task.status = "completed";
        },
      )
      .addCase(updateTaskAsync.rejected, () => {
        console.error("Failed updating task status");
      })

      // Delete Task
      .addCase(deleteTaskAsync.pending, () => {
        console.log("Deleting task...");
      })
      .addCase(
        deleteTaskAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.tasks = state.tasks.filter((t) => t.id !== action.payload);
        },
      )
      .addCase(deleteTaskAsync.rejected, () => {
        console.error("Failed deleting task");
      })

      // Add New Task
      .addCase(addTaskAsync.pending, () => {
        console.log("Adding new task...");
      })
      .addCase(
        addTaskAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.tasks.push({
            id: crypto.randomUUID(),
            title: action.payload,
            status: "pending",
          });
        },
      )
      .addCase(addTaskAsync.rejected, () => {
        console.error("Failed adding new task");
      });
  },
});

export const { setTasks } = taskSlice.actions;
export default taskSlice.reducer;
