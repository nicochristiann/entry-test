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
import { updateTaskAsync } from "@/state/task/taskSlice";
import { Task } from "@/types/task.type";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const UpdateToDo = ({ task }: { task: Task }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await dispatch(updateTaskAsync(task.id)).unwrap();
      setOpen(false);
      toast.success("Task status updated successfully!");
    } catch (error) {
      toast.error("Failed to update task status!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="cursor-pointer"
          disabled={task.status === "completed" || isLoading}
        >
          {task.status === "completed" ? "Completed" : "Mark as Completed"}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Task Status</DialogTitle>
          <DialogDescription>
            Are you sure you want to update this task to "completed"? This
            action cannot be undone.
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
            variant="default"
            disabled={isLoading}
            className="w-18 cursor-pointer"
            onClick={handleDelete}
          >
            {isLoading ? <Spinner /> : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateToDo;
