import { List, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchListTotal = async (req, res) => {
  const list: List = await prisma.list.findFirst({
    where: {
      owner: {
        name: req.body.name,
      },
    },
    include: {
      coins: true,
    },
  });

  if (!list) {
    return res.status(404).json("Error: List not found");
  } else {
    return await res.json(list.endTotal);
  }
};

export default fetchListTotal;
