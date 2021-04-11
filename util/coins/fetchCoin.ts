export const fetchCoin = async (ticket: string) => {
  const req = await fetch(`http://localhost:3000/api/coins/${ticket}`);
  return req.json();
};
