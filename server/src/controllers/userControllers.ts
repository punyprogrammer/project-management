import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// fetch all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({});
    res.status(200).json(users);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error in retrieving users ${error.message}` });
  }
};
