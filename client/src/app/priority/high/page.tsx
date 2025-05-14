import React from "react";
import ReusablePriorityPage from "../TaskPriority";
import { Priority } from "@/app/state/api";

const Page = () => {
  return <ReusablePriorityPage priority={Priority.High} />;
};

export default Page;
