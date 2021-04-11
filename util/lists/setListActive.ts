import { Coin, List } from "./../../typescript/interfaces";

export const setListActive = async (data: {
  list: List;
  localCoins: Coin[];
}) => {
  const { list } = data;
  const request = await fetch(
    process.env.NODE_ENV === "production"
      ? `${process.env.NEXT_PUBLIC_ID_HOST}${list.id}`
      : `${process.env.NEXT_PUBLIC_ID_LOCAL}${list.id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(data),
    }
  );

  return request.json();
};
