import { List } from "@prisma/client";
import prisma from "../../../lib/prisma";
import { Coin } from "../../../typescript/interfaces";

const handler = async (
  req: {
    method: any;
    query: { id: string };
    body: { name: any; localCoins: Coin[]; list: { id: any } };
  },
  res: {
    status: (
      arg0: number
    ) => {
      (): any;
      new (): any;
      json: {
        (arg0: { status: number; error?: string; list?: List }): any;
        new (): any;
      };
    };
    json: (arg0: List) => any;
  }
) => {
  switch (req.method) {
    case "GET":
      if (req.query) {
        const list: List = await prisma.list.findFirst({
          where: {
            owner: {
              name: req.query.id,
            },
          },
          include: {
            coins: true,
          },
        });

        if (!list) {
          const response: {
            status: number;
            error: string;
          } = {
            status: 404,
            error: "Error: List not found",
          };

          return res.status(404).json(response);
        } else {
          const response: {
            status: number;
            list: List;
          } = {
            status: 200,
            list: list,
          };
          return await res.status(200).json(response);
        }
      } else {
      }
      const list: List = await prisma.list.findFirst({
        where: {
          owner: {
            name: req.body.name,
          },
        },
        include: {
          coins: true,
        },
      });

      if (!list) {
        const response: {
          status: number;
          error: string;
        } = {
          status: 404,
          error: "Error: List not found",
        };

        return res.status(404).json(response);
      } else {
        const response: {
          status: number;
          list: List;
        } = {
          status: 200,
          list: list,
        };
        return await res.status(200).json(response);
      }
    case "PATCH":
      const getTotal = (coins: Coin[]) => {
        return coins.reduce((acc: number, curr: Coin) => {
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
  }
};

export default handler;
