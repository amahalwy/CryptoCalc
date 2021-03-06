import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchList = async (req, res) => {
  const list = await prisma.list.findFirst({
    where: {
      owner: {
        otp: req.body.otp,
      },
    },
    include: {
      coins: true,
    },
  });

  if (!list) {
    return res.status(404).json("Error: List not found");
  } else {
    return await res.json(list.id);
  }
};

export default fetchList;
