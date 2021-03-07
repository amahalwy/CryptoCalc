export const fetchPrice = async (ticket: string) => {
  const req = await fetch(
    `${
      process.env.NEXT_PUBLIC_RAPID_API_FETCH_PRICE_FIRST
    }${ticket.toLowerCase()}${
      process.env.NEXT_PUBLIC_RAPID_API_FETCH_PRICE_SECOND
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
