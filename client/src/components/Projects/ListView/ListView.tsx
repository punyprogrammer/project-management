import { useGetTasksQuery } from "@/app/state/api";
import Header from "@/components/Header/Header";
import React from "react";
import { Task } from "@/app/state/api";
import TaskCard from "@/components/TaskCard";

type ListViewProps = {
  id: string;
  setIsNewTaskModalOpen: (isOpen: boolean) => void;
};

const ListView = ({ id, setIsNewTaskModalOpen }: ListViewProps) => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (error) {
    return <div>Some error occurred with fetching tasks</div>;
  }
  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="Task List"
          buttonComponent={
            <button
              className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsNewTaskModalOpen(true)}
            >
              Add Task
            </button>
          }
        />
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {tasks?.map((task: Task) => <TaskCard key={task.id} task={task} />)}
        </div>
      </div>
    </div>
  );
};

export default ListView;
