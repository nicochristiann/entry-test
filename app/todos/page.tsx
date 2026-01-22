"use client";

import FilterToDo from "./_components/FilterToDo";
import AddToDo from "./_components/AddToDo";
import { useEffect, useMemo, useState } from "react";
import { Filter } from "@/types/task.type";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksAsync } from "@/state/task/taskSlice";
import { AppDispatch, RootState } from "@/state/store";
import { DataTable } from "../../components/DataTable";
import { columns } from "./_components/Columns";
import { TableSkeleton } from "@/components/TableSkeleton";

const page = () => {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");

  // Set tasks from local storage
  useEffect(() => {
    const fetchTask = async () => {
      try {
        setIsLoading(true);
        const stored = localStorage.getItem("tasks");
        if (stored) {
          await dispatch(fetchTasksAsync(JSON.parse(stored))).unwrap();
        }
      } catch (error) {
        console.error("Failed to load tasks from local storage!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTask();
  }, [dispatch]);

  // Save tasks to local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Filter logic
  const filteredTasks = useMemo(() => {
    if (filter === "completed") {
      return tasks.filter((task) => task.status === "completed");
    }
    if (filter === "pending") {
      return tasks.filter((task) => task.status === "pending");
    }
    return tasks;
  }, [tasks, filter]);

  return (
    <section className="container mx-auto py-8 px-4">
      <div className="mb-4">
        <h1 className="text-3xl font-medium">To Do</h1>
        <div className="flex justify-between mt-6">
          <FilterToDo value={filter} onChange={setFilter} />
          <AddToDo />
        </div>
      </div>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <DataTable columns={columns} data={filteredTasks} />
      )}
    </section>
  );
};

export default page;
