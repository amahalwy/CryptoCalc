import { PrismaClient } from "@prisma/client";
import { uuid } from "uuidv4";

const prisma = new PrismaClient();

const fetchList = async (req, res) => {
  console.log(req);
  res.json("hello");
};

export default fetchList;
