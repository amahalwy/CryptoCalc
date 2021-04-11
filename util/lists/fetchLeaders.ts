export const fetchLeaders = async () => {
  const request = await fetch(
    process.env.NODE_ENV === "production"
      ? `${process.env.NEXT_PUBLIC_INDEX_HOST}`
      : `${process.env.NEXT_PUBLIC_INDEX_LOCAL}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );

  return request.json();
};
