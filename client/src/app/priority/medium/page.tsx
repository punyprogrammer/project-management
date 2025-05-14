import React from "react";
import ReusablePriorityPage from "../TaskPriority";
import { Priority } from "@/app/state/api";

const Page = () => {
  return <ReusablePriorityPage priority={Priority.Medium} />;
};

export default Page;
