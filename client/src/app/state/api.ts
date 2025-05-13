import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export interface Project {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export enum Priority {
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Backlog = "Backlog",
}

export enum Status {
  ToDo = "To Do",
  WorkInProgress = "Work In Progress",
  UnderReview = "Under Review",
  Completed = "Completed",
}

export interface User {
  userId?: number;
  username: string;
  email: string;
  profilePictureUrl?: string;
  cognitoId?: string;
  teamId?: number;
}

export interface Attachment {
  id: number;
  fileURL: string;
  fileName: string;
  taskId: number;
  uploadedById: number;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  points?: number;
  projectId: number;
  authorUserId?: number;
  assignedUserId?: number;

  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
}

export interface SearchResults {
  tasks?: Task[];
  projects?: Project[];
  users?: User[];
}

export interface Team {
  teamId: number;
  teamName: string;
  productOwnerUserId?: number;
  projectManagerUserId?: number;
}
// Importing `createApi` and `fetchBaseQuery` from Redux Toolkit Query (RTK Query)
export const api = createApi({
  // Defines how base queries are made; here, it uses the environment variable for the base API URL
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),

  // Unique key that identifies where this API slice will be mounted in the Redux store
  reducerPath: "api",

  // Defines the tag types used for cache management and automatic invalidation
  tagTypes: ["Projects", "Tasks", "Users", "Teams"],

  // Defining the API endpoints (queries and mutations) that can be used in components or hooks
  endpoints: (build) => ({
    // GET endpoint to fetch a list of all projects
    getProjects: build.query<Project[], void>({
      // Used when you want to load all projects (e.g., on a dashboard or projects page)
      query: () => "projects",

      // Tags the result with "Projects" so RTK Query can manage caching for this data
      // If a mutation invalidates this tag, the query will auto-refetch
      providesTags: ["Projects"],
    }),

    // POST endpoint to create a new project
    createProject: build.mutation<Project, Partial<Project>>({
      // Used in forms or modals when submitting a new project
      query: (project) => ({
        url: "projects", // Sends data to the 'projects' endpoint
        method: "POST", // Uses POST to create a new resource
        body: project, // Sends the project data in the request body
      }),

      // Invalidates the "Projects" tag so `getProjects` automatically refetches to include the new project
      invalidatesTags: ["Projects"],
    }),

    // GET endpoint to fetch all tasks for a specific project
    getTasks: build.query<Task[], { projectId: number }>({
      // Used when viewing details of a project where associated tasks are shown
      query: ({ projectId }) => `tasks?projectId=${projectId}`,

      // Tags each task individually by ID to allow fine-grained cache updates (e.g., when a single task is updated)
      // Also ensures the list is cached under a general "Tasks" tag
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }],
    }),
    createTask: build.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTaskStatus: build.mutation<Task, { taskId: number; status: string }>({
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_, __, { taskId }) => [
        {
          type: "Tasks",
          id: taskId,
        },
      ],
    }),
    search: build.query<SearchResults, string>({
      query: (query) => `search?query=${query}`,
    }),
    getUsers: build.query<User[], void>({
      query: () => `users`,
      providesTags: ["Users"],
    }),
    getTeams: build.query<Team[], void>({
      query: () => `teams`,
      providesTags: ["Teams"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
  useSearchQuery,
  useGetUsersQuery,
  useGetTeamsQuery
} = api;
