"use client";

import { Task } from "@/types/task.type";
import { ColumnDef } from "@tanstack/react-table";
import DeleteToDo from "./DeleteToDo";
import UpdateToDo from "./UpdateToDo";

export const columns: ColumnDef<Task>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      const number = row.index + 1;
      return <span>{number}</span>;
    },
  },
  {
    accessorKey: "title",
    header: "Task",
    cell: ({ row }) => (
      <div className="whitespace-normal wrap-break-word xl:max-w-200 xl:min-w-150">
        <span className="block">{row.original.title}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="whitespace-normal wrap-break-word">
        <span className="block">{row.original.status.toUpperCase()}</span>
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-3">
          <UpdateToDo task={row.original} />
          <DeleteToDo task={row.original} />
        </div>
      );
    },
  },
];
