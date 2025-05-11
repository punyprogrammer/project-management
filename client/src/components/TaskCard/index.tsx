import { Task } from "@/app/state/api";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

// --- Types ---
type TaskCardProps = {
  task: Task;
};

// --- Main Component ---
const TaskCard = ({ task }: TaskCardProps) => {
  const tagList = task.tags?.split(",");

  return (
    <div className="mb-3 rounded-xl bg-white p-4 shadow-sm cursor-pointer hover:shadow-lg hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-300 ease-in dark:bg-dark-secondary dark:text-white">
      {/* Header */}
      <div className="pb-2 flex-col sm:flex items-center justify-between border-b border-gray-200">
        <h2 className="font-semibold">{task.title}</h2>
        <div className="pt-2 sm:pt-0 grid grid-cols-2 sm:flex gap-2">
          {task.priority && <PriorityTag priority={task.priority} />}
          {tagList?.map((name) => <Tag key={name.trim()} name={name.trim()} />)}
        </div>
      </div>

      {/* User Info */}
      <div className="flex-col sm:flex items-start justify-between py-2 gap-2">
        {task.author && (
          <UserBadge
            label="Author"
            username={task.author.username}
            imageUrl={task.author.profilePictureUrl}
          />
        )}
        {task.assignee && (
          <UserBadge
            label="Assignee"
            username={task.assignee.username}
            imageUrl={task.assignee.profilePictureUrl}
          />
        )}
      </div>

      {/* Dates */}
      <div className="flex-col sm:flex gap-4 sm:items-start sm:justify-between">
        {task.startDate && (
          <DateInfo label="Start Date" date={task.startDate} />
        )}
        {task.dueDate && <DateInfo label="Due Date" date={task.dueDate} />}
      </div>

      {/* Description */}
      {task.description && (
        <p className="mt-2 text-sm font-light dark:text-white">
          {task.description}
        </p>
      )}
    </div>
  );
};

// --- Subcomponents ---
const PriorityTag = ({ priority }: { priority: Task["priority"] }) => {
  const priorityStyles: Record<string, string> = {
    Urgent: "bg-red-200 text-red-700",
    High: "bg-yellow-200 text-yellow-700",
    Medium: "bg-green-200 text-green-700",
    Low: "bg-blue-200 text-blue-700",
    Backlog: "bg-gray-200 text-gray-700",
  };

  return (
    <div
      className={`w-full sm:w-fit rounded-full px-2 py-1 text-xs font-semibold text-center ${
        priorityStyles[priority || "Backlog"]
      }`}
    >
      {priority}
    </div>
  );
};

const Tag = ({ name }: { name: string }) => (
  <span className="text-center w-full sm:w-fit rounded-full bg-blue-100 px-2 py-1 text-xs dark:text-blue-600">
    {name}
  </span>
);

const UserBadge = ({
  label,
  username,
  imageUrl,
}: {
  label: string;
  username: string;
  imageUrl?: string;
}) => (
  <div className="flex items-center gap-2">
    <h3 className="font-medium">{label}:</h3>
    {imageUrl && (
      <Image
        src={imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`}
        alt={username}
        width={30}
        height={30}
        className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
      />
    )}
    <span className="text-xs text-gray-600 dark:text-white">{username}</span>
  </div>
);

const DateInfo = ({ label, date }: { label: string; date: string }) => (
  <div className="flex items-center gap-1">
    <h3 className="font-medium">{label}:</h3>
    <span>{format(new Date(date), "P")}</span>
  </div>
);

export default TaskCard;
