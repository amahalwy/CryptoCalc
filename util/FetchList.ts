export const fetchList = async (data) => {
  const request = await fetch(`http://localhost:3000/api/FetchList`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });

  return request.text();
};
