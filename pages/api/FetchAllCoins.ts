export const fetchCoins = () => {
  return fetch(
    "https://coingecko.p.rapidapi.com/coins/markets?vs_currency=usd&page=1&per_page=100&order=market_cap_desc",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "8429dc7b5emshaee3897fb532bd9p100b25jsn84be2004c22e",
        "x-rapidapi-host": "coingecko.p.rapidapi.com",
      },
    }
  );
};
