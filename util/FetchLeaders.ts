export const fetchLeaders = async () => {
  const request = await fetch(`http://localhost:3000/api/FetchLeaders`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  return request.json();
};
