export const fetchLeaders = async () => {
  const request = await fetch(
    process.env.NODE_ENV === "production"
      ? `${process.env.NEXT_PUBLIC_FETCH_LEADERS_HOST}`
      : `${process.env.NEXT_PUBLIC_FETCH_LEADERS_LOCAL}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );

  return request.json();
};
