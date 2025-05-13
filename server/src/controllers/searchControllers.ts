import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const search = async (req: Request, res: Response) => {
  const query = req.query.query?.toString().trim();

  if (!query) {
    return res.status(400).json({ message: "Search query is required." });
  }

  try {
    const [tasks, projects, users] = await Promise.all([
      prisma.task.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
      }),
      prisma.project.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
      }),
      prisma.user.findMany({
        where: {
          username: { contains: query, mode: "insensitive" },
        },
      }),
    ]);

    res.status(200).json({ tasks, projects, users });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
