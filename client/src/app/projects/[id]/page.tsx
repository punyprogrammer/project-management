"use client";

import Modal from "@/components/Modal";
import BoardView from "@/components/Projects/BoardView/BoardView";
import ListView from "@/components/Projects/ListView/ListView";
import ModalNewProject from "@/components/Projects/ModalNewProject";
import ModalNewTask from "@/components/Projects/ModalNewTask";
import ProjectHeader from "@/components/Projects/ProjectHeader";
import TableView from "@/components/Projects/TableView";
import Timeline from "@/components/Projects/TimelineView";
import { useState } from "react";

type Props = {
  params: { id: string };
};
const Project = ({ params }: Props) => {
  const { id } = params;
  const [activeTab, setActiveTab] = useState("Board");
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  return (
    <div>
      <ModalNewProject
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
      />
      <ModalNewTask
        isOpen={isNewTaskModalOpen}
        id={id}
        onClose={() => setIsNewTaskModalOpen(false)}
      />
      <ProjectHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsNewProjectModalOpen={setIsNewTaskModalOpen}
      />
      {activeTab === "Board" && (
        <BoardView setIsNewTaskModalOpen={setIsNewTaskModalOpen} id={id} />
      )}
      {activeTab === "List" && (
        <ListView id={id} setIsNewTaskModalOpen={setIsNewTaskModalOpen} />
      )}
      {activeTab === "Timeline" && (
        <Timeline id={id} setIsNewTaskModalOpen={setIsNewTaskModalOpen} />
      )}
      {activeTab === "Table" && (
        <TableView id={id} setIsModalNewTaskOpen={setIsNewTaskModalOpen} />
      )}
    </div>
  );
};
export default Project;
