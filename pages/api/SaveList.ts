import { Coin, List, PrismaClient, User } from "@prisma/client";
import { uuid } from "uuidv4";

const saveList = async (req, res) => {
  const prisma = new PrismaClient();
  const name: string = req.body.name;
  const coins: any[] = req.body.coins;
  const total: number = coins.reduce((acc, curr) => {
    return acc + curr.market_data.current_price.usd * curr.quantity;
  }, 0);

  // result.setDate(result.getDate() + 3);
  const endDate = (date: number) => {
    let result = new Date(date);
    let current = new Date(date);

    // result.setDate(result.getMinutes() + 1);
    // return result;
    return new Date(date + 20000);
  };

  const start: string = Date.now().toString();
  const end: string = endDate(Date.now()).toString();

  try {
    const newUser: User = await prisma.user.create({
      data: {
        id: uuid(),
        name,
        otp: uuid(),
      },
    });

    const newList: List = await prisma.list.create({
      data: {
        id: uuid(),
        userId: newUser.id,
        startDate: start,
        endDate: end,
        total,
        currentTotal: total,
        percentChange: 0,
      },
    });

    await Promise.all(
      coins.map(async (coin) => {
        return prisma.coin.create({
          data: {
            name: coin.name,
            listId: newList.id,
            quantity: coin.quantity || 0,
            price: coin.market_data.current_price.usd,
          },
        });
      })
    );

    const updatedList: List = await prisma.list.findUnique({
      where: { id: newList.id },
      include: {
        coins: true,
      },
    });

    const response: {
      active: boolean;
      name: string;
      otp: string;
      id: string;
      userId: string;
      startDate: string;
      endDate: string;
      total: number;
    } = {
      active: req.body.active,
      name: newUser.name,
      otp: newUser.otp,
      ...updatedList,
    };

    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export default saveList;
