"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { AppDispatch } from "@/state/store";
import { deleteTaskAsync } from "@/state/task/taskSlice";
import { Task } from "@/types/task.type";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const DeleteToDo = ({ task }: { task: Task }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await dispatch(deleteTaskAsync(task.id)).unwrap();
      setOpen(false);
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete task!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="cursor-pointer">
          Delete
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this task? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              disabled={isLoading}
              className="w-18 cursor-pointer"
            >
              {isLoading ? <Spinner /> : "Cancel"}
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            disabled={isLoading}
            className="w-18 cursor-pointer"
            onClick={handleDelete}
          >
            {isLoading ? <Spinner /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteToDo;
