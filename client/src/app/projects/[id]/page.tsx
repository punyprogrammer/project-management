"use client";

import ProjectHeader from "@/components/Projects/ProjectHeader";
import { useState } from "react";

type Props = {
  params: { id: string };
};
const Project = ({ params }: Props) => {
  const { id } = params;
  const [activeTab, setActiveTab] = useState('');
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  return (
    <div>
      {/* Modal new task */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};
export default Project;
