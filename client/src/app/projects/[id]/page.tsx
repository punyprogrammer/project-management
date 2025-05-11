"use client";

import BoardView from "@/components/Projects/BoardView/BoardView";
import ListView from "@/components/Projects/ListView/ListView";
import ProjectHeader from "@/components/Projects/ProjectHeader";
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
      {/* Modal new task */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <BoardView setIsNewTaskModalOpen={setIsNewTaskModalOpen} id={id} />
      )}
      {activeTab === "List" && (
        <ListView id={id} setIsNewTaskModalOpen={setIsNewTaskModalOpen} />
      )}
    </div>
  );
};
export default Project;
