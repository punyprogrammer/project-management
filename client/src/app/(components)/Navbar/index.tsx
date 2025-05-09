import React from "react";
import { Menu, Moon, Search, Settings, Sun } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/app/state";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black dark:text-white">
      {/* Search */}
      <div className="flex items-center gap-8">
        {!isSidebarCollapsed ? null : (
          <button
            className={
              "cursor-pointer group h-min w-min rounded p-2 hover:bg-gray-100 transition-all duration-300 ease-in"
            }
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          >
            <Menu className="h-8 w-8  dark:text-white  dark:group-hover:text-black" />
          </button>
        )}

        <div
          className={`relative flex h-min  ${isSidebarCollapsed ? "w-full" : "hidden sm:w-full"}`}
        >
          <Search className="absolute left-[4px] top-1/2  mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />
          <input
            className="w-full rounded border-none bg-gray-100  p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
            type="search"
            placeholder="This is some text"
          />
        </div>
      </div>
      {/* Icons */}
      <div className="flex items-center">
        {/* Mode switcher */}
        <button
          className=" cursor-pointer group h-min w-min rounded p-2 hover:bg-gray-100 transition-all duration-300 ease-in"
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
        >
          {isDarkMode ? (
            <Sun className="group-hover:text-black" />
          ) : (
            <Moon className="" />
          )}
        </button>
        <Link
          href={"/settings"}
          className=" group h-min w-min rounded p-2 hover:bg-gray-100 transition-all duration-300 ease-in"
        >
          <Settings className="h-6 w-6 cursor-pointer dark:text-white  dark:group-hover:text-black" />
        </Link>
        <div className="ml-2 mr-5 hidden min-h-[2rem] w-[0.1rem] bg-gray-200 md:inline-block"></div>
      </div>
    </div>
  );
};
export default Navbar;
