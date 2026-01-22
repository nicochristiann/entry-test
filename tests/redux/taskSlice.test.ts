import taskReducer from "@/state/task/taskSlice";
import { addTaskAsync } from "@/state/task/taskSlice";
import { Task } from "@/types/task.type";

describe("taskSlice async logic", () => {
  it("should handle addTaskAsync.fulfilled", () => {
    const initialState = {
      tasks: [] as Task[],
    };

    const action = {
      type: addTaskAsync.fulfilled.type,
      payload: "Wash Dishes",
    };

    const nextState = taskReducer(initialState, action);

    expect(nextState.tasks.length).toBe(1);
    expect(nextState.tasks[0].title).toBe("Wash Dishes");
    expect(nextState.tasks[0].status).toBe("pending");
    expect(nextState.tasks[0].id).toBeDefined();
  });
});
