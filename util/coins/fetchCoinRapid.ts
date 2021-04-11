export const fetchCoinRapid = async (ticket: string) => {
  const req = await fetch(
    `${process.env.NEXT_RAPID_API_URL_FIRST}${ticket.toLowerCase()}${
      process.env.NEXT_RAPID_API_URL_SECOND
    }`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.NEXT_RAPID_API_KEY,
        "x-rapidapi-host": process.env.NEXT_RAPID_API_HOST,
      },
    }
  );
  return req.json();
};
