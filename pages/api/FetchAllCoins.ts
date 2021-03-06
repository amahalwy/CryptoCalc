export const fetchCoins = () => {
  return fetch(process.env.NEXT_PUBLIC_RAPID_API_FETCH_COINS, {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
    },
  });
};
