"use client";
import { LockIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

function sidebar() {
  const [showProjects, setShowProjects] = useState(false);
  const [showPriority, setShowPriority] = useState(false);
  const sidebarClassNames = `flex flex-col h-screen justify-between shadow-xl transition-all duration-300 ease-in overflow-y-auto w-64  dark:shadow-lg dark:shadow-gray bg:white dark:bg-black`;
  return (
    <div className={sidebarClassNames}>
      <div className="flex h-full w-full  flex-col justify-start">
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 bg-white dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            AGILE
          </div>
        </div>
        {/* team name */}
        <div className=" flex items-center gap-5 border-y-[1.5px] border-gray-200 dark:border-gray-700 p-6">
          <Image height={40} width={40} alt="Team Name" src={"/logo.png"} />
          <div>
            <h3 className="font-bold text-md tracking-wide dark:text-gray-200">
              FE Team
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default sidebar;
