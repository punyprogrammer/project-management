import React, { useState } from "react";
import Header from "../Header/Header";
import { Clock, Filter, Grid3X3, List, Share2, Table } from "lucide-react";

type Props = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

function ProjectHeader({ activeTab, setActiveTab }: Props) {
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  return (
    <div className="px-4 xl:px-6">
      <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
        <Header name="Project Design and Development" />
      </div>
      {/* Tabs */}
      <div className="flex justify-between px-4 flex-wrap-reverse gap-2 border  border-gray-200 pb-[8px] pt-2 dark:border-stroke-dark md:items-center">
        <div className="flex flex- items-center gap-2 md:gap-4">
          <TabButton
            name="Board"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            icon={<Grid3X3 className="h-5 w-5" />}
          />
          <TabButton
            name="List"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            icon={<List className="h-5 w-5" />}
          />
          <TabButton
            name="Timeline"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            icon={<Clock className="h-5 w-5" />}
          />
          <TabButton
            name="Table"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            icon={<Table className="h-5 w-5" />}
          />
        </div>
        {/* Top header */}
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-600 dark-text-neutral dark:hover:text-gray-300">
            <Filter className="h-5 w-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-600 dark-text-neutral dark:hover:text-gray-300">
            <Share2 className="h-5 w-5" />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Tasks"
              className="rounded-md border py-1 pl-10 pr-4 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
            />
            <Grid3X3 className="absolute left-3 top-2 size-4 text-gray-400 dark:text-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (tabName: string) => void;
  activeTab: string;
};
const TabButton = ({ name, icon, setActiveTab, activeTab }: TabButtonProps) => {
  const isActiveTab = name === activeTab;
  return (
    <button
      className={`relative flex items-center gap-2 px-1 after:transition-all after:duration-300 after:ease-in text-gray-500 after:absolute after:-bottom-[13px] after:left-0 after:h-[2px] after:w-full   dark:text-white sm:px-2  hover:text-blue-600 ${isActiveTab ? "!text-blue-600 after:bg-blue-600 " : ""}`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  );
};

export default ProjectHeader;
