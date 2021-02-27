export const fetchPrice = (ticket) => {
  const req = fetch(
    `${process.env.NEXT_PUBLIC_RAPID_API_URL_FIRST}${ticket}${process.env.NEXT_PUBLIC_RAPID_API_URL_SECOND}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
        "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
      },
    }
  ).then((res) => res.json());
  return req;
};
