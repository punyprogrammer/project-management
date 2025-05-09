"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/app/state";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  Home,
  Layers3,
  LockIcon,
  LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Sidebar() {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const [showProjects, setShowProjects] = useState(false);
  const [showPriorities, setShowPriorities] = useState(false);
  const sidebarClassNames = `flex flex-col h-screen justify-between shadow-xl
  transition-[width] duration-300 z-40 dark:bg-black overflow-y-scroll bg-white
  ${isSidebarCollapsed ? "w-0" : "w-96 sm:w-64"}`;
  useEffect(() => {
    console.log(showProjects);
  }, [showProjects]);
  return (
    <div className={clsx(sidebarClassNames)}>
      <div
        className={clsx(
          `flex h-full w-full  flex-col justify-start duration-300 ease-in `
        )}
      >
        <div className="z-50 flex min-h-[56px]  items-center justify-between  px-6 pt-3 bg-white dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            AGILE
          </div>
          <X
            className="w-8 h-8 dark:text-white cursor-pointer"
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          />
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
        {/* nav content */}
        <div className="overflow-y-scroll">
          {/* Nav links */}
          <nav className="z-10 w-full">
            <SidebarLink label="Home" icon={Home} href="/home" />
            <SidebarLink label="Timeline" icon={Briefcase} href="/timeline" />
            <SidebarLink label="Search" icon={Search} href="/search" />
            <SidebarLink label="Settings" icon={Settings} href="/settings" />
            <SidebarLink label="User" icon={User} href="/users" />
            <SidebarLink label="Team" icon={Users} href="/teams" />
          </nav>
          {/* Projects */}
          <button
            onClick={() => setShowProjects(!showProjects)}
            className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
          >
            <span>Projects</span>
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-300 ease-in ${showProjects ? "rotate-180" : "rotate-0"}`}
            />
          </button>
          {/* Priorites */}
          <button
            onClick={() => setShowPriorities(!showPriorities)}
            className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
          >
            <span>Priorities</span>
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-300 ease-in ${showPriorities ? "rotate-180" : "rotate-0"}`}
            />
          </button>
          {/* priority list */}
          {showPriorities && (
            <>
              <SidebarLink
                label="Urgent"
                icon={AlertCircle}
                href="/priority/urgent"
              />
              <SidebarLink
                label="High"
                icon={ShieldAlert}
                href="/priority/high"
              />
              <SidebarLink
                label="Medium"
                icon={AlertTriangle}
                href="/priority/medium"
              />
              <SidebarLink
                label="Low"
                icon={AlertOctagon}
                href="/priority/low"
              />
              <SidebarLink
                label="Backlog"
                icon={Layers3}
                href="/priority/backlog"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed?: boolean;
}
const SidebarLink = ({
  href,
  icon: Icon,
  label,
  //   isCollapsed,
}: SidebarLinkProps) => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");
  const screenWidth = window.innerWidth;
  return (
    <Link href={href}>
      <div
        className={`m-2 py-3 px-6 rounded-md relative flex cursor-pointer items-center gap-3 transition-colors ease-in duration-300 hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700  ${isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""}`}
      >
        {isActive && (
          <div className="absolute bg-blue-200 h-full w-[5px]"></div>
        )}
        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className="font-medium text-gray-800 dark:text-gray-100">
          {label}
        </span>
      </div>
    </Link>
  );
};
export default Sidebar;
