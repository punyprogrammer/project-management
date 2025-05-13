"use client";
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StoreProvider, { useAppSelector } from "./redux";

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  //
  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-900">
      <Sidebar isSidebarCollapsed={isSidebarCollapsed} />
      <main
        className={`transition-transform ease-in duration-300  flex w-full flex-col bg-gray-50 dark:bg-dark-bg  ${!isSidebarCollapsed ? "max-w-[calc(100vw-160px)]" : ""} `}
      >
        {/* navbar */}
        <Navbar />
        <div className="overflow-y-scroll">{children}</div>
      </main>
    </div>
  );
};
const DashboardWrapper = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
