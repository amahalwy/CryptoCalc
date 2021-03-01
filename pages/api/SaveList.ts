import { PrismaClient } from "@prisma/client";
import { uuid } from "uuidv4";

const prisma = new PrismaClient();

const saveList = async (req, res) => {
  const name = req.body.name;
  const coins = req.body.coins;

  const newUser = await prisma.user.create({
    data: {
      id: uuid(),
      name,
      otp: uuid(),
    },
  });

  const newList = await prisma.list.create({
    data: {
      id: uuid(),
      userId: newUser.id,
    },
  });

  await Promise.all(
    coins.map(async (coin) => {
      return prisma.coin.create({
        data: { name: coin.name, listId: newList.id },
      });
    })
  );

  const updatedList = await prisma.list.findUnique({
    where: { id: newList.id },
    include: {
      coins: true,
    },
  });

  const response = {
    name: newUser.name,
    otp: newUser.otp,
    ...updatedList,
  };

  try {
    return await res.json(response);
  } catch (error) {
    return res.json({ error: true });
  }
};

export default saveList;
