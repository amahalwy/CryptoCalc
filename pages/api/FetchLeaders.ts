import { PrismaClient } from "@prisma/client";
import { List } from "../../typescript/interfaces";
import { fetchPrice } from "./FetchPrice";

const fetchLeaders = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const tempLists = await prisma.list.findMany({
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
      let coinsString = [];
      let diff: number = 0;

      list.coins.map(async (coin) => {
        coinsString.push(coin.name.toLowerCase());
        const requestParam = coinsString.join(",");

        await fetchPrice(requestParam)
          .then(async (res) => {
            newTotal += res[coin.name.toLowerCase()].usd * coin.quantity;
            return res;
          })
          .then(async (res) => {
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
                      price: {
                        set: Number(res[coin.name.toLowerCase()].usd),
                      },
                    },
                  },
                },
                currentTotal: Number(newTotal.toFixed(2)),
                percentChange: Number((diff / list.total).toFixed(4)),
              },
            });
          });
      });
    });

    console.log(test);

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
  } catch (error) {
    res.status(400).json(error);
  }
};

export default fetchLeaders;
