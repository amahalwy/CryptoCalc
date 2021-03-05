import { PrismaClient } from "@prisma/client";
import { uuid } from "uuidv4";

const saveList = async (req, res) => {
  const prisma = new PrismaClient();
  const name = req.body.name;
  const coins = req.body.coins;
  const total = coins.reduce((acc, curr) => {
    return acc + curr.market_data.current_price.usd * curr.quantity;
  }, 0);

  const endDate = (date) => {
    var result = new Date(date);
    result.setDate(result.getDate() + 3);
    return result;
  };

  const end = endDate(Date.now());

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
        endDate: end,
        total,
      },
    });

    await Promise.all(
      coins.map(async (coin) => {
        return prisma.coin.create({
          data: {
            name: coin.name,
            listId: newList.id,
            quantity: coin.quantity || 0,
          },
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
