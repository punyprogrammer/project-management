import React from "react";
import { format } from "date-fns";

type Project = {
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
};

type Props = {
  project: Project;
};

const ProjectCard: React.FC<Props> = ({ project }) => {
  return (
    <div className="w-full rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg dark:bg-dark-secondary dark:text-white">
      <h2 className="text-xl font-semibold mb-2">{project.name}</h2>

      {project.description && (
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          {project.description}
        </p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        {project.startDate && (
          <span>
            <strong>Start:</strong>{" "}
            {format(new Date(project.startDate), "MMM dd, yyyy")}
          </span>
        )}
        {project.endDate && (
          <span>
            <strong>End:</strong>{" "}
            {format(new Date(project.endDate), "MMM dd, yyyy")}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
