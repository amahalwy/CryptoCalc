import { List } from "@prisma/client";
import prisma from "../../../lib/prisma";

const handler = async (
  req: { method: any; body: { name: any } },
  res: {
    status: (
      arg0: number
    ) => {
      (): any;
      new (): any;
      json: {
        (arg0: { status: number; error?: string; id?: string }): any;
        new (): any;
      };
    };
  }
) => {
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
};

export default handler;
