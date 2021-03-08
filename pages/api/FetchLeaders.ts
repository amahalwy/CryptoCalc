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
                currentTotal: newTotal,
              },
            });
          } catch (error) {
            console.log(error);
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
          console.log(error);
        }
      })
    );
  });

  const lists = await prisma.list.findMany({
    take: 10,
    orderBy: {
      currentTotal: "desc",
    },
    include: {
      coins: true,
    },
  });

  return res.json(lists);
};

export default fetchLeaders;
