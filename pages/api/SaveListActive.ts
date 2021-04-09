import { List, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const saveListActive = async (req, res) => {
  const getTotal = (coins) => {
    return coins.reduce((acc, curr) => {
      return acc + curr.market_data.current_price.usd * curr.quantity;
    }, 0);
  };
  const newTotal = getTotal(req.body.localCoins);
  try {
    const list: List = await prisma.list.update({
      where: {
        id: req.body.list.id,
      },
      data: {
        endTotal: newTotal,
        active: false,
      },
      include: {
        coins: true,
      },
    });

    return await res.json(list);
  } catch (error) {
    return res.status(404).json(error);
  }
};

export default saveListActive;
