import { Coin } from ".prisma/client";
import { fetchCoinRapid } from "../../../util/coins/fetchCoinRapid";

const fetchCoin = async (
  req: { query: { id: string } },
  res: { json: (arg0: Coin) => any }
) => {
  const coin = await fetchCoinRapid(req.query.id);
  return res.json(coin);
};

export default fetchCoin;
