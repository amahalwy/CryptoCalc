import { PrismaClient } from "@prisma/client";
import { uuid } from "uuidv4";

const saveList = async (req, res) => {
  const prisma = new PrismaClient();
  const name = req.body.name;
  const coins = req.body.coins;

  try {
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
        active: req.body.active,
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
      active: req.body.active,
      name: newUser.name,
      otp: newUser.otp,
      ...updatedList,
    };

    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({ ErrorCode: err.code });
  }
};

export default saveList;
