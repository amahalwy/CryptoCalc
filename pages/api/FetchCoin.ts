export const fetchCoin = async (ticket) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_RAPID_API_URL_FIRST}${ticket.toLowerCase()}${
      process.env.NEXT_PUBLIC_RAPID_API_URL_SECOND
    }`,
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
