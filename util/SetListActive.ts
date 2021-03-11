export const setListActive = async (data) => {
  const request = await fetch(
    process.env.NODE_ENV === "production"
      ? `${process.env.NEXT_PUBLIC_SAVE_LIST_ACTIVE_HOST}`
      : `${process.env.NEXT_PUBLIC_SAVE_LIST_ACTIVE_LOCAL}`,
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
