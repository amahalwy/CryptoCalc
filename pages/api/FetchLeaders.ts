import { PrismaClient } from "@prisma/client";
import { List } from "../../typescript/interfaces";
import { fetchPrice } from "./FetchPrice";

const prisma = new PrismaClient();

const fetchLeaders = async (req, res) => {
  const prisma = new PrismaClient();
  const tempLists: List[] = await prisma.list.findMany({
    include: {
      coins: true,
    },
  });

  if (!tempLists) {
    return {
      notFound: true,
    };
  }

  tempLists.map(async (list) => {
    let newTotal = 0;
    await Promise.all(
      list.coins.map(async (coin) => {
        await fetchPrice(coin.name).then(async (res) => {
          newTotal += res[coin.name.toLowerCase()].usd * coin.quantity;
          try {
            let diff: number = 0;
            if (newTotal > list.total) {
              diff = newTotal - list.total;
            } else {
              diff = list.total - newTotal;
            }
            await prisma.list.update({
              where: {
                id: list.id,
              },
              data: {
                coins: {
                  update: {
                    where: {
                      id: coin.id,
                    },
                    data: {
                      price: res[coin.name.toLowerCase()].usd,
                    },
                  },
                },
                currentTotal: Number(newTotal.toFixed(2)),
                percentChange: Number((diff / list.total).toFixed(4)),
              },
            });
          } catch (error) {
            res.status(400).json(error);
          }
        });
        try {
          await prisma.list.update({
            where: {
              id: list.id,
            },
            data: {
              currentTotal: Number(newTotal.toFixed(2)),
            },
          });
        } catch (error) {
          res.status(400).json(error);
        }
      })
    );
  });

  const lists = await prisma.list.findMany({
    take: 10,
    orderBy: {
      percentChange: "desc",
    },
    include: {
      coins: true,
      owner: true,
    },
  });

  return res.json(lists);
};

export default fetchLeaders;
