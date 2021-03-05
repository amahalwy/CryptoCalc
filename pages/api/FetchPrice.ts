export const fetchPrice = async (ticket) => {
  const req = await fetch(
    `https://coingecko.p.rapidapi.com/simple/price?ids=${ticket}&vs_currencies=usd`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
        "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
      },
    }
  );
  return await req.json();
};
