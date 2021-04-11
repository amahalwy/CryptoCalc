import { List, User } from "@prisma/client";
import { uuid } from "uuidv4";
import prisma from "../../../lib/prisma";
import { fetchPrice } from "../../../util/coins/price";
import { Coin } from "../../../typescript/interfaces";

interface Response {
  status?: number;
  active: boolean;
  name: string;
  otp: string;
  id: string;
  userId: string;
  startDate: string;
  endDate: string;
  total: number;
}

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      // Leaders
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

        const lists: List[] = await prisma.list.findMany({
          take: 10,
          orderBy: {
            percentChange: "desc",
          },
          include: {
            coins: true,
            owner: true,
          },
        });
        const response: {
          lists: List[];
          status: number;
        } = {
          status: 200,
          lists,
        };

        return res.json(response);
      } catch (error) {
        const response = {
          status: 400,
          ...error,
        };

        return res.json(response);
      }
    case "POST":
      const name: string = req.body.name;
      const coins: Coin[] = req.body.coins;
      const total: number = coins.reduce((acc, curr) => {
        return acc + curr.market_data.current_price.usd * curr.quantity;
      }, 0);

      const endDate = (date: number) => {
        let result = new Date(date);
        result.setDate(result.getDate() + 3);
        return result;
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

        const response: Response = {
          status: 201,
          active: req.body.active,
          name: newUser.name,
          otp: newUser.otp,
          ...updatedList,
        };

        return res.json(response);
      } catch (err) {
        err.status = 400;
        return res.status(400).json(err);
      }
  }
};
export default handler;
