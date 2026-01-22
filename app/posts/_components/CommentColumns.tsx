"use client";

import { Comment, Post } from "@/types/post.type";
import { ColumnDef } from "@tanstack/react-table";

export const commentColumns: ColumnDef<Comment>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      const number = row.index + 1;
      return <span>{number}</span>;
    },
  },
  {
    accessorKey: "name",
    header: "Title",
    cell: ({ row }) => (
      <div className="whitespace-normal wrap-break-word xl:max-w-100">
        <span className="block">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "body",
    header: "Comment",
    cell: ({ row }) => (
      <div className="whitespace-normal wrap-break-word">
        <span className="block">{row.original.body}</span>
      </div>
    ),
  },
];
