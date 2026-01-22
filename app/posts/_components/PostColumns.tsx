"use client";

import { Post } from "@/types/post.type";
import { ColumnDef } from "@tanstack/react-table";

export const postColumns: ColumnDef<Post>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      const number = row.index + 1;
      return <span>{number}</span>;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="whitespace-normal wrap-break-word xl:max-w-100">
        <span className="block">{row.original.title}</span>
      </div>
    ),
  },
  {
    accessorKey: "body",
    header: "Description",
    cell: ({ row }) => (
      <div className="whitespace-normal wrap-break-word">
        <span className="block">{row.original.body}</span>
      </div>
    ),
  },
];
