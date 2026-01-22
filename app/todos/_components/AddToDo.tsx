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
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { AppDispatch } from "@/state/store";
import { addTaskAsync } from "@/state/task/taskSlice";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const AddToDo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!input.trim()) {
      setError("Task name cannot be empty!");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      await dispatch(addTaskAsync(input)).unwrap();
      setInput("");
      setOpen(false);
      toast.success("Task added successfully!");
    } catch (error) {
      toast.error("Failed to add new task!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          disabled={isLoading}
          className="cursor-pointer"
        >
          + Add New Task
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form className="space-y-3">
          <DialogHeader>
            <DialogTitle>New Task</DialogTitle>
            <DialogDescription>Create a new task.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                name="title"
                placeholder="Wash dishes"
                required
                autoComplete="off"
              />
              <small className="text-red-500">{error}</small>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={() => setInput("")}
                disabled={isLoading}
                className="w-18 cursor-pointer"
              >
                {isLoading ? <Spinner /> : "Cancel"}
              </Button>
            </DialogClose>
            <Button
              type="button"
              disabled={isLoading}
              onClick={handleSubmit}
              className="w-24 cursor-pointer"
            >
              {isLoading ? <Spinner /> : "Add Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddToDo;
