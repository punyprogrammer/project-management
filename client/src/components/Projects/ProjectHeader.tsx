import React, { useState } from "react";
import Header from "../Header/Header";
import {
  Clock,
  Filter,
  Grid3X3,
  List,
  PlusSquareIcon,
  Share2,
  Table,
} from "lucide-react";

type Props = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
  setIsNewProjectModalOpen: (isOpen: boolean) => void;
};

function ProjectHeader({
  activeTab,
  setActiveTab,
  setIsNewProjectModalOpen,
}: Props) {
  return (
    <div className="px-2 sm:px-4 xl:px-6">
      <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
        <Header
          name="Project Design and Development"
          buttonComponent={
            <button
              className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300 ease-in rounded-md gap-1"
              onClick={() => setIsNewProjectModalOpen(true)}
            >
              <PlusSquareIcon className="h-5 w-5" />
              <span>New Project</span>
            </button>
          }
        />
      </div>
      {/* Tabs */}
      <div className="flex justify-between px-2 sm:px-4 flex-wrap-reverse gap-2 border  border-gray-200 pb-[8px] pt-2 dark:border-stroke-dark md:items-center">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
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
              className="w-full rounded-md border py-1 pl-10 pr-4 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
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
      className={`relative flex items-center gap-2 px-1 after:transition-all after:duration-300 after:ease-in text-gray-500 after:absolute after:-bottom-[13px] after:left-0 after:sm:h-[2px] after:h-0 after:w-full   dark:text-white sm:px-2  hover:text-blue-600 ${isActiveTab ? "!text-blue-600 after:bg-blue-600 " : ""}`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  );
};

export default ProjectHeader;
