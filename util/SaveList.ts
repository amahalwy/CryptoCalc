export const saveList = async (data) => {
  const request = await fetch(`http://localhost:3000/api/SaveList`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });

  return request.json();
};
