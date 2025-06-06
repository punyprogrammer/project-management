import { useCreateProjectMutation } from "@/app/state/api";
import Modal from "@/components/Modal";
import { formatISO } from "date-fns";
import React, { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalNewProject = ({ isOpen, onClose }: Props) => {
  const [createNewProject, { isLoading, error }] = useCreateProjectMutation();
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const handleSubmit = async () => {
    if (!projectName || !startDate || !endDate) {
      return;
    }
    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formattedEndDate = formatISO(new Date(endDate), {
      representation: "complete",
    });
    await createNewProject({
      name: projectName,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      description,
    });
  };
  const isFormValid = () => {
    return projectName && description && startDate && endDate;
  };
  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          placeholder="Enter name for new Project"
          className={inputStyles}
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <textarea
          placeholder="Enter description for new Project"
          className={inputStyles}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyles}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className={inputStyles}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus-offset-2
            ${!isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""}`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating" : "Create Project..."}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewProject;
