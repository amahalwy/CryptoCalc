export const saveList = async (data) => {
  const request = await fetch(
    process.env.NODE_ENV === "production"
      ? `${process.env.NEXT_PUBLIC_INDEX_HOST}`
      : `${process.env.NEXT_PUBLIC_INDEX_LOCAL}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  return request.json();
};
