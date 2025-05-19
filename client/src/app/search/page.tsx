"use client";

import React, { useEffect, useState, useMemo } from "react";
import { debounce } from "lodash";
import { useSearchQuery } from "../state/api";

import Header from "@/components/Header/Header";
import TaskCard from "@/components/TaskCard";
import UserCard from "@/components/Users/UserCard";
import ProjectCard from "@/components/Projects/ProjectCard/ProjectCard";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedHandleSearch = useMemo(
    () => debounce((value: string) => setSearchTerm(value), 500),
    []
  );

  const {
    data: result,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  useEffect(() => {
    return () => debouncedHandleSearch.cancel(); // Cleanup on unmount
  }, [debouncedHandleSearch]);

  const hasResults =
    result &&
    (result.tasks?.length || result.projects?.length || result.users?.length);

  return (
    <div className="p-8">
      <Header name="Search" />
      <input
        onChange={(e) => debouncedHandleSearch(e.target.value)}
        type="text"
        placeholder="Enter search term"
        className="p-2 border border-gray-500 rounded-md outline-none dark:bg-dark-secondary dark:text-white w-full mb-6"
      />

      {isLoading && <p className="text-gray-500">Loading...</p>}
      {isError && <p className="text-red-500">Something went wrong.</p>}

      {!isLoading && !hasResults && searchTerm.length > 0 && (
        <p className="text-gray-500">No results found.</p>
      )}

      {result?.tasks && result?.tasks?.length > 0 && (
        <Section title="Tasks">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {result.tasks.map((task) => (
              <TaskCard task={task} key={task.id} />
            ))}
          </div>
        </Section>
      )}

      {result?.projects && result?.projects?.length > 0 && (
        <Section title="Projects">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {result.projects.map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}
          </div>
        </Section>
      )}

      {result?.users && result?.users?.length > 0 && (
        <Section title="Users">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            {result.users.map((user) => (
              <UserCard user={user} key={user.userId} />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-8">
    <h2 className="text-base py-2 font-semibold dark:text-white">{title}</h2>
    {children}
  </div>
);

export default Search;
