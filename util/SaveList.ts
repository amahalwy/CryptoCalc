export const saveList = async (data) => {
  const request = await fetch(
    process.env.NODE_ENV === "production"
      ? `${process.env.NEXT_PUBLIC_SAVE_LIST_HOST}`
      : `${process.env.NEXT_PUBLIC_SAVE_LIST_LOCAL}`,
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
